'use client';

import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import type { MonthlyStatistic } from '@/lib/types';

interface StatsChartProps {
  data: MonthlyStatistic[];
}

export const StatsChart: React.FC<StatsChartProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-[#111417] border border-white/8 rounded-xl p-6 text-center text-xs text-muted-foreground">
        No monthly trend data available.
      </div>
    );
  }

  return (
    <div className="bg-[#111417] border border-white/8 rounded-xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Season Performance & Rating Trajectory (2025/26)
          </h3>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            Average match rating and minutes played per month
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs font-mono-data">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#B8F35A]" />
            <span className="text-[#F3F4F6]">Match Rating (1-10)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
            <span className="text-muted-foreground">Minutes</span>
          </div>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRating" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#B8F35A" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#B8F35A" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="colorMinutes" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis
              dataKey="month"
              stroke="#6B7280"
              fontSize={11}
              fontFamily="var(--font-mono)"
              tickLine={false}
              axisLine={{ stroke: 'rgba(255,255,255,0.08)' }}
            />
            <YAxis
              yAxisId="left"
              domain={[5, 10]}
              stroke="#6B7280"
              fontSize={11}
              fontFamily="var(--font-mono)"
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              domain={[0, 400]}
              stroke="#6B7280"
              fontSize={11}
              fontFamily="var(--font-mono)"
              hide
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#171B1F',
                borderColor: 'rgba(255,255,255,0.1)',
                borderRadius: '8px',
                color: '#F3F4F6',
                fontSize: '12px',
                fontFamily: 'var(--font-mono)',
              }}
              formatter={(value: any, name: any) => [
                name === 'rating' ? `${value} / 10` : `${value} mins`,
                name === 'rating' ? 'Match Rating' : 'Minutes Played',
              ]}
            />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="rating"
              stroke="#B8F35A"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorRating)"
            />
            <Area
              yAxisId="right"
              type="monotone"
              dataKey="minutes"
              stroke="#0ea5e9"
              strokeWidth={1.5}
              fillOpacity={1}
              fill="url(#colorMinutes)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
