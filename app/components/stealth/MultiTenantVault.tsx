"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface Tenant {
  id: string;
  name: string;
  tier: "Enterprise" | "Growth" | "Startup";
  color: string;
  glowColor: string;
  borderColor: string;
  ledgerCount: number;
  transactionVolume: string;
  storageUsed: string;
  encryptionType: string;
  isolationLevel: string;
  status: "Active" | "Provisioning";
  region: string;
}

const tenants: Tenant[] = [
  {
    id: "VAULT-001",
    name: "Meridian Capital",
    tier: "Enterprise",
    color: "text-emerald-400",
    glowColor: "rgba(16,185,129,0.15)",
    borderColor: "border-emerald-500/20",
    ledgerCount: 847,
    transactionVolume: "$2.4B",
    storageUsed: "12.8 TB",
    encryptionType: "AES-256-GCM",
    isolationLevel: "Physical",
    status: "Active",
    region: "us-east-1",
  },
  {
    id: "VAULT-002",
    name: "Helix Financial",
    tier: "Enterprise",
    color: "text-blue-400",
    glowColor: "rgba(59,130,246,0.15)",
    borderColor: "border-blue-500/20",
    ledgerCount: 412,
    transactionVolume: "$890M",
    storageUsed: "6.2 TB",
    encryptionType: "AES-256-GCM",
    isolationLevel: "Physical",
    status: "Active",
    region: "eu-west-1",
  },
  {
    id: "VAULT-003",
    name: "Apex Ventures",
    tier: "Growth",
    color: "text-violet-400",
    glowColor: "rgba(139,92,246,0.12)",
    borderColor: "border-violet-500/20",
    ledgerCount: 156,
    transactionVolume: "$124M",
    storageUsed: "2.1 TB",
    encryptionType: "AES-256-CBC",
    isolationLevel: "Logical",
    status: "Active",
    region: "us-west-2",
  },
  {
    id: "VAULT-004",
    name: "Nova Payments",
    tier: "Growth",
    color: "text-amber-400",
    glowColor: "rgba(245,158,11,0.12)",
    borderColor: "border-amber-500/20",
    ledgerCount: 89,
    transactionVolume: "$67M",
    storageUsed: "890 GB",
    encryptionType: "AES-256-CBC",
    isolationLevel: "Logical",
    status: "Active",
    region: "ap-southeast-1",
  },
  {
    id: "VAULT-005",
    name: "Quantum Labs",
    tier: "Startup",
    color: "text-cyan-400",
    glowColor: "rgba(6,182,212,0.12)",
    borderColor: "border-cyan-500/20",
    ledgerCount: 23,
    transactionVolume: "$8.2M",
    storageUsed: "210 GB",
    encryptionType: "AES-256-CBC",
    isolationLevel: "Logical",
    status: "Provisioning",
    region: "us-east-1",
  },
  {
    id: "VAULT-006",
    name: "Citadel Reserve",
    tier: "Enterprise",
    color: "text-emerald-400",
    glowColor: "rgba(16,185,129,0.12)",
    borderColor: "border-emerald-500/20",
    ledgerCount: 634,
    transactionVolume: "$1.7B",
    storageUsed: "9.4 TB",
    encryptionType: "AES-256-GCM",
    isolationLevel: "Physical",
    status: "Active",
    region: "eu-central-1",
  },
];

