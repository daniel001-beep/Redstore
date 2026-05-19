import { NextResponse } from 'next/server';
import { db } from '@/src/db';
import { transactions, ledgerEntries } from '@/src/db/schema';
import { generateTransactionHash } from '@/src/lib/crypto';
import { createClient } from '@/src/lib/supabase-server';
import { eq, desc } from 'drizzle-orm';
import { transactionRateLimiter } from '@/src/lib/ratelimit';
import { dispatchWebhook } from '@/src/lib/webhooks';
import { cookies } from 'next/headers';


export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const localUserCookie = cookieStore.get('velox-local-user')?.value;
    let userId = '';
    let userEmail = '';

    if (localUserCookie) {
      try {
        let val = decodeURIComponent(localUserCookie).trim();
        if (val.startsWith('"') && val.endsWith('"')) {
          val = val.slice(1, -1);
        }
        let localUser = JSON.parse(val);
        if (typeof localUser === 'string') {
          localUser = JSON.parse(localUser);
        }
        userId = localUser.id;
        userEmail = localUser.email;
      } catch (e) {
        try {
          let val = localUserCookie.trim();
          if (val.startsWith('"') && val.endsWith('"')) {
            val = val.slice(1, -1);
          }
          let localUser = JSON.parse(val);
          if (typeof localUser === 'string') {
            localUser = JSON.parse(localUser);
          }
          userId = localUser.id;
          userEmail = localUser.email;
        } catch (innerErr) {}
      }
    }

    if (!userId) {
      const supabase = await createClient();
      const { data: { user: cloudUser } } = await supabase ? await supabase.auth.getUser() : { data: { user: null } };
      if (cloudUser) {
        userId = cloudUser.id;
        userEmail = cloudUser.email || '';
      }
    }

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = { id: userId, email: userEmail };

    // 0. Rate Limiting Check
    if (!transactionRateLimiter.isAllowed(userId)) {
      return NextResponse.json({ 
        error: 'Too many requests. Please slow down (Limit: 5/min).',
      }, { status: 429 });
    }

    const body = await req.json();

    const { amount, idempotencyKey, orderId, metadata, description } = body;

    // Validate inputs
    const parsedAmount = Number(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return NextResponse.json({ error: 'Valid amount is required (in cents/kobo)' }, { status: 400 });
    }

    if (!idempotencyKey) {
      return NextResponse.json({ error: 'idempotencyKey is required' }, { status: 400 });
    }

    // Parse amount to BigInt
    let amountBigInt = BigInt(Math.floor(parsedAmount));

    // Atomic transaction with retry logic for network resilience
    const MAX_RETRIES = 2;
    let result;
    
    for (let i = 0; i < MAX_RETRIES; i++) {
      try {
        result = await db.transaction(async (tx) => {
          // 1. Idempotency Check: Prevent duplicate processing
          const existingTx = await tx.query.transactions.findFirst({
            where: eq(transactions.idempotencyKey, idempotencyKey),
          });

          if (existingTx) {
            // Return existing to be idempotent
            return { success: true, transaction: existingTx, idempotent: true };
          }

          // 2. Fetch the most recent transaction for this user to get previousHash
          const lastTx = await tx.query.transactions.findFirst({
            where: eq(transactions.userId, userId),
            orderBy: [desc(transactions.createdAt)],
          });

          const previousHash = lastTx?.hash || null;
          const timestamp = new Date();

          // 3. Generate cryptographic hash
          const hash = generateTransactionHash(
            amountBigInt,
            userId,
            timestamp,
            previousHash
          );

          // 4. Insert main transaction record
          const [newTx] = await tx.insert(transactions).values({
            userId,
            orderId: orderId || null,
            idempotencyKey,
            amount: amountBigInt,
            status: 'completed',
            hash,
            previousHash,
            metadata: metadata || {},
            createdAt: timestamp,
            completedAt: timestamp,
          }).returning();

          // 5. Insert double-entry ledger records
          await tx.insert(ledgerEntries).values({
            transactionId: newTx.id,
            userId,
            accountType: 'MAIN',
            entryType: amountBigInt > 0n ? 'CREDIT' : 'DEBIT',
            amount: amountBigInt,
            description: description || 'Ledger transaction',
            createdAt: timestamp,
          });

          // Offset entry for balance
          await tx.insert(ledgerEntries).values({
            transactionId: newTx.id,
            userId: 'SYSTEM',
            accountType: 'SETTLEMENT',
            entryType: amountBigInt > 0n ? 'DEBIT' : 'CREDIT',
            amount: -amountBigInt,
            description: `Offset for transaction ${newTx.id}`,
            createdAt: timestamp,
          });

          return { success: true, transaction: newTx, idempotent: false };
        });
        
        break; // Success!
      } catch (error) {
        if (i === MAX_RETRIES - 1) throw error; // Re-throw if last attempt fails
        console.warn(`Transaction attempt ${i + 1} failed due to network. Retrying...`);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1s before retry
      }
    }

    // 6. Dispatch webhook for new successful transactions (Async)
    if (result.success && !result.idempotent) {
      dispatchWebhook(userId, 'transaction.completed', result.transaction);

      // Sync to Supabase 'invoices' table to trigger Sentinel & real-time dashboard updates
      try {
        const { supabase } = await import('@/src/lib/supabase-client');
        if (supabase && user.email) {
          await supabase.from('invoices').insert({
            client_name: metadata?.client_name || 'Client',
            description: description || 'Ledger transaction',
            amount: Number(amountBigInt) / 100, // cents to dollars
            status: 'Paid',
            email: user.email,
            user_id: userId,
          });
          console.log(`[Supabase] Synced invoice to Supabase for ${user.email}`);
        }
      } catch (supabaseErr) {
        console.error('[Supabase] Failed to sync invoice to Supabase:', supabaseErr);
      }
    }


    // Serialize BigInt for JSON response
    const serializedResult = JSON.parse(
      JSON.stringify(result, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value
      )
    );

    return NextResponse.json(serializedResult, { status: 200 });

  } catch (error: any) {
    console.error('Transaction Error:', error);
    
    // Check for Postgres unique constraint violation on idempotency key
    if (error.code === '23505' && error.constraint === 'transaction_idempotency_key_key') {
       return NextResponse.json({ error: 'Duplicate transaction (Idempotency Key Collision)' }, { status: 409 });
    }

    return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const cookieStore = await cookies();
    const localUserCookie = cookieStore.get('velox-local-user')?.value;
    let userId = '';

    if (localUserCookie) {
      try {
        let val = decodeURIComponent(localUserCookie).trim();
        if (val.startsWith('"') && val.endsWith('"')) {
          val = val.slice(1, -1);
        }
        let localUser = JSON.parse(val);
        if (typeof localUser === 'string') {
          localUser = JSON.parse(localUser);
        }
        userId = localUser.id;
      } catch (e) {
        try {
          let val = localUserCookie.trim();
          if (val.startsWith('"') && val.endsWith('"')) {
            val = val.slice(1, -1);
          }
          let localUser = JSON.parse(val);
          if (typeof localUser === 'string') {
            localUser = JSON.parse(localUser);
          }
          userId = localUser.id;
        } catch (innerErr) {}
      }
    }

    if (!userId) {
      const supabase = await createClient();
      const { data: { user: cloudUser } } = await supabase ? await supabase.auth.getUser() : { data: { user: null } };
      if (cloudUser) {
        userId = cloudUser.id;
      }
    }

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch user's transactions only
    const userTransactions = await db.query.transactions.findMany({
      where: eq(transactions.userId, userId),
      orderBy: [desc(transactions.createdAt)],
    });

    // Serialize BigInt safely for JSON
    const serialized = JSON.parse(
      JSON.stringify(userTransactions, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value
      )
    );

    return NextResponse.json(serialized, { status: 200 });
  } catch (error: any) {
    console.error('Fetch Transactions Error:', error);
    return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
  }
}
