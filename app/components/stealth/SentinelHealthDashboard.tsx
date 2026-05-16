"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface IntegrityState {
  hashChainValid: boolean;
  blocksVerified: number;
  totalBlocks: number;
  lastVerifiedHash: string;
  verificationRate: number;
  integrityScore: number;
  threatLevel: "none" | "low" | "elevated";
  activeChecks: string[];
}

function generateHash(): string {
  const chars = "0123456789abcdef";
  let hash = "0x";
  for (let i = 0; i < 12; i++) hash += chars[Math.floor(Math.random() * 16)];
  return hash;
}

function StatusRing({
  score,
  size = 200,
}: {
  score: number;
  size?: number;
}) {
  const radius = (size - 16) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Outer glow */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          boxShadow:
            score > 98
              ? "0 0 40px rgba(16,185,129,0.2), 0 0 80px rgba(16,185,129,0.1)"
              : score > 90
              ? "0 0 30px rgba(59,130,246,0.2)"
              : "0 0 30px rgba(245,158,11,0.2)",
        }}
      />

      <svg width={size} height={size} className="transform -rotate-90">
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(30,41,59,0.5)"
          strokeWidth={3}
        />
        {/* Progress */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={
            score > 98
              ? "#10b981"
              : score > 90
              ? "#3b82f6"
              : "#f59e0b"
          }
          strokeWidth={3}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{
            filter:
              score > 98
                ? "drop-shadow(0 0 6px rgba(16,185,129,0.5))"
                : "none",
          }}
        />
        {/* Pulse dot at end */}
        <motion.circle
          cx={size / 2 + radius * Math.cos(((score / 100) * 360 - 90) * (Math.PI / 180))}
          cy={size / 2 + radius * Math.sin(((score / 100) * 360 - 90) * (Math.PI / 180))}
          r={4}
          fill={score > 98 ? "#10b981" : "#3b82f6"}
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            filter: "drop-shadow(0 0 4px rgba(16,185,129,0.8))",
          }}
        />
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          key={score}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-3xl sm:text-4xl font-mono font-bold text-slate-100 tabular-nums"
        >
          {score.toFixed(1)}
        </motion.span>
        <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mt-1">
          Integrity
        </span>
      </div>
    </div>
  );
}

