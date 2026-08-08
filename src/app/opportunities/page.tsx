'use client';

import React, { useState, useEffect } from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { MatchDial } from '@/components/ui/match-dial';
import { Button } from '@/components/ui/button';
import { getPlayers, getClubs } from '@/lib/db';
import { findOpportunitiesForPlayer } from '@/lib/matching';
import type { Player, TransferOpportunity } from '@/lib/types';
import { Sparkles, CheckCircle2, Shield, Mail, UserCheck } from 'lucide-react';

export default function OpportunitiesPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedPlayerId, setSelectedPlayerId] = useState<string>('p-001');
  const [opportunities, setOpportunities] = useState<TransferOpportunity[]>([]);

  useEffect(() => {
    async function loadData() {
      const allPlayers = await getPlayers();
      setPlayers(allPlayers);
      if (allPlayers.length > 0) {
        const p = allPlayers.find(x => x.id === 'p-001') || allPlayers[0];
        const allClubs = await getClubs();
        const opps = findOpportunitiesForPlayer(p, allClubs);
        setOpportunities(opps);
      }
    }
    loadData();
  }, []);

  const handlePlayerChange = async (playerId: string) => {
    setSelectedPlayerId(playerId);
    const p = players.find(x => x.id === playerId);
    if (p) {
      const allClubs = await getClubs();
      const opps = findOpportunitiesForPlayer(p, allClubs);
      setOpportunities(opps);
    }
  };

  const selectedPlayer = players.find(x => x.id === selectedPlayerId);

  return (
    <AppShell>
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#F3F4F6]">
            Transfer Intelligence
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Discover and qualify potential destinations for your players using deterministic match scoring.
          </p>
        </div>

        {/* Player Selector Header */}
        <div className="bg-[#111417] border border-white/8 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Select Player:</span>
            <select
              value={selectedPlayerId}
              onChange={(e) => handlePlayerChange(e.target.value)}
              className="bg-[#171B1F] border border-white/10 text-xs text-[#F3F4F6] font-semibold rounded-lg px-3 py-2 focus:outline-none focus:border-[#B8F35A]"
            >
              {players.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.firstName} {p.lastName} ({p.position} · {p.currentClub})
                </option>
              ))}
            </select>
          </div>

          {selectedPlayer && (
            <div className="flex items-center gap-4 text-xs font-mono-data text-muted-foreground">
              <span>Age: <strong className="text-[#F3F4F6]">{selectedPlayer.age}</strong></span>
              <span>Nationality: <strong className="text-[#F3F4F6]">{selectedPlayer.nationality}</strong></span>
              <span>Market Value: <strong className="text-[#B8F35A]">€{(selectedPlayer.marketValue / 1000000).toFixed(1)}M</strong></span>
            </div>
          )}
        </div>

        {/* Opportunities List */}
        <div className="space-y-4">
          {opportunities.map((opp) => (
            <div key={opp.id} className="bg-[#111417] border border-white/8 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-white/15 transition-colors">
              <div className="space-y-3 flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#171B1F] border border-white/10 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-[#B8F35A]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#F3F4F6]">{opp.club.name}</h3>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{opp.club.league}</span>
                      <span>·</span>
                      <span>{opp.club.country}</span>
                      <span>·</span>
                      <span className="font-mono-data text-[#B8F35A]">{opp.club.competitionLevel}</span>
                    </div>
                  </div>
                </div>

                {/* Why This Match Checklist */}
                <div className="space-y-1.5 pt-1">
                  <div className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                    Why This Match:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {opp.factors.filter(f => f.showAsReason).map((factor, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-[#F3F4F6]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#B8F35A] shrink-0 mt-0.5" />
                        <span>{factor.description}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact Info */}
                <div className="flex items-center gap-4 text-xs text-muted-foreground border-t border-white/5 pt-3">
                  <div className="flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-muted-foreground" />
                    <span>{opp.club.contactName} ({opp.club.contactTitle})</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-muted-foreground" />
                    <span className="font-mono-data text-[11px]">{opp.club.contactEmail}</span>
                  </div>
                </div>
              </div>

              {/* Match Dial & Action CTAs */}
              <div className="flex flex-col items-center gap-4 shrink-0 border-t md:border-t-0 md:border-l border-white/8 pt-4 md:pt-0 md:pl-6">
                <MatchDial score={opp.matchScore} size="lg" label="MATCH SCORE" />
                <div className="flex items-center gap-2 w-full">
                  <Button variant="outline" className="flex-1 bg-[#171B1F] border-white/10 text-xs text-[#F3F4F6] hover:bg-white/5 h-8">
                    View Club
                  </Button>
                  <Button className="flex-1 bg-[#B8F35A] text-[#0B0D0F] hover:bg-[#a3db4a] font-semibold text-xs h-8">
                    Add to Pipeline
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
