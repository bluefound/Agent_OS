'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Users, GitPullRequest, AlertCircle, Award } from 'lucide-react';
import { AppShell } from '@/components/layout/app-shell';
import { MetricCard } from '@/components/ui/metric-card';
import { FilterBar } from '@/components/players/filter-bar';
import { PlayerTable } from '@/components/players/player-table';
import { AddPlayerDialog } from '@/components/players/add-player-dialog';
import { getPlayers, getDashboardKPIs, getUniqueCountries } from '@/lib/db';
import type { Player, Position, ContractStatus, MarketStatus } from '@/lib/types';

export default function PlayersPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [kpis, setKpis] = useState({
    totalPlayers: 47,
    activeOpportunities: 12,
    contractsExpiring: 8,
    commercialOpportunities: 23,
  });

  const [search, setSearch] = useState('');
  const [position, setPosition] = useState('ALL');
  const [country, setCountry] = useState('ALL');
  const [contractStatus, setContractStatus] = useState('ALL');
  const [marketStatus, setMarketStatus] = useState('ALL');

  useEffect(() => {
    async function loadData() {
      const allCountries = await getUniqueCountries();
      setCountries(allCountries);

      const stats = await getDashboardKPIs();
      setKpis(stats);
    }
    loadData();
  }, []);

  useEffect(() => {
    async function filterData() {
      const filtered = await getPlayers({
        search: search || undefined,
        position: position !== 'ALL' ? (position as Position) : undefined,
        country: country !== 'ALL' ? country : undefined,
        contractStatus: contractStatus !== 'ALL' ? (contractStatus as ContractStatus) : undefined,
        marketStatus: marketStatus !== 'ALL' ? (marketStatus as MarketStatus) : undefined,
      });
      setPlayers(filtered);
    }
    filterData();
  }, [search, position, country, contractStatus, marketStatus]);

  const handleResetFilters = () => {
    setSearch('');
    setPosition('ALL');
    setCountry('ALL');
    setContractStatus('ALL');
    setMarketStatus('ALL');
  };

  return (
    <AppShell>
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#F3F4F6]">
              Players
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Your entire player portfolio in one intelligence layer.
            </p>
          </div>

          <AddPlayerDialog onAddPlayer={(newPlayer) => {
            setPlayers(prev => [newPlayer, ...prev]);
            setKpis(prev => ({ ...prev, totalPlayers: prev.totalPlayers + 1 }));
          }} />
        </div>

        {/* KPI Strip: Four stat cards with large mono numerals */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            value={kpis.totalPlayers}
            label="ACTIVE PLAYERS"
            subtext="Across 6 European leagues"
            icon={Users}
          />
          <MetricCard
            value={kpis.activeOpportunities}
            label="ACTIVE OPPORTUNITIES"
            subtext="In active pipeline"
            icon={GitPullRequest}
          />
          <MetricCard
            value={kpis.contractsExpiring}
            label="CONTRACTS EXPIRING"
            subtext="Within 12 months"
            icon={AlertCircle}
          />
          <MetricCard
            value={kpis.commercialOpportunities}
            label="COMMERCIAL OPPORTUNITIES"
            subtext="Brand partnerships & deals"
            icon={Award}
          />
        </div>

        {/* Filter Bar */}
        <FilterBar
          search={search}
          onSearchChange={setSearch}
          position={position}
          onPositionChange={setPosition}
          country={country}
          onCountryChange={setCountry}
          contractStatus={contractStatus}
          onContractStatusChange={setContractStatus}
          marketStatus={marketStatus}
          onMarketStatusChange={setMarketStatus}
          countries={countries}
          onReset={handleResetFilters}
        />

        {/* Data Table */}
        <PlayerTable players={players} />
      </div>
    </AppShell>
  );
}
