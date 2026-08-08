'use client';

import React from 'react';
import { Calendar, Shield, MapPin, ArrowUpRight } from 'lucide-react';
import type { CareerEntry } from '@/lib/types';

interface CareerTimelineProps {
  entries: CareerEntry[];
}

export const CareerTimeline: React.FC<CareerTimelineProps> = ({ entries }) => {
  return (
    <div className="bg-[#111417] border border-white/8 rounded-xl p-6">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-6">
        Career History & Transfer Trajectory
      </h3>

      <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/10">
        {entries.map((entry, idx) => (
          <div key={idx} className="relative group">
            {/* Dot */}
            <div
              className={`absolute -left-[23px] top-1 w-3 h-3 rounded-full border-2 ${
                entry.transferType === 'Current'
                  ? 'bg-[#B8F35A] border-[#111417] ring-2 ring-[#B8F35A]/30'
                  : 'bg-[#171B1F] border-white/30'
              }`}
            />

            <div className="bg-[#171B1F] border border-white/8 rounded-xl p-4 transition-colors group-hover:border-white/15">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <Shield className="w-4 h-4 text-muted-foreground" />
                  <h4 className="text-sm font-semibold text-[#F3F4F6]">
                    {entry.club}
                  </h4>
                  <span className="text-xs text-muted-foreground">· {entry.league}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-mono-data text-xs px-2 py-0.5 rounded bg-white/5 border border-white/10 text-muted-foreground">
                    {entry.transferType}
                  </span>
                  <span className="font-mono-data text-xs text-muted-foreground">
                    {entry.dateFrom.slice(0, 7)} — {entry.dateTo ? entry.dateTo.slice(0, 7) : 'Present'}
                  </span>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-6 font-mono-data text-xs text-muted-foreground">
                <div>
                  Appearances: <strong className="text-[#F3F4F6]">{entry.appearances}</strong>
                </div>
                <div>
                  Goals: <strong className="text-[#F3F4F6]">{entry.goals}</strong>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-muted-foreground" />
                  <span>{entry.country}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
