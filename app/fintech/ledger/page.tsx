'use client';

import React from 'react';
import DashboardLayout from '@/app/components/DashboardLayout';
import { BookOpen } from 'lucide-react';

export default function LedgerPage() {
  const transactionHistory = [
    { id: 'TXN-001', type: 'TRANSFER', description: 'Wire to Checking', date: '2026-04-26', amount: '$25,000.00', status: 'Completed' },
    { id: 'TXN-002', type: 'DEPOSIT', description: 'Deposit from Wire', date: '2026-04-25', amount: '$50,000.00', status: 'Completed' },
    { id: 'TXN-003', type: 'BUY', description: 'Apple Inc. AAPL', date: '2026-04-24', amount: '$8,750.00', status: 'Completed' },
    { id: 'TXN-004', type: 'DIVIDEND', description: 'MSFT Dividend', date: '2026-04-23', amount: '$1,240.00', status: 'Completed' },
    { id: 'TXN-005', type: 'EXCHANGE', description: 'Multi-Currency', date: '2026-04-22', amount: '$15,000.00', status: 'Completed' },
  ];

  return (
    <DashboardLayout>
      <div className="pt-4">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-8 h-8 text-blue-500" />
            <h1 className="text-4xl font-bold text-slate-100">Ledger</h1>
          </div>
          <p className="text-slate-400">Complete transaction history and reconciliation</p>
          <p className="text-xs text-slate-500 mt-2">Last synced: just now</p>
        </div>
        
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-8">
          <h2 className="text-xl font-bold text-slate-100 mb-6">Transaction History</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">ID</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Type</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Description</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Date</th>
                  <th className="text-right py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Amount</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactionHistory.map((tx, idx) => (
                  <tr key={tx.id} className={`border-b border-slate-700 ${idx % 2 === 0 ? 'bg-slate-900/30' : ''}`}>
                    <td className="py-4 px-4 font-mono text-slate-300 text-sm">{tx.id}</td>
                    <td className="py-4 px-4 text-slate-200 font-medium text-sm">{tx.type}</td>
                    <td className="py-4 px-4 text-slate-400 text-sm">{tx.description}</td>
                    <td className="py-4 px-4 text-slate-400 text-sm">{tx.date}</td>
                    <td className="py-4 px-4 text-right font-mono font-semibold text-slate-100 text-sm">{tx.amount}</td>
                    <td className="py-4 px-4">
                      <span className="inline-block px-2 py-1 rounded text-xs font-semibold bg-green-900 text-green-400">
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
