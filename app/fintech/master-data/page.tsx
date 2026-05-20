import { db } from "@/src/db";
import { transactions } from "@/src/db/schema";
import { desc, eq } from "drizzle-orm";
import RunwayClient from "@/app/components/RunwayClient";
import { getResilientSession } from "@/src/lib/auth-session";

export const dynamic = "force-dynamic";

export default async function RunwayPage() {
  const session = await getResilientSession();
  const userId = session?.user?.id;

  let dbTransactions: any[] = [];
  
  try {
    const fetchDbTransactions = async () => {
      if (!userId) return [];
      return db.query.transactions.findMany({
        where: eq(transactions.userId, userId),
        orderBy: [desc(transactions.createdAt)],
      });
    };

    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Database query timed out")), 3000)
    );

    dbTransactions = await Promise.race([fetchDbTransactions(), timeoutPromise]);
  } catch (err) {
    console.error("Runway page database fetch failed, falling back to static fallback data:", err);
    dbTransactions = [];
  }

  const uiTransactions = dbTransactions.map(tx => ({
    id: tx.id,
    type: Number(tx.amount || 0) > 0 ? 'CREDIT' : 'DEBIT' as 'CREDIT' | 'DEBIT',
    amount: Number(tx.amount || 0),
    description: (tx.metadata as any)?.description || 'Transaction',
    date: tx.createdAt ? new Date(tx.createdAt).toLocaleString() : new Date().toLocaleString(),
    status: tx.status as any,
  }));

  return (
    <RunwayClient initialTransactions={uiTransactions} />
  );
}
