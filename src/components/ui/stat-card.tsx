'use client';

import React from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  suffix?: string;
  badgeText?: string;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  suffix,
  badgeText,
  className = '',
}) => {
  return (
    <div className={`bg-[#171B1F] border border-white/8 rounded-xl p-4 flex flex-col justify-between ${className}`}>
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
          {label}
        </span>
        {badgeText && (
          <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono-data text-[#B8F35A]">
            {badgeText}
          </span>
        )}
      </div>
      <div className="mt-2 flex items-baseline gap-1">
        <span className="font-mono-data text-2xl font-bold tracking-tight text-[#F3F4F6]">
          {value}
        </span>
        {suffix && (
          <span className="font-mono-data text-sm text-muted-foreground">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
};
