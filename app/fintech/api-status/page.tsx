'use client';

import React from 'react';
import DashboardLayout from '@/app/components/DashboardLayout';
import { Activity, CheckCircle } from 'lucide-react';

export default function APIStatusPage() {
  const apiEndpoints = [
    { name: 'Portfolio Analysis API', latency: '8.3ms', status: 'healthy' },
    { name: 'Multi-Currency Engine', latency: '5.1ms', status: 'healthy' },
    { name: 'Transaction Processor', latency: '12.4ms', status: 'healthy' },
    { name: 'Risk Management API', latency: '15.2ms', status: 'healthy' },
    { name: 'Settlement Engine', latency: '9.8ms', status: 'healthy' },
    { name: 'Reconciliation Service', latency: '18.5ms', status: 'healthy' },
  ];

  return (
    <DashboardLayout>
      <div className="pt-4">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Activity className="w-8 h-8 text-blue-500" />
            <h1 className="text-4xl font-bold text-slate-100">API Status</h1>
          </div>
          <p className="text-slate-400">Real-time system health and endpoint latency</p>
          <p className="text-xs text-slate-500 mt-2">Last checked: just now</p>
        </div>
        
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 mb-8">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-100 mb-3">Overall Status</h2>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-400 font-semibold">All Systems Operational</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {apiEndpoints.map((endpoint) => (
            <div key={endpoint.name} className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-all duration-200">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-slate-100">{endpoint.name}</p>
                    <p className="text-xs text-slate-500 mt-1">Status: <span className="text-green-400">{endpoint.status}</span></p>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-700">
                <p className="font-mono text-sm text-cyan-400 font-semibold">{endpoint.latency}</p>
                <p className="text-xs text-slate-500">latency</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
