'use client';

import React from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import type { Position, ContractStatus, MarketStatus } from '@/lib/types';

interface FilterBarProps {
  search: string;
  onSearchChange: (val: string) => void;
  position: string;
  onPositionChange: (val: string) => void;
  country: string;
  onCountryChange: (val: string) => void;
  contractStatus: string;
  onContractStatusChange: (val: string) => void;
  marketStatus: string;
  onMarketStatusChange: (val: string) => void;
  countries: string[];
  onReset: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  search,
  onSearchChange,
  position,
  onPositionChange,
  country,
  onCountryChange,
  contractStatus,
  onContractStatusChange,
  marketStatus,
  onMarketStatusChange,
  countries,
  onReset,
}) => {
  const hasActiveFilters = search || position || country || contractStatus || marketStatus;

  return (
    <div className="bg-[#111417] border border-white/8 rounded-xl p-4 flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
      {/* Search Input */}
      <div className="relative flex-1 min-w-[240px]">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search by player name, club, nationality..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 bg-[#171B1F] border-white/8 text-xs text-[#F3F4F6] placeholder:text-muted-foreground focus:border-[#B8F35A] h-9 rounded-lg"
        />
        {search && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-[#F3F4F6]"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Filter Select Controls */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Position Filter */}
        <Select value={position} onValueChange={(val) => onPositionChange(val || 'ALL')}>
          <SelectTrigger className="w-[120px] h-9 bg-[#171B1F] border-white/8 text-xs text-[#F3F4F6] rounded-lg">
            <SelectValue placeholder="Position" />
          </SelectTrigger>
          <SelectContent className="bg-[#111417] border-white/8 text-xs text-[#F3F4F6]">
            <SelectItem value="ALL">All Positions</SelectItem>
            <SelectItem value="GK">GK (Goalkeeper)</SelectItem>
            <SelectItem value="CB">CB (Centre Back)</SelectItem>
            <SelectItem value="LB">LB (Left Back)</SelectItem>
            <SelectItem value="RB">RB (Right Back)</SelectItem>
            <SelectItem value="DM">DM (Defensive Mid)</SelectItem>
            <SelectItem value="CM">CM (Central Mid)</SelectItem>
            <SelectItem value="AM">AM (Attacking Mid)</SelectItem>
            <SelectItem value="LW">LW (Left Wing)</SelectItem>
            <SelectItem value="RW">RW (Right Wing)</SelectItem>
            <SelectItem value="ST">ST (Striker)</SelectItem>
            <SelectItem value="CF">CF (Centre Forward)</SelectItem>
          </SelectContent>
        </Select>

        {/* Nationality Filter */}
        <Select value={country} onValueChange={(val) => onCountryChange(val || 'ALL')}>
          <SelectTrigger className="w-[130px] h-9 bg-[#171B1F] border-white/8 text-xs text-[#F3F4F6] rounded-lg">
            <SelectValue placeholder="Country" />
          </SelectTrigger>
          <SelectContent className="bg-[#111417] border-white/8 text-xs text-[#F3F4F6]">
            <SelectItem value="ALL">All Countries</SelectItem>
            {countries.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Contract Status Filter */}
        <Select value={contractStatus} onValueChange={(val) => onContractStatusChange(val || 'ALL')}>
          <SelectTrigger className="w-[135px] h-9 bg-[#171B1F] border-white/8 text-xs text-[#F3F4F6] rounded-lg">
            <SelectValue placeholder="Contract" />
          </SelectTrigger>
          <SelectContent className="bg-[#111417] border-white/8 text-xs text-[#F3F4F6]">
            <SelectItem value="ALL">All Contracts</SelectItem>
            <SelectItem value="Active">Active Contract</SelectItem>
            <SelectItem value="Expiring">Expiring (&lt;12m)</SelectItem>
            <SelectItem value="Free Agent">Free Agent</SelectItem>
          </SelectContent>
        </Select>

        {/* Market Status Filter */}
        <Select value={marketStatus} onValueChange={(val) => onMarketStatusChange(val || 'ALL')}>
          <SelectTrigger className="w-[130px] h-9 bg-[#171B1F] border-white/8 text-xs text-[#F3F4F6] rounded-lg">
            <SelectValue placeholder="Market Status" />
          </SelectTrigger>
          <SelectContent className="bg-[#111417] border-white/8 text-xs text-[#F3F4F6]">
            <SelectItem value="ALL">All Statuses</SelectItem>
            <SelectItem value="Rising">Rising</SelectItem>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Available">Available</SelectItem>
            <SelectItem value="Monitoring">Monitoring</SelectItem>
          </SelectContent>
        </Select>

        {/* Reset Filters CTA */}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            onClick={onReset}
            className="h-9 px-2 text-xs text-muted-foreground hover:text-rose-400 hover:bg-rose-500/10"
          >
            <X className="w-3.5 h-3.5 mr-1" />
            Reset
          </Button>
        )}
      </div>
    </div>
  );
};
