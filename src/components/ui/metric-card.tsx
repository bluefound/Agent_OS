'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  value: number | string;
  label: string;
  subtext?: string;
  icon?: LucideIcon;
  trend?: {
    value: string;
    positive?: boolean;
  };
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  value,
  label,
  subtext,
  icon: Icon,
  trend,
  className = '',
}) => {
  return (
    <div className={`bg-[#111417] border border-white/8 rounded-xl p-5 flex flex-col justify-between transition-colors hover:border-white/15 ${className}`}>
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
          {label}
        </span>
        {Icon && <Icon className="w-4 h-4 text-muted-foreground stroke-[1.5]" />}
      </div>
      <div className="mt-3 flex items-baseline gap-2">
        <span className="font-mono-data text-3xl font-bold tracking-tight text-[#F3F4F6]">
          {value}
        </span>
        {trend && (
          <span
            className={`text-xs font-mono-data font-medium ${
              trend.positive ? 'text-[#B8F35A]' : 'text-rose-400'
            }`}
          >
            {trend.value}
          </span>
        )}
      </div>
      {subtext && (
        <span className="mt-1 text-xs text-muted-foreground">
          {subtext}
        </span>
      )}
    </div>
  );
};
