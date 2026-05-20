import DashboardLayout from '@/app/components/DashboardLayout';
import LedgerClient from '@/app/components/LedgerClient';
import { db } from '@/src/db';
import { transactions } from '@/src/db/schema';
import { desc, eq } from 'drizzle-orm';
import { getResilientSession } from "@/src/lib/auth-session";
import { createClient } from '@/src/lib/supabase-server';

export const dynamic = 'force-dynamic';

// Global Circuit Breaker to prevent database timeout delays for subsequent requests
let isDatabaseOffline = false;
let lastOfflineCheck = 0;

export default async function LedgerPage() {
  const session = await getResilientSession();
  const userId = session?.user?.id;

  let realTransactions: any[] = [];
  const now = Date.now();
  const shouldSkipDb = isDatabaseOffline && (now - lastOfflineCheck < 300000); // 5 mins

  if (shouldSkipDb) {
    realTransactions = []; // start clean
  } else {
    try {
      const fetchDbTransactions = async () => {
        if (!userId) return [];
        return db.query.transactions.findMany({
          where: eq(transactions.userId, userId),
          orderBy: [desc(transactions.createdAt)],
          limit: 50,
        });
      };

      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("Database query timed out")), 3000)
      );

      let dbTransactions: any[] = [];
      try {
        dbTransactions = await Promise.race([fetchDbTransactions(), timeoutPromise]);
        // Succeeded! Reset circuit breaker
        isDatabaseOffline = false;
      } catch (timeoutErr) {
        console.warn("⚠️ Drizzle query timed out during SSR, falling back to Supabase REST API.");
        const userEmail = session?.user?.email;
        if (userEmail) {
          try {
            const supabase = await createClient();
            if (supabase) {
              const { data: sbData, error: sbErr } = await supabase
                .from('invoices')
                .select('*')
                .eq('email', userEmail)
                .order('created_at', { ascending: false });
              
              if (!sbErr && sbData && sbData.length > 0) {
                dbTransactions = sbData.map((inv: any) => ({
                  id: inv.id?.toString(),
                  userId: inv.user_id || userId,
                  amount: (Number(inv.amount || 0) * 100).toString(), // convert to cents for uniformity
                  status: inv.status === 'Paid' ? 'completed' : 'pending',
                  createdAt: inv.created_at || new Date().toISOString(),
                  metadata: {
                    client_name: inv.client_name || 'Client',
                    description: inv.description || 'Invoice',
                  }
                }));
              }
            }
          } catch (sbErr) {
            console.error("Failed to query Supabase fallback during SSR:", sbErr);
          }
        }
      }

      realTransactions = dbTransactions.map(tx => {
        const amountInDollars = Number(tx.amount) / 100;
        return {
          id: tx.id,
          type: amountInDollars > 0 ? 'CREDIT' : 'DEBIT',
          description: (tx.metadata as any)?.description || `Transaction ${tx.id.substring(0, 8)}`,
          date: tx.createdAt ? new Date(tx.createdAt).toISOString().split('T')[0] : 'N/A',
          amount: amountInDollars,
          status: tx.status?.toUpperCase() || 'COMPLETED',
        };
      });
    } catch (err) {
      console.warn("⚠️ Ledger Database offline. Velox running seamlessly in Offline Demo Mode.");
      isDatabaseOffline = true;
      lastOfflineCheck = Date.now();
      realTransactions = [];
    }
  }

  return (
    <DashboardLayout>
      <LedgerClient initialTransactions={realTransactions} />
    </DashboardLayout>
  );
}
