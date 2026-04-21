import React from 'react';
import Link from 'next/link';
import { LayoutDashboard, BarChart3, ShoppingCart, Lock, Activity } from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeTab?: 'dashboard' | 'ledger' | 'marketplace' | 'security' | 'api';
}

import Navbar from './Navbar';

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-base-bg flex flex-col">
      <Navbar />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}
