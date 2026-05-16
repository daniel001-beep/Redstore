"use client";

import { motion } from "framer-motion";

export default function StealthFooter() {
  const columns = [
    {
      title: "Product",
      links: [
        "Atomic Ledger",
        "Settlement Engine",
        "Vault Architecture",
        "Developer API",
      ],
    },
    {
      title: "Developers",
      links: ["Documentation", "API Reference", "SDKs", "Changelog"],
    },
    {
      title: "Security",
      links: ["SOC 2 Type II", "PCI DSS L1", "Penetration Testing", "Bug Bounty"],
    },
    {
      title: "Company",
      links: ["About", "Careers", "Blog", "Contact"],
    },
  ];

  return (
    <footer className="relative border-t border-slate-800/50 bg-[#020617]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-4">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <span className="text-sm text-slate-500 hover:text-slate-300 cursor-pointer transition-colors duration-200">
                      {link}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <svg width={20} height={20} viewBox="0 0 28 28" fill="none">
              <polygon
                points="3,4 9,4 15,24 9,24"
                fill="#10b981"
                opacity="0.6"
              />
              <polygon
                points="18,4 24,4 21,14 15,14"
                fill="#3b82f6"
                opacity="0.6"
              />
              <rect
                x="17"
                y="17"
                width="7"
                height="7"
                rx="1.5"
                fill="#10b981"
                opacity="0.4"
              />
            </svg>
            <span className="text-xs text-slate-600 font-mono">
              Velox Ledger Infrastructure
            </span>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-xs text-slate-600">Privacy</span>
            <span className="text-xs text-slate-600">Terms</span>
            <span className="text-xs text-slate-600">Status</span>
          </div>
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/50" />
            <span className="text-[10px] font-mono text-slate-600">
              All systems operational
            </span>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
