import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, TrendingDown, LucideIcon } from 'lucide-react';
import { Card } from '../ui/Card';

interface KPICardProps {
  title: string;
  value: string;
  percentage: number;
  icon: LucideIcon;
  trend: 'up' | 'down';
}

export function KPICard({ title, value, percentage, icon: Icon, trend }: KPICardProps) {
  return (
    <Card className="flex flex-col group hover:-translate-y-1 transition-transform duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-background rounded-2xl shadow-[var(--shadow-clay-active)] text-primary transition-transform duration-300 group-hover:scale-110">
          <Icon className="w-6 h-6" />
        </div>
        <div className={`flex items-center gap-1 text-sm font-semibold px-2.5 py-1 rounded-full shadow-[var(--shadow-clay-sm)] ${trend === 'up' ? 'text-success bg-success/10' : 'text-danger bg-danger/10'}`}>
          {trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          {Math.abs(percentage)}%
        </div>
      </div>
      <div>
        <h3 className="text-text-muted font-medium mb-1">{title}</h3>
        <p className="text-3xl font-bold tracking-tight">{value}</p>
      </div>
    </Card>
  );
}