function VerificationLog({ checks }: { checks: string[] }) {
  return (
    <div className="space-y-1.5 max-h-48 overflow-hidden">
      {checks.map((check, i) => (
        <motion.div
          key={check + i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.05 }}
          className="flex items-center gap-2 text-xs font-mono"
        >
          <span className="w-1 h-1 rounded-full bg-emerald-400 shrink-0" />
          <span className="text-slate-500 shrink-0 tabular-nums">
            {new Date().toLocaleTimeString("en-US", {
              hour12: false,
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </span>
          <span className="text-slate-400 truncate">{check}</span>
        </motion.div>
      ))}
    </div>
  );
}

export default function SentinelHealthDashboard() {
  const [state, setState] = useState<IntegrityState>({
    hashChainValid: true,
    blocksVerified: 847293,
    totalBlocks: 847300,
    lastVerifiedHash: generateHash(),
    verificationRate: 12847,
    integrityScore: 99.8,
    threatLevel: "none",
    activeChecks: [
      "Hash-chain link verified: block #847293",
      "Merkle root validated: shard-07",
      "Cross-reference complete: ledger-alpha",
      "Signature verification: RSA-4096 OK",
      "Temporal consistency check: PASS",
    ],
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setState((prev) => {
        const newBlock = prev.blocksVerified + Math.floor(Math.random() * 3) + 1;
        const checkMessages = [
          `Hash-chain link verified: block #${newBlock}`,
          `Merkle root validated: shard-${String(Math.floor(Math.random() * 12)).padStart(2, "0")}`,
          `Cross-reference complete: ledger-${["alpha", "beta", "gamma", "delta"][Math.floor(Math.random() * 4)]}`,
          `Signature verification: RSA-4096 OK`,
          `Temporal consistency check: PASS`,
          `Double-spend detection scan: CLEAR`,
          `Consensus integrity: ${Math.floor(Math.random() * 5) + 95}% agreement`,
        ];

        const newCheck = checkMessages[Math.floor(Math.random() * checkMessages.length)];

        return {
          ...prev,
          blocksVerified: newBlock,
          totalBlocks: newBlock + Math.floor(Math.random() * 5),
          lastVerifiedHash: generateHash(),
          verificationRate: 12000 + Math.floor(Math.random() * 2000),
          integrityScore: 99.7 + Math.random() * 0.29,
          activeChecks: [newCheck, ...prev.activeChecks].slice(0, 6),
        };
      });
    }, 2200);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <section className="relative py-24 sm:py-32 px-4">
      {/* Section header */}
      <div className="max-w-6xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-4"
        >
          <div className="h-px flex-1 max-w-12 bg-gradient-to-r from-emerald-500/50 to-transparent" />
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400/70">
            Sentinel Module
          </span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl font-bold text-slate-100 tracking-tight text-balance"
        >
          Ledger integrity,{" "}
          <span className="text-emerald-400">verified continuously</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-base text-slate-400 max-w-xl leading-relaxed"
        >
          Background hash-chain verification running 24/7. Every block is
          cryptographically linked, every transaction immutably sealed.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="max-w-6xl mx-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-6">
          {/* Left: Status Ring + Metrics */}
          <div className="rounded-xl border border-slate-800/60 bg-slate-950/60 backdrop-blur-xl p-8 flex flex-col items-center">
            <StatusRing score={state.integrityScore} />

            <div className="mt-8 w-full grid grid-cols-2 gap-4">
              <div className="rounded-lg border border-slate-800/40 bg-slate-900/40 p-4">
                <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-2">
                  Blocks Verified
                </div>
                <div className="text-lg font-mono font-semibold text-slate-200 tabular-nums">
                  {state.blocksVerified.toLocaleString()}
                </div>
              </div>
              <div className="rounded-lg border border-slate-800/40 bg-slate-900/40 p-4">
                <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-2">
                  Rate (blk/s)
                </div>
                <div className="text-lg font-mono font-semibold text-slate-200 tabular-nums">
                  {state.verificationRate.toLocaleString()}
                </div>
              </div>
              <div className="col-span-2 rounded-lg border border-slate-800/40 bg-slate-900/40 p-4">
                <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-2">
                  Last Verified Hash
                </div>
                <div className="text-sm font-mono text-emerald-400/80 truncate tabular-nums">
                  {state.lastVerifiedHash}
                </div>
              </div>
            </div>

            {/* Threat Level */}
            <div className="mt-4 w-full rounded-lg border border-slate-800/40 bg-slate-900/40 p-4 flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
                  Threat Level
                </div>
                <div className="text-sm font-mono font-semibold text-emerald-400 uppercase">
                  {state.threatLevel}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Verification Log */}
          <div className="rounded-xl border border-slate-800/60 bg-slate-950/60 backdrop-blur-xl p-8 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-mono uppercase tracking-widest text-slate-400">
                Verification Stream
              </h3>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-mono text-emerald-400/70 uppercase tracking-wider">
                  Active
                </span>
              </div>
            </div>

            <div className="flex-1">
              <VerificationLog checks={state.activeChecks} />
            </div>

            {/* Security modules */}
            <div className="mt-6 pt-6 border-t border-slate-800/40">
              <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-3">
                Active Modules
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  "Hash-Chain",
                  "Merkle-Tree",
                  "Double-Spend",
                  "Temporal",
                  "Consensus",
                  "RSA-4096",
                ].map((mod) => (
                  <span
                    key={mod}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-emerald-500/15 bg-emerald-500/[0.05] text-[10px] font-mono text-emerald-400/80"
                  >
                    <span className="w-1 h-1 rounded-full bg-emerald-400" />
                    {mod}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
