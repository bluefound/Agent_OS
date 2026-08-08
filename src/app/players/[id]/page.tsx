'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { AppShell } from '@/components/layout/app-shell';
import { PlayerHeader } from '@/components/players/player-header';
import { StatCard } from '@/components/ui/stat-card';
import { MatchDial } from '@/components/ui/match-dial';
import { CareerTimeline } from '@/components/players/career-timeline';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StatsChart } from '@/components/players/stats-chart';
import { getPlayerById, getPlayerStatistics, getPlayerMonthlyStats, getPlayerCareer, getPlayerCommercial, getPlayerDocuments } from '@/lib/db';
import type { Player, PlayerStatistic, MonthlyStatistic, CareerEntry, CommercialOpportunity, PlayerDocument } from '@/lib/types';
import { FileText, Shield, Sparkles, Building2 } from 'lucide-react';

export default function PlayerDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [player, setPlayer] = useState<Player | null>(null);
  const [stats, setStats] = useState<PlayerStatistic | null>(null);
  const [monthlyStats, setMonthlyStats] = useState<MonthlyStatistic[]>([]);
  const [career, setCareer] = useState<CareerEntry[]>([]);
  const [commercial, setCommercial] = useState<CommercialOpportunity[]>([]);
  const [documents, setDocuments] = useState<PlayerDocument[]>([]);

  useEffect(() => {
    async function loadData() {
      if (!id) return;
      const p = await getPlayerById(id);
      if (p) {
        setPlayer(p);
        const [st, ms, ca, co, doc] = await Promise.all([
          getPlayerStatistics(p.id),
          getPlayerMonthlyStats(p.id),
          getPlayerCareer(p.id),
          getPlayerCommercial(p.id),
          getPlayerDocuments(p.id),
        ]);
        if (st) setStats(st);
        setMonthlyStats(ms);
        setCareer(ca);
        setCommercial(co);
        setDocuments(doc);
      }
    }
    loadData();
  }, [id]);

  if (!player) {
    return (
      <AppShell>
        <div className="p-8 text-center text-muted-foreground">
          Loading player intelligence...
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="space-y-6 max-w-7xl mx-auto">
        <PlayerHeader player={player} />

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="bg-[#111417] border border-white/8 p-1 rounded-xl h-11">
            <TabsTrigger value="overview" className="text-xs font-semibold data-[state=active]:bg-[#171B1F] data-[state=active]:text-[#B8F35A]">
              Overview
            </TabsTrigger>
            <TabsTrigger value="career" className="text-xs font-semibold data-[state=active]:bg-[#171B1F] data-[state=active]:text-[#B8F35A]">
              Career Trajectory
            </TabsTrigger>
            <TabsTrigger value="commercial" className="text-xs font-semibold data-[state=active]:bg-[#171B1F] data-[state=active]:text-[#B8F35A]">
              Commercial ({commercial.length})
            </TabsTrigger>
            <TabsTrigger value="documents" className="text-xs font-semibold data-[state=active]:bg-[#171B1F] data-[state=active]:text-[#B8F35A]">
              Documents ({documents.length})
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6 mt-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              <StatCard label="APPEARANCES" value={stats?.appearances || 28} suffix="matches" />
              <StatCard label="MINUTES PLAYED" value={stats?.minutes || 2380} suffix="mins" />
              <StatCard label="GOALS" value={stats?.goals || 3} />
              <StatCard label="ASSISTS" value={stats?.assists || 2} />
              <StatCard label="TACKLES WON %" value={`${stats?.tacklesPct || 78}%`} />
              <StatCard label="DUELS WON %" value={`${stats?.duelsWonPct || 72}%`} />
            </div>

            <StatsChart data={monthlyStats} />
            <CareerTimeline entries={career} />
          </TabsContent>

          {/* Career Tab */}
          <TabsContent value="career" className="mt-6">
            <CareerTimeline entries={career} />
          </TabsContent>

          {/* Statistics Tab */}
          <TabsContent value="statistics" className="space-y-6 mt-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <StatCard label="PASS ACCURACY %" value={`${stats?.passAccuracy || 88}%`} />
              <StatCard label="AERIAL DUELS %" value={`${stats?.aerialWonPct || 74}%`} />
              <StatCard label="CLEAN SHEETS" value={stats?.cleanSheets || 12} />
              <StatCard label="INTERCEPTIONS" value={stats?.interceptions || 67} />
            </div>
            <StatsChart data={monthlyStats} />
          </TabsContent>

          {/* Commercial Tab */}
          <TabsContent value="commercial" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {commercial.length === 0 ? (
                <div className="p-8 text-center text-xs text-muted-foreground bg-[#111417] border border-white/8 rounded-xl col-span-2">
                  No commercial opportunities currently linked.
                </div>
              ) : (
                commercial.map((op) => (
                  <div key={op.id} className="bg-[#111417] border border-white/8 rounded-xl p-5 flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-muted-foreground" />
                        <h4 className="text-sm font-bold text-[#F3F4F6]">{op.brand}</h4>
                        <span className="text-[10px] font-mono-data px-1.5 py-0.5 rounded bg-white/5 text-[#B8F35A]">
                          {op.type}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">{op.description}</p>
                      {op.value && (
                        <div className="font-mono-data text-xs font-bold text-[#F3F4F6] pt-1">
                          Estimated Value: €{op.value.toLocaleString()}
                        </div>
                      )}
                    </div>
                    <MatchDial score={op.matchScore} size="sm" label="FIT SCORE" />
                  </div>
                ))
              )}
            </div>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className="mt-6">
            <div className="bg-[#111417] border border-white/8 rounded-xl p-6 space-y-3">
              {documents.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-3 rounded-lg bg-[#171B1F] border border-white/8">
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-[#B8F35A]" />
                    <div>
                      <h5 className="text-xs font-semibold text-[#F3F4F6]">{doc.title}</h5>
                      <span className="text-[10px] font-mono-data text-muted-foreground">
                        {doc.fileSize} · Uploaded {doc.uploadedAt}
                      </span>
                    </div>
                  </div>
                  <span className="font-mono-data text-xs px-2 py-0.5 rounded bg-white/5 border border-white/10 text-emerald-400">
                    {doc.status}
                  </span>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  );
}
