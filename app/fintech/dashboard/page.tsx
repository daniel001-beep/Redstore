import { db } from "@/src/db";
import { transactions } from "@/src/db/schema";
import { desc, eq } from "drizzle-orm";
import DashboardClient from "@/app/components/DashboardClient";
import { getResilientSession } from "@/src/lib/auth-session";

export const dynamic = "force-dynamic";

// Global Circuit Breaker to prevent database timeout delays for subsequent requests
let isDatabaseOffline = false;
let lastOfflineCheck = 0;

export default async function DashboardPage() {
  const session = await getResilientSession();
  const userId = session?.user?.id;

  let recentTransactions: any[] = [];
  let isDemoData = false;

  const now = Date.now();
  const shouldSkipDb = isDatabaseOffline && (now - lastOfflineCheck < 300000); // Cache offline status for 5 mins

  if (shouldSkipDb) {
    recentTransactions = []; // Start cleanly
  } else {
    try {
      const fetchDbTransactions = async () => {
        if (!userId) return [];
        return db.query.transactions.findMany({
          where: eq(transactions.userId, userId),
          orderBy: [desc(transactions.createdAt)],
          limit: 10,
        });
      };

      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("Database query timed out")), 800)
      );

      recentTransactions = await Promise.race([fetchDbTransactions(), timeoutPromise]);
      // If we succeed, reset the circuit breaker
      isDatabaseOffline = false;
    } catch (err) {
      console.warn("⚠️ Dashboard Database offline. Velox running seamlessly in Offline Demo Mode.");
      isDatabaseOffline = true;
      lastOfflineCheck = Date.now();
      recentTransactions = []; // Start cleanly at 0.00
    }
  }

  // Calculate real balance from transactions
  const totalBalanceUsd = recentTransactions.reduce((acc, tx) => acc + Number(tx.amount || 0), 0);

  // Calculate today's change from transactions created today
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const dayChangeUsd = recentTransactions
    .filter(tx => tx.createdAt && new Date(tx.createdAt) >= todayStart)
    .reduce((acc, tx) => acc + Number(tx.amount || 0), 0);
  
  // Format for the UI
  const uiTransactions = recentTransactions.map(tx => ({
    id: tx.id,
    type: Number(tx.amount || 0) > 0 ? 'CREDIT' : 'DEBIT' as 'CREDIT' | 'DEBIT',
    amount: Number(tx.amount || 0),
    description: tx.metadata?.description || 'Transaction',
    date: tx.createdAt ? new Date(tx.createdAt).toLocaleString() : new Date().toLocaleString(),
    status: tx.status as any,
  }));

  return (
    <DashboardClient 
      totalBalanceUsd={totalBalanceUsd}
      dayChangeUsd={dayChangeUsd}
      transactions={uiTransactions}
      isDemoData={isDemoData}
    />
  );
}
