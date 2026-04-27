import React from 'react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <main className="w-full mx-auto px-4 md:px-8 py-8 max-w-7xl">
      {children}
    </main>
  );
}
