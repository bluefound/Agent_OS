'use client';

import React from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { Contact, Mail, Phone, Building2, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { clubs } from '@/lib/data/clubs';

export default function ContactsPage() {
  return (
    <AppShell>
      <div className="space-y-6 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#F3F4F6]">
              Executive Contacts Network
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Direct directory of European sporting directors, head scouts, and club decision-makers.
            </p>
          </div>

          <Button className="bg-[#B8F35A] text-[#0B0D0F] hover:bg-[#a3db4a] font-semibold text-xs h-9 px-4 rounded-lg flex items-center gap-1.5 shrink-0">
            <UserPlus className="w-4 h-4" />
            Add Contact
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {clubs.map((club) => (
            <div key={club.id} className="bg-[#111417] border border-white/8 rounded-xl p-5 space-y-3 hover:border-white/15 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#171B1F] border border-white/10 flex items-center justify-center font-bold text-xs text-[#B8F35A]">
                    {club.name[0]}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#F3F4F6]">{club.contactName}</h4>
                    <span className="text-[11px] text-muted-foreground">{club.contactTitle}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-muted-foreground border-t border-white/5 pt-3">
                <div className="flex items-center gap-2">
                  <Building2 className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="text-[#F3F4F6] font-medium">{club.name} ({club.country})</span>
                </div>
                <div className="flex items-center gap-2 font-mono-data text-[11px]">
                  <Mail className="w-3.5 h-3.5 text-muted-foreground" />
                  <span>{club.contactEmail}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
