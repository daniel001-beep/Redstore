'use client';

import React from 'react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  Tooltip
} from 'recharts';

interface ExpenseAllocationProps {
  transactions?: any[];
}

export default function ExpenseAllocation({ transactions = [] }: ExpenseAllocationProps) {
  let salaries = 624991.78;
  let utilities = 349665.01;
  let marketing = 250547.37;
  let other = 151429.72;

  transactions.forEach(tx => {
    if (tx.amount < 0) {
      const desc = tx.description.toLowerCase();
      const amt = Math.abs(tx.amount);
      if (desc.includes('salary') || desc.includes('payroll')) {
        salaries += amt;
      } else if (desc.includes('rent') || desc.includes('util') || desc.includes('cloud') || desc.includes('host') || desc.includes('license') || desc.includes('supply')) {
        utilities += amt;
      } else if (desc.includes('marketing') || desc.includes('ads') || desc.includes('promo')) {
        marketing += amt;
      } else {
        other += amt;
      }
    }
  });

  const totalExpenses = salaries + utilities + marketing + other;

  const data = totalExpenses > 0 ? [
    { name: 'Salaries', value: Math.round((salaries / totalExpenses) * 1000) / 10, color: '#0052cc' },
    { name: 'Rent & Utilities', value: Math.round((utilities / totalExpenses) * 1000) / 10, color: '#00b4d8' },
    { name: 'Marketing', value: Math.round((marketing / totalExpenses) * 1000) / 10, color: '#7209b7' },
    { name: 'Inventory & Other', value: Math.round((other / totalExpenses) * 1000) / 10, color: '#f72585' },
  ].filter(d => d.value > 0) : [
    { name: 'Salaries', value: 0, color: '#0052cc' },
    { name: 'Rent & Utilities', value: 0, color: '#00b4d8' },
    { name: 'Marketing', value: 0, color: '#7209b7' },
    { name: 'Inventory & Other', value: 0, color: '#f72585' },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h2 style={{ color: '#0f172a' }} className="text-sm font-bold tracking-tight">
          Operating Expense Allocation
        </h2>
      </div>

      {/* Main Content Layout (Vertical stacking for premium dashboard layouts) */}
      <div className="flex flex-col gap-5 grow py-2">
        {/* Donut Chart Container */}
        <div className="w-full h-[180px] relative flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={4}
                dataKey="value"
                cx="50%"
                cy="50%"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '11px' }}
                formatter={(value) => [`${value}%`]}
              />
            </PieChart>
          </ResponsiveContainer>
          {/* Centered Donut Label */}
          <div className="absolute flex flex-col items-center justify-center text-center select-none pointer-events-none">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Operating</span>
            <span className="text-xl font-black text-slate-800 leading-tight">Expenses</span>
          </div>
        </div>

        {/* Legend: Sleek 2x2 Grid that avoids squishing */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-4 mt-2">
          {data.map((item) => (
            <div key={item.name} className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center text-xs">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span 
                    className="w-2.5 h-2.5 rounded-full shrink-0" 
                    style={{ backgroundColor: item.color }} 
                  />
                  <span className="font-semibold text-slate-650 truncate">{item.name}</span>
                </div>
                <span className="font-bold text-slate-800 shrink-0 pl-1">{item.value}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-500" 
                  style={{ 
                    width: `${item.value}%`, 
                    backgroundColor: item.color 
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Total expense footer */}
      <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
        <span className="font-semibold text-slate-400">Total Expenses</span>
        <span className="font-bold text-slate-800 text-sm">
          USD {totalExpenses.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
      </div>
    </div>
  );
}
