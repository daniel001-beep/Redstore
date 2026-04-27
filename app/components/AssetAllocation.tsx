'use client';

import React from 'react';

interface AssetClass {
  name: string;
  percentage: number;
  color: string;
  value: number;
}

const AssetAllocation: React.FC = () => {
  const assets: AssetClass[] = [
    { name: 'Equities', percentage: 42, color: '#3b82f6', value: 1195000 },
    { name: 'Fixed Income', percentage: 28, color: '#06b6d4', value: 797000 },
    { name: 'Real Estate', percentage: 12, color: '#8b5cf6', value: 341000 },
    { name: 'Commodities', percentage: 10, color: '#f59e0b', value: 284000 },
    { name: 'Cash & Equivalents', percentage: 8, color: '#94a3b8', value: 227000 },
  ];

  return (
    <div className="space-y-6">
      {/* Horizontal Bar Chart */}
      <div className="flex h-10 gap-1 rounded-lg overflow-hidden shadow-md">
        {assets.map((asset) => (
          <div
            key={asset.name}
            style={{
              width: `${asset.percentage}%`,
              backgroundColor: asset.color,
            }}
            className="transition-all duration-300 hover:opacity-80"
            title={`${asset.name}: ${asset.percentage}%`}
          ></div>
        ))}
      </div>

      {/* Legend with details */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {assets.map((asset) => (
          <div key={asset.name} className="p-3 bg-slate-800 rounded-lg border border-slate-700">
            <div className="flex items-center gap-2 mb-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: asset.color }}
              ></div>
              <span className="text-xs font-medium text-slate-300">{asset.name}</span>
            </div>
            <p className="text-lg font-bold text-slate-100">{asset.percentage}%</p>
            <p className="text-xs text-slate-500">${asset.value.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssetAllocation;
