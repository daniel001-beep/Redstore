'use client';

import React from 'react';
import DashboardLayout from '@/app/components/DashboardLayout';
import { Shield, CheckCircle } from 'lucide-react';

export default function SecurityPage() {
  const securityItems = [
    { label: 'SOC 2 Type II', status: 'Certified', icon: CheckCircle },
    { label: 'PCI DSS Compliant', status: 'Certified', icon: CheckCircle },
    { label: 'GDPR Compliant', status: 'Certified', icon: CheckCircle },
    { label: 'End-to-End Encryption', status: 'Active', icon: CheckCircle },
    { label: '256-bit AES Encryption', status: 'Active', icon: CheckCircle },
    { label: 'Multi-Factor Authentication', status: 'Enabled', icon: CheckCircle },
  ];

  return (
    <DashboardLayout>
      <div className="pt-4">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-8 h-8 text-blue-500" />
            <h1 className="text-4xl font-bold text-slate-100">Security Audit</h1>
          </div>
          <p className="text-slate-400">Enterprise security certifications and compliance status</p>
          <p className="text-xs text-slate-500 mt-2">Last verified: 2026-04-26</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {securityItems.map((item) => {
            const Icon = item.icon;
            
            return (
              <div key={item.label} className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-all duration-200">
                <div className="flex items-start gap-4">
                  <Icon className="w-6 h-6 text-green-400 shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-slate-100 mb-1">{item.label}</h3>
                    <p className="text-sm text-slate-400">
                      Status: <span className="text-green-400 font-medium">{item.status}</span>
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
