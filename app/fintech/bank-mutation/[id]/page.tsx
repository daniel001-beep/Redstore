'use client';

import React, { use } from 'react';
import { useRouter } from 'next/navigation';
import { products } from '@/app/components/MarketplaceGrid';
import DashboardLayout from '@/app/components/DashboardLayout';
import { ArrowLeft, CheckCircle } from 'lucide-react';

export default function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center py-20">
          <h1 className="text-2xl font-bold text-slate-100 mb-4">Product Not Found</h1>
          <button onClick={() => router.push('/fintech/bank-mutation')} className="text-blue-500 hover:text-blue-400">
            Return to Bank Mutation
          </button>
        </div>
      </DashboardLayout>
    );
  }

  const Icon = product.icon;

  return (
    <DashboardLayout>
      <div className="pt-4 px-6 animate-in fade-in duration-500 max-w-7xl mx-auto space-y-8">
        {/* Back Button */}
        <button 
          onClick={() => router.push('/fintech/bank-mutation')}
          className="flex items-center gap-2 text-slate-400 hover:text-slate-600 transition-colors mb-4 font-bold text-xs uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-semibold">Back to Bank Mutation</span>
        </button>

        {/* Header Section */}
        <div className="bg-white border border-slate-200 rounded-[24px] shadow-sm flex flex-col md:flex-row gap-8 items-start md:items-center justify-between relative overflow-hidden p-4 xs:p-6 sm:p-8 md:p-10">
          {/* Background Glow */}
          <div 
            className="absolute top-0 right-0 w-64 h-64 opacity-5 rounded-full blur-3xl pointer-events-none transform translate-x-1/3 -translate-y-1/3"
            style={{ backgroundColor: product.accentColor }}
          />
          
          <div className="flex-1 z-10">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-xl flex items-center justify-center bg-slate-50 border border-slate-200 shrink-0">
                <Icon className="w-8 h-8" style={{ color: product.accentColor }} />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-black text-slate-800 mb-1">{product.title}</h1>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">{product.category}</p>
              </div>
            </div>
            <p className="text-slate-600 text-base font-medium leading-relaxed max-w-3xl">
              {product.description}
            </p>
          </div>
          
          <div className="bg-slate-50 border border-slate-200 p-6 rounded-[20px] shrink-0 w-full md:w-auto z-10 text-center md:text-left shadow-sm">
            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1">Target Yield</p>
            <p className="text-2xl font-bold text-emerald-600 font-mono mb-2">{product.yieldRate}</p>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1">Liquidity</p>
            <p className="text-sm font-bold text-slate-700 mb-6">{product.liquidity}</p>
            <button className="w-full py-2.5 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-md active:scale-95 text-xs uppercase tracking-wider">
              Allocate Capital
            </button>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Features */}
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-[24px] shadow-sm p-4 xs:p-6 sm:p-8">
            <h2 className="text-lg font-bold text-slate-800 mb-6">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {product.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <p className="text-slate-600 font-medium">{feature}</p>
                </div>
              ))}
              {/* Extra mock features to flesh out the page */}
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <p className="text-slate-600 font-medium">24/7 dedicated enterprise support</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <p className="text-slate-600 font-medium">99.99% Guaranteed uptime SLA</p>
              </div>
            </div>
          </div>

          {/* Compliance & Integration */}
          <div className="space-y-8">
            <div className="bg-white border border-slate-200 rounded-[24px] shadow-sm p-4 xs:p-6 sm:p-8">
              <h3 className="text-base font-bold text-slate-800 mb-4">Compliance</h3>
              <div className="flex flex-col gap-3">
                {['SOC 2 Type II', 'ISO 27001', 'PCI DSS'].map((badge) => (
                  <div key={badge} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="w-2 h-2 bg-emerald-500 rounded-sm"></div>
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-widest">{badge} Certified</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white border border-slate-200 rounded-[24px] shadow-sm p-4 xs:p-6 sm:p-8">
              <h3 className="text-base font-bold text-slate-800 mb-4">API Documentation</h3>
              <p className="text-xs text-slate-500 font-semibold mb-4 leading-relaxed">Integration guides, API references, and SDKs are available in the developer portal.</p>
              <button className="text-blue-600 hover:text-blue-700 font-bold text-xs uppercase tracking-wider flex items-center gap-1">
                View Documentation →
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
