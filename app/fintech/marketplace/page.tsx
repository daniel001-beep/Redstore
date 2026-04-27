'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/app/components/DashboardLayout';
import MarketplaceGrid from '@/app/components/MarketplaceGrid';

export default function MarketplacePage() {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const handleSelectProduct = (productId: string) => {
    setSelectedProduct(productId);
    console.log(`Selected product: ${productId}`);
  };

  return (
    <DashboardLayout>
      <div className="pt-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-100 mb-2">Marketplace</h1>
          <p className="text-slate-400">Discover and manage investment products</p>
          <p className="text-xs text-slate-500 mt-2">Last synced: just now</p>
        </div>
        <MarketplaceGrid onSelectProduct={handleSelectProduct} />
      </div>
    </DashboardLayout>
  );
}
