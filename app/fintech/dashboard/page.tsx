import { db } from "@/src/db";
import { transactions } from "@/src/db/schema";
import { desc, eq } from "drizzle-orm";
import DashboardClient from "@/app/components/DashboardClient";
import { getResilientSession } from "@/src/lib/auth-session";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await getResilientSession();
  const userId = session?.user?.id;

  let recentTransactions: any[] = [];
  let isDemoData = false;

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

    recentTransactions = await Promise.race([fetchDbTransactions(), timeoutPromise]);
  } catch (err) {
    console.warn("⚠️ Dashboard Database offline. Client will load from cache.");
    isDemoData = true;
    recentTransactions = [];
  }

  // Calculate real balance from ALL transactions (dividing by 100 to convert cents to dollars)
  // Only sum completed transactions so that pending invoice requests don't inflate cash balances
  const totalBalanceUsd = recentTransactions
    .filter(tx => tx.status === 'completed' || tx.status === 'COMPLETED')
    .reduce((acc, tx) => acc + (Number(tx.amount || 0) / 100), 0);

  // Calculate today's change from completed transactions created today
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const dayChangeUsd = recentTransactions
    .filter(tx => (tx.status === 'completed' || tx.status === 'COMPLETED') && tx.createdAt && new Date(tx.createdAt) >= todayStart)
    .reduce((acc, tx) => acc + (Number(tx.amount || 0) / 100), 0);
  
  // Format for the UI (dividing by 100 to convert cents to dollars)
  const uiTransactions = recentTransactions.map(tx => {
    const amountInDollars = Number(tx.amount || 0) / 100;
    return {
      id: tx.id,
      type: amountInDollars > 0 ? 'CREDIT' : 'DEBIT' as 'CREDIT' | 'DEBIT',
      amount: amountInDollars,
      description: tx.metadata?.description || 'Transaction',
      date: tx.createdAt ? new Date(tx.createdAt).toLocaleString() : new Date().toLocaleString(),
      status: tx.status?.toUpperCase() || 'COMPLETED',
    };
  });

  return (
    <DashboardClient 
      totalBalanceUsd={totalBalanceUsd}
      dayChangeUsd={dayChangeUsd}
      transactions={uiTransactions}
      isDemoData={isDemoData}
    />
  );
}
