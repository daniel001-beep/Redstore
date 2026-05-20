import DashboardLayout from '@/app/components/DashboardLayout';
import LedgerClient from '@/app/components/LedgerClient';
import { db } from '@/src/db';
import { transactions } from '@/src/db/schema';
import { desc, eq } from 'drizzle-orm';
import { getResilientSession } from "@/src/lib/auth-session";

export const dynamic = 'force-dynamic';

export default async function LedgerPage() {
  const session = await getResilientSession();
  const userId = session?.user?.id;

  let realTransactions: any[] = [];

  try {
    const fetchDbTransactions = async () => {
      if (!userId) return [];
      return db.query.transactions.findMany({
        where: eq(transactions.userId, userId),
        orderBy: [desc(transactions.createdAt)],
      });
    };

    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Database query timed out")), 5000)
    );

    const dbTransactions = await Promise.race([fetchDbTransactions(), timeoutPromise]);

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
    console.warn("⚠️ Ledger Database offline. Client will load from cache.");
    realTransactions = [];
  }

  return (
    <DashboardLayout>
      <LedgerClient initialTransactions={realTransactions} />
    </DashboardLayout>
  );
}
