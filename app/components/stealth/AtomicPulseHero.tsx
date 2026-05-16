"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface LedgerEntry {
  id: string;
  debit: { account: string; amount: number };
  credit: { account: string; amount: number };
  timestamp: number;
  hash: string;
}

function generateHash(): string {
  const chars = "0123456789abcdef";
  let hash = "0x";
  for (let i = 0; i < 16; i++) hash += chars[Math.floor(Math.random() * 16)];
  return hash;
}

function generateEntry(id: number): LedgerEntry {
  const accounts = [
    "Treasury::Core",
    "Vault::Reserve",
    "Client::Settlement",
    "Escrow::Pending",
    "Clearing::House",
    "Liquidity::Pool",
  ];
  const amount = Math.floor(Math.random() * 500000) + 10000;
  const debitIdx = Math.floor(Math.random() * accounts.length);
  let creditIdx = Math.floor(Math.random() * accounts.length);
  while (creditIdx === debitIdx)
    creditIdx = Math.floor(Math.random() * accounts.length);

  return {
    id: `TXN-${String(id).padStart(6, "0")}`,
    debit: { account: accounts[debitIdx], amount },
    credit: { account: accounts[creditIdx], amount },
    timestamp: Date.now(),
    hash: generateHash(),
  };
}

function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(16,185,129,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16,185,129,0.3) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#020617]" />
    </div>
  );
}

function FloatingParticle({
  delay,
  x,
  duration,
}: {
  delay: number;
  x: number;
  duration: number;
}) {
  return (
    <motion.div
      className="absolute w-1 h-1 rounded-full bg-emerald-400/40"
      initial={{ y: "110%", x: `${x}%`, opacity: 0 }}
      animate={{ y: "-10%", opacity: [0, 0.6, 0] }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
}

function LedgerFlow({ entries }: { entries: LedgerEntry[] }) {
  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="grid grid-cols-[1fr_80px_1fr] gap-4 mb-4 px-4">
        <div className="text-xs font-mono uppercase tracking-widest text-emerald-400/60">
          Debit
        </div>
        <div className="text-center text-xs font-mono uppercase tracking-widest text-slate-500">
          Flow
        </div>
        <div className="text-xs font-mono uppercase tracking-widest text-blue-400/60 text-right">
          Credit
        </div>
      </div>

      {/* Entries */}
      <div className="space-y-2 relative">
        {entries.map((entry, i) => (
          <motion.div
            key={entry.id + i}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-[1fr_80px_1fr] gap-4 items-center px-4 py-3 rounded-lg border border-slate-800/50 bg-slate-900/30 backdrop-blur-sm"
          >
            {/* Debit Side */}
            <div className="flex flex-col gap-1">
              <span className="text-xs font-mono text-slate-400 truncate">
                {entry.debit.account}
              </span>
              <span className="text-sm font-mono font-semibold text-emerald-400 tabular-nums">
                ${entry.debit.amount.toLocaleString()}.00
              </span>
            </div>

            {/* Flow Indicator */}
            <div className="flex items-center justify-center relative">
              <motion.div
                className="w-full h-px bg-gradient-to-r from-emerald-400/60 via-slate-500/30 to-blue-400/60"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              />
              <motion.div
                className="absolute w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.6)]"
                initial={{ left: "0%" }}
                animate={{ left: "100%" }}
                transition={{
                  duration: 0.8,
                  delay: 0.3,
                  ease: "easeInOut",
                }}
              />
            </div>

            {/* Credit Side */}
            <div className="flex flex-col gap-1 items-end">
              <span className="text-xs font-mono text-slate-400 truncate">
                {entry.credit.account}
              </span>
              <span className="text-sm font-mono font-semibold text-blue-400 tabular-nums">
                ${entry.credit.amount.toLocaleString()}.00
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Hash chain footer */}
      {entries.length > 0 && (
        <motion.div
          className="mt-4 px-4 flex items-center gap-3 text-xs font-mono text-slate-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <span className="text-emerald-500/50">CHAIN</span>
          <span className="text-slate-700 truncate">{entries[0]?.hash}</span>
          <span className="text-slate-700">{">"}</span>
          <span className="text-slate-600 truncate">
            {entries[entries.length - 1]?.hash}
          </span>
          <span className="ml-auto text-emerald-500/40 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            LIVE
          </span>
        </motion.div>
      )}
    </div>
  );
}

export default function AtomicPulseHero() {
  const [entries, setEntries] = useState<LedgerEntry[]>([]);
  const counterRef = useRef(1);

  useEffect(() => {
    // Initial burst
    const initial = Array.from({ length: 4 }, (_, i) =>
      generateEntry(counterRef.current++)
    );
    setEntries(initial);

    const interval = setInterval(() => {
      setEntries((prev) => {
        const newEntry = generateEntry(counterRef.current++);
        return [newEntry, ...prev].slice(0, 5);
      });
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 py-24">
      <GridBackground />

      {/* Particles */}
      {Array.from({ length: 12 }).map((_, i) => (
        <FloatingParticle
          key={i}
          delay={i * 0.8}
          x={10 + Math.random() * 80}
          duration={6 + Math.random() * 4}
        />
      ))}

      {/* Radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-emerald-500/[0.04] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-blue-500/[0.03] rounded-full blur-[100px] pointer-events-none" />

      {/* Top Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 mb-8"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/[0.05]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-400">
            Atomic Ledger Engine v4.0
          </span>
        </div>
      </motion.div>

      {/* Headline */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15 }}
        className="relative z-10 text-center max-w-4xl mx-auto mb-6"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-50 leading-[1.08] text-balance">
          Zero-latency{" "}
          <span className="bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">
            double-entry
          </span>{" "}
          ledger infrastructure
        </h1>
      </motion.div>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative z-10 text-center text-base sm:text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed text-pretty"
      >
        Immutable, hash-chained transactions settling in under 50ms. Built for
        mission-critical financial systems that demand absolute precision.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.45 }}
        className="relative z-10 flex flex-wrap items-center justify-center gap-4 mb-16"
      >
        <button className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm rounded-lg transition-all duration-200 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]">
          Start Building
        </button>
        <button className="px-6 py-3 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-slate-100 font-medium text-sm rounded-lg transition-all duration-200 bg-slate-900/50 backdrop-blur-sm">
          Read the Docs
        </button>
      </motion.div>

      {/* Live Ledger Visualization */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="relative z-10 w-full max-w-4xl"
      >
        <div className="rounded-xl border border-slate-800/70 bg-slate-950/80 backdrop-blur-xl p-6 shadow-[0_0_60px_rgba(16,185,129,0.05)]">
          {/* Terminal header */}
          <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-800/50">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
            </div>
            <span className="text-xs font-mono text-slate-600">
              velox://ledger/stream --mode=atomic
            </span>
            <div className="ml-auto flex items-center gap-2">
              <span className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">
                Latency
              </span>
              <span className="text-[10px] font-mono text-emerald-400 tabular-nums">
                {"<"}12ms
              </span>
            </div>
          </div>

          <LedgerFlow entries={entries} />
        </div>
      </motion.div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="relative z-10 mt-12 flex flex-wrap items-center justify-center gap-8 sm:gap-16"
      >
        {[
          { label: "Throughput", value: "1.2M TPS" },
          { label: "Latency", value: "<12ms" },
          { label: "Uptime", value: "99.999%" },
          { label: "Compliance", value: "SOC2 + PCI" },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-lg sm:text-xl font-mono font-bold text-slate-100 tabular-nums">
              {stat.value}
            </div>
            <div className="text-xs font-mono uppercase tracking-widest text-slate-500 mt-1">
              {stat.label}
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
