'use client';

import React from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { Activity, Shield, Sparkles, FileText, CheckCircle2 } from 'lucide-react';

export default function ActivityPage() {
  const activities = [
    { id: 1, action: 'Match Dial calculated', desc: 'FC Nordsjælland fit score updated to 92% for Samuel Adeyemi', time: '10 mins ago' },
    { id: 2, action: 'Transfer Brief Generated', desc: 'Dossier compiled for Samuel Adeyemi target clubs', time: '1 hour ago' },
    { id: 3, action: 'Contract Alert', desc: 'Daniel Mensah contract expiration highlighted (<12 months)', time: '3 hours ago' },
    { id: 4, action: 'Commercial Proposal', desc: 'Nike endorsement deal moved to Negotiating for Kwame Asante', time: '5 hours ago' },
    { id: 5, action: 'Player Added', desc: 'Emmanuel Bello added to IFK Göteborg tracking portfolio', time: '1 day ago' },
  ];

  return (
    <AppShell>
      <div className="space-y-6 max-w-5xl mx-auto">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#F3F4F6]">
            Agency Operations Activity Log
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Real-time audit trail of transfer inquiries, match scoring updates, and player portfolio operations.
          </p>
        </div>

        <div className="bg-[#111417] border border-white/8 rounded-xl p-6 space-y-4">
          {activities.map((act) => (
            <div key={act.id} className="flex items-start gap-4 p-3 rounded-lg bg-[#171B1F] border border-white/8">
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                <Activity className="w-4 h-4 text-[#B8F35A]" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-[#F3F4F6]">{act.action}</h4>
                  <span className="font-mono-data text-[10px] text-muted-foreground">{act.time}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{act.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
