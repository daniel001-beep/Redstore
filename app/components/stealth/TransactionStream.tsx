"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type TransactionStatus = "Immutable" | "Verified" | "Settled";

interface Transaction {
  id: string;
  hash: string;
  from: string;
  to: string;
  amount: number;
  status: TransactionStatus;
  timestamp: number;
  blockHeight: number;
}

function generateHash(): string {
  const chars = "0123456789abcdef";
  let hash = "";
  for (let i = 0; i < 16; i++) hash += chars[Math.floor(Math.random() * 16)];
  return hash;
}

const accounts = [
  "vault::prime-0x7a",
  "escrow::settlement-0xb3",
  "clearing::node-0x1f",
  "treasury::core-0x9d",
  "liquidity::pool-0xe2",
  "reserve::fund-0x5c",
];

function generateTransaction(blockHeight: number): Transaction {
  const statuses: TransactionStatus[] = ["Immutable", "Verified", "Settled"];
  const fromIdx = Math.floor(Math.random() * accounts.length);
  let toIdx = Math.floor(Math.random() * accounts.length);
  while (toIdx === fromIdx) toIdx = Math.floor(Math.random() * accounts.length);

  return {
    id: `ATX-${String(blockHeight).padStart(7, "0")}`,
    hash: `0x${generateHash()}`,
    from: accounts[fromIdx],
    to: accounts[toIdx],
    amount: Math.floor(Math.random() * 999000) + 1000,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    timestamp: Date.now(),
    blockHeight,
  };
}

function StatusBadge({ status }: { status: TransactionStatus }) {
  const styles: Record<TransactionStatus, string> = {
    Immutable:
      "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_8px_rgba(16,185,129,0.15)]",
    Verified:
      "bg-blue-500/10 text-blue-400 border-blue-500/20 shadow-[0_0_8px_rgba(59,130,246,0.15)]",
    Settled:
      "bg-slate-500/10 text-slate-300 border-slate-500/20",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[10px] font-mono font-semibold uppercase tracking-wider ${styles[status]}`}
    >
      <span
        className={`w-1 h-1 rounded-full ${
          status === "Immutable"
            ? "bg-emerald-400"
            : status === "Verified"
            ? "bg-blue-400"
            : "bg-slate-400"
        }`}
      />
      {status}
    </span>
  );
}

export default function TransactionStream() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [blockHeight, setBlockHeight] = useState(1847293);

  useEffect(() => {
    const initial = Array.from({ length: 8 }, (_, i) =>
      generateTransaction(1847293 + i)
    );
    setTransactions(initial);
    setBlockHeight(1847301);

    const interval = setInterval(() => {
      setBlockHeight((prev) => {
        const next = prev + 1;
        setTransactions((txs) => {
          const newTx = generateTransaction(next);
          return [newTx, ...txs].slice(0, 10);
        });
        return next;
      });
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-24 sm:py-32 px-4">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-4"
        >
          <div className="h-px flex-1 max-w-12 bg-gradient-to-r from-blue-500/50 to-transparent" />
          <span className="text-xs font-mono uppercase tracking-widest text-blue-400/70">
            Transaction Stream
          </span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl font-bold text-slate-100 tracking-tight text-balance"
        >
          Atomic commits,{" "}
          <span className="text-blue-400">cryptographically sealed</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-base text-slate-400 max-w-xl leading-relaxed"
        >
          Every transaction is an atomic operation - fully committed or fully
          rolled back. Each entry is hash-linked to the previous, creating an
          immutable chain of financial truth.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="max-w-6xl mx-auto"
      >
        <div className="rounded-xl border border-slate-800/60 bg-slate-950/60 backdrop-blur-xl overflow-hidden">
          {/* Table header bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/50">
            <div className="flex items-center gap-3">
              <span className="text-sm font-mono text-slate-400">
                Atomic Commits
              </span>
              <span className="text-xs font-mono text-slate-600">
                Block #{blockHeight.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-mono text-emerald-400/70 uppercase tracking-wider">
                Streaming
              </span>
            </div>
          </div>

          {/* Column headers */}
          <div className="hidden sm:grid grid-cols-[140px_1fr_1fr_120px_100px_80px] gap-4 px-6 py-3 border-b border-slate-800/30 text-[10px] font-mono uppercase tracking-widest text-slate-500">
            <span>TX ID</span>
            <span>From</span>
            <span>To</span>
            <span className="text-right">Amount</span>
            <span className="text-center">Status</span>
            <span className="text-right">Block</span>
          </div>

          {/* Rows */}
          <div className="divide-y divide-slate-800/20">
            <AnimatePresence mode="popLayout">
              {transactions.map((tx) => (
                <motion.div
                  key={tx.id}
                  layout
                  initial={{ opacity: 0, y: -20, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Desktop row */}
                  <div className="hidden sm:grid grid-cols-[140px_1fr_1fr_120px_100px_80px] gap-4 items-center px-6 py-3 hover:bg-slate-800/20 transition-colors">
                    <span className="text-xs font-mono text-slate-300 truncate">
                      {tx.id}
                    </span>
                    <span className="text-xs font-mono text-slate-500 truncate">
                      {tx.from}
                    </span>
                    <span className="text-xs font-mono text-slate-500 truncate">
                      {tx.to}
                    </span>
                    <span className="text-xs font-mono text-slate-200 text-right tabular-nums">
                      ${tx.amount.toLocaleString()}.00
                    </span>
                    <span className="flex justify-center">
                      <StatusBadge status={tx.status} />
                    </span>
                    <span className="text-xs font-mono text-slate-600 text-right tabular-nums">
                      {tx.blockHeight.toLocaleString()}
                    </span>
                  </div>

                  {/* Mobile card */}
                  <div className="sm:hidden px-4 py-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-slate-300">
                        {tx.id}
                      </span>
                      <StatusBadge status={tx.status} />
                    </div>
                    <div className="text-xs font-mono text-slate-500 truncate">
                      {tx.from} {">"} {tx.to}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-mono font-semibold text-slate-200 tabular-nums">
                        ${tx.amount.toLocaleString()}.00
                      </span>
                      <span className="text-[10px] font-mono text-slate-600 tabular-nums">
                        Blk {tx.blockHeight.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="px-6 py-3 border-t border-slate-800/50 flex items-center justify-between text-[10px] font-mono text-slate-600">
            <span>
              Showing {transactions.length} of {blockHeight.toLocaleString()}{" "}
              commits
            </span>
            <span className="flex items-center gap-2">
              <span className="text-slate-500">Hash-chain:</span>
              <span className="text-emerald-400/50 tabular-nums">
                {transactions[0]?.hash}
              </span>
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