function VaultCard({
  tenant,
  isSelected,
  onClick,
}: {
  tenant: Tenant;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`w-full text-left rounded-xl border p-5 transition-all duration-300 cursor-pointer ${
        isSelected
          ? `${tenant.borderColor} bg-slate-900/60`
          : "border-slate-800/40 bg-slate-950/40 hover:border-slate-700/60"
      }`}
      style={{
        boxShadow: isSelected
          ? `0 0 30px ${tenant.glowColor}, inset 0 1px 0 rgba(255,255,255,0.03)`
          : "none",
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-widest text-slate-600 mb-1">
            {tenant.id}
          </div>
          <div className="text-sm font-semibold text-slate-200">
            {tenant.name}
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              tenant.status === "Active"
                ? "bg-emerald-400 shadow-[0_0_6px_rgba(16,185,129,0.5)]"
                : "bg-amber-400 animate-pulse"
            }`}
          />
          <span className="text-[10px] font-mono text-slate-500">
            {tenant.status}
          </span>
        </div>
      </div>

      {/* Tier badge */}
      <div className="flex items-center gap-2 mb-4">
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase tracking-wider ${tenant.color} border ${tenant.borderColor} bg-slate-900/50`}
        >
          {tenant.tier}
        </span>
        <span className="text-[10px] font-mono text-slate-600">
          {tenant.region}
        </span>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="text-[10px] font-mono text-slate-600 uppercase tracking-wider">
            Volume
          </div>
          <div className="text-sm font-mono font-semibold text-slate-300 tabular-nums">
            {tenant.transactionVolume}
          </div>
        </div>
        <div>
          <div className="text-[10px] font-mono text-slate-600 uppercase tracking-wider">
            Ledgers
          </div>
          <div className="text-sm font-mono font-semibold text-slate-300 tabular-nums">
            {tenant.ledgerCount}
          </div>
        </div>
      </div>

      {/* Isolation indicator */}
      <div className="mt-4 pt-3 border-t border-slate-800/30 flex items-center gap-2">
        <svg
          className={`w-3 h-3 ${tenant.color}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
        <span className="text-[10px] font-mono text-slate-500">
          {tenant.isolationLevel} Isolation
        </span>
        <span className="text-[10px] font-mono text-slate-600 ml-auto">
          {tenant.encryptionType}
        </span>
      </div>
    </motion.button>
  );
}

function VaultDetail({ tenant }: { tenant: Tenant }) {
  return (
    <motion.div
      key={tenant.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-xl border border-slate-800/60 bg-slate-950/60 backdrop-blur-xl p-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-widest text-slate-600 mb-1">
            Vault Inspector
          </div>
          <h3 className="text-xl font-bold text-slate-100">{tenant.name}</h3>
        </div>
        <div
          className={`px-3 py-1.5 rounded-lg border ${tenant.borderColor} bg-slate-900/50`}
        >
          <span className={`text-xs font-mono font-semibold ${tenant.color}`}>
            {tenant.id}
          </span>
        </div>
      </div>

      {/* Data compartments visualization */}
      <div className="mb-8">
        <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-3">
          Data Compartments
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-1.5">
          {Array.from({ length: 24 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.02 }}
              className={`aspect-square rounded-md border ${
                i < tenant.ledgerCount / 40
                  ? `${tenant.borderColor} bg-gradient-to-br from-slate-900/80 to-slate-800/40`
                  : "border-slate-800/20 bg-slate-900/20"
              } flex items-center justify-center`}
              style={{
                boxShadow:
                  i < tenant.ledgerCount / 40
                    ? `inset 0 0 12px ${tenant.glowColor}`
                    : "none",
              }}
            >
              {i < tenant.ledgerCount / 40 && (
                <div
                  className={`w-1 h-1 rounded-full ${
                    tenant.color.replace("text-", "bg-")
                  }/40`}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Metrics grid */}
      <div className="grid grid-cols-2 gap-4">
        {[
          { label: "Transaction Volume", value: tenant.transactionVolume },
          { label: "Active Ledgers", value: tenant.ledgerCount.toLocaleString() },
          { label: "Storage Consumed", value: tenant.storageUsed },
          { label: "Encryption", value: tenant.encryptionType },
          { label: "Isolation Level", value: tenant.isolationLevel },
          { label: "Region", value: tenant.region },
        ].map((metric) => (
          <div
            key={metric.label}
            className="rounded-lg border border-slate-800/30 bg-slate-900/30 p-3"
          >
            <div className="text-[10px] font-mono uppercase tracking-widest text-slate-600 mb-1">
              {metric.label}
            </div>
            <div className="text-sm font-mono font-semibold text-slate-300">
              {metric.value}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function MultiTenantVault() {
  const [selectedTenant, setSelectedTenant] = useState<Tenant>(tenants[0]);

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
          <div className="h-px flex-1 max-w-12 bg-gradient-to-r from-slate-500/50 to-transparent" />
          <span className="text-xs font-mono uppercase tracking-widest text-slate-400/70">
            Multi-Tenant Vault
          </span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl font-bold text-slate-100 tracking-tight text-balance"
        >
          Isolated compartments,{" "}
          <span className="text-slate-400">zero data leakage</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-base text-slate-400 max-w-xl leading-relaxed"
        >
          Each SaaS client operates within a cryptographically isolated vault.
          Physical-level separation for enterprise, logical isolation for growth
          - all encrypted at rest and in transit.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="max-w-6xl mx-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-6">
          {/* Vault cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3">
            {tenants.map((tenant) => (
              <VaultCard
                key={tenant.id}
                tenant={tenant}
                isSelected={selectedTenant.id === tenant.id}
                onClick={() => setSelectedTenant(tenant)}
              />
            ))}
          </div>

          {/* Detail panel */}
          <div className="hidden lg:block">
            <VaultDetail tenant={selectedTenant} />
          </div>
        </div>

        {/* Mobile detail */}
        <div className="lg:hidden mt-6">
          <VaultDetail tenant={selectedTenant} />
        </div>
      </motion.div>
    </section>
  );
}
