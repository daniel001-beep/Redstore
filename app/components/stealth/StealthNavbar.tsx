"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function StealthNavbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-slate-800/50 bg-[#020617]/80 backdrop-blur-xl"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-8 h-8 flex items-center justify-center">
            <svg
              width={28}
              height={28}
              viewBox="0 0 28 28"
              fill="none"
              className="transition-all duration-300"
            >
              <polygon
                points="3,4 9,4 15,24 9,24"
                fill="url(#stealthGrad1)"
              />
              <polygon
                points="18,4 24,4 21,14 15,14"
                fill="url(#stealthGrad2)"
              />
              <rect
                x="17"
                y="17"
                width="7"
                height="7"
                rx="1.5"
                fill="#10b981"
                opacity="0.8"
              />
              <defs>
                <linearGradient
                  id="stealthGrad1"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
                <linearGradient
                  id="stealthGrad2"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#2563eb" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-sm font-bold tracking-tight text-slate-100 group-hover:text-emerald-400 transition-colors">
              VELOX
            </span>
            <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-slate-500">
              Ledger Infra
            </span>
          </div>
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-1">
          {["Product", "Docs", "Pricing", "Security"].map((item) => (
            <span
              key={item}
              className="px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-slate-200 cursor-pointer transition-colors duration-200 rounded-md hover:bg-slate-800/40"
            >
              {item}
            </span>
          ))}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-3">
          <Link
            href="/auth/signin"
            className="text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors hidden sm:block"
          >
            Sign In
          </Link>
          <Link
            href="/fintech/dashboard"
            className="px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 hover:border-emerald-500/30 text-emerald-400 text-xs font-semibold rounded-lg transition-all duration-200"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
