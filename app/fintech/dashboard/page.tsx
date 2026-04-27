'use client';

import React from 'react';
import { TrendingUp, TrendingDown, Activity, Info } from 'lucide-react';
import DashboardLayout from '@/app/components/DashboardLayout';
import AssetAllocation from '@/app/components/AssetAllocation';

export default function DashboardPage() {
  // Portfolio stat cards
  const statCards = [
    {
      label: 'Total Balance',
      value: '$2,847,392.50',
      subtext: '+$12,430 today',
      icon: TrendingUp,
      color: '#22c55e',
    },
    {
      label: 'Net Position',
      value: '+$485,920.00',
      subtext: '+20.58% overall return',
      icon: TrendingUp,
      color: '#22c55e',
    },
    {
      label: 'Monthly Yield',
      value: '4.28%',
      subtext: 'Above market avg by 1.2%',
      icon: TrendingUp,
      color: '#22c55e',
    },
    {
      label: 'Active Assets',
      value: '34 Positions',
      subtext: 'Across 8 asset classes',
      icon: Info,
      color: '#3b82f6',
    },
  ];

  // Top holdings data
  const topHoldings = [
    {
      asset: 'Apple Inc.',
      ticker: 'AAPL',
      value: '$324,500',
      change: '+2.4%',
      weight: '11.4%',
      isPositive: true,
    },
    {
      asset: 'US Treasury Bond 10Y',
      ticker: 'UST10',
      value: '$280,000',
      change: '+0.3%',
      weight: '9.8%',
      isPositive: true,
    },
    {
      asset: 'Microsoft Corp',
      ticker: 'MSFT',
      value: '$215,300',
      change: '+1.8%',
      weight: '7.6%',
      isPositive: true,
    },
    {
      asset: 'Vanguard Real Estate ETF',
      ticker: 'VNQ',
      value: '$140,200',
      change: '-0.5%',
      weight: '4.9%',
      isPositive: false,
    },
    {
      asset: 'Gold Futures',
      ticker: 'XAUUSD',
      value: '$98,700',
      change: '+1.1%',
      weight: '3.5%',
      isPositive: true,
    },
  ];

  // Recent transactions
  const recentTransactions = [
    {
      id: 'TXN-001',
      type: 'TRANSFER',
      description: 'Wire to Checking Account',
      amount: '-$25,000.00',
      status: 'completed',
    },
    {
      id: 'TXN-002',
      type: 'DEPOSIT',
      description: 'Deposit from Wire',
      amount: '+$50,000.00',
      status: 'completed',
    },
    {
      id: 'TXN-003',
      type: 'TRANSFER',
      description: 'Multi-Currency Exchange',
      amount: '-$15,000.00',
      status: 'completed',
    },
    {
      id: 'TXN-004',
      type: 'BUY',
      description: 'Apple Inc. AAPL x50',
      amount: '-$8,750.00',
      status: 'completed',
    },
    {
      id: 'TXN-005',
      type: 'DIVIDEND',
      description: 'MSFT Quarterly Dividend',
      amount: '+$1,240.00',
      status: 'pending',
    },
  ];

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-slate-950 pt-4">
        {/* Header with live indicator */}
        <div className="border-b border-slate-700 pb-6 mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-slate-100 mb-2">Portfolio Dashboard</h1>
              <p className="text-slate-400">Real-time portfolio analytics and transaction history</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-slate-800 rounded-lg border border-slate-700">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium text-green-400">Live</span>
            </div>
          </div>
          <p className="text-xs text-slate-500">Last synced: just now</p>
        </div>

        {/* Portfolio Stats Grid - 4 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
          {statCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.label}
                className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
                    {card.label}
                  </span>
                  <Icon className="w-4 h-4" style={{ color: card.color }} />
                </div>
                <p className="text-3xl font-bold text-slate-100 mb-2">{card.value}</p>
                <p className="text-sm text-slate-400">{card.subtext}</p>
              </div>
            );
          })}
        </div>

        {/* Asset Allocation Section */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-100 mb-6">Asset Allocation</h2>
          <AssetAllocation />
        </div>

        {/* Top Holdings Table */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-100 mb-6">Top Holdings</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Asset
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Ticker
                  </th>
                  <th className="text-right py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Value
                  </th>
                  <th className="text-right py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Change
                  </th>
                  <th className="text-right py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Weight
                  </th>
                </tr>
              </thead>
              <tbody>
                {topHoldings.map((holding, idx) => (
                  <tr
                    key={holding.ticker}
                    className={`border-b border-slate-700 ${idx % 2 === 0 ? 'bg-slate-900/30' : ''}`}
                  >
                    <td className="py-4 px-4 text-slate-200 font-medium">{holding.asset}</td>
                    <td className="py-4 px-4 font-mono text-slate-400">{holding.ticker}</td>
                    <td className="py-4 px-4 text-right font-mono text-slate-100">{holding.value}</td>
                    <td
                      className={`py-4 px-4 text-right font-mono font-semibold ${
                        holding.isPositive ? 'text-green-400' : 'text-red-400'
                      }`}
                    >
                      {holding.change}
                    </td>
                    <td className="py-4 px-4 text-right font-mono text-slate-400">{holding.weight}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-slate-100 mb-6">Recent Transactions</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="text-right py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((tx) => (
                  <tr key={tx.id} className="border-b border-slate-700">
                    <td className="py-4 px-4 font-mono text-slate-300 text-sm">{tx.id}</td>
                    <td className="py-4 px-4 text-slate-200 font-medium text-sm">{tx.type}</td>
                    <td className="py-4 px-4 text-slate-400 text-sm">{tx.description}</td>
                    <td
                      className={`py-4 px-4 text-right font-mono font-semibold text-sm ${
                        tx.amount.startsWith('+') ? 'text-green-400' : 'text-slate-100'
                      }`}
                    >
                      {tx.amount}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                          tx.status === 'completed'
                            ? 'bg-green-900 text-green-400'
                            : tx.status === 'pending'
                              ? 'bg-yellow-900 text-yellow-400'
                              : 'bg-red-900 text-red-400'
                        }`}
                      >
                        {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
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
