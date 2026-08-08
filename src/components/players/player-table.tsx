'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown, ChevronUp, ArrowRight, ExternalLink } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Player } from '@/lib/types';

interface PlayerTableProps {
  players: Player[];
}

type SortField = 'name' | 'age' | 'position' | 'club' | 'contract' | 'status' | 'country';

export const PlayerTable: React.FC<PlayerTableProps> = ({ players }) => {
  const router = useRouter();
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortAsc, setSortAsc] = useState(true);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const sortedPlayers = [...players].sort((a, b) => {
    let comparison = 0;
    switch (sortField) {
      case 'name':
        comparison = `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`);
        break;
      case 'age':
        comparison = a.age - b.age;
        break;
      case 'position':
        comparison = a.position.localeCompare(b.position);
        break;
      case 'club':
        comparison = a.currentClub.localeCompare(b.currentClub);
        break;
      case 'contract':
        comparison = a.contractExpiry.localeCompare(b.contractExpiry);
        break;
      case 'status':
        comparison = a.marketStatus.localeCompare(b.marketStatus);
        break;
      case 'country':
        comparison = a.nationality.localeCompare(b.nationality);
        break;
    }
    return sortAsc ? comparison : -comparison;
  });

  const getMarketStatusBadge = (status: Player['marketStatus']) => {
    switch (status) {
      case 'Rising':
        return <Badge className="bg-[#B8F35A]/10 text-[#B8F35A] border border-[#B8F35A]/30 text-[10px]">Rising</Badge>;
      case 'Available':
        return <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px]">Available</Badge>;
      case 'Active':
        return <Badge className="bg-sky-500/10 text-sky-400 border border-sky-500/30 text-[10px]">Active</Badge>;
      case 'Monitoring':
        return <Badge className="bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[10px]">Monitoring</Badge>;
      default:
        return <Badge variant="outline" className="text-[10px]">Inactive</Badge>;
    }
  };

  const getContractStatusBadge = (status: Player['contractStatus'], expiry: string) => {
    const year = expiry.split('-')[0];
    if (status === 'Expiring') {
      return (
        <span className="inline-flex items-center gap-1.5 font-mono-data text-xs text-rose-400 font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
          {year} (Expiring)
        </span>
      );
    }
    return <span className="font-mono-data text-xs text-[#F3F4F6]">{year}</span>;
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortAsc ? <ChevronUp className="w-3 h-3 inline ml-1 text-[#B8F35A]" /> : <ChevronDown className="w-3 h-3 inline ml-1 text-[#B8F35A]" />;
  };

  return (
    <div className="bg-[#111417] border border-white/8 rounded-xl overflow-hidden">
      <Table>
        <TableHeader className="bg-[#171B1F] border-b border-white/8">
          <TableRow className="hover:bg-transparent border-white/8">
            <TableHead onClick={() => handleSort('name')} className="cursor-pointer text-[10px] font-semibold tracking-wider text-muted-foreground uppercase py-3">
              Player <SortIcon field="name" />
            </TableHead>
            <TableHead onClick={() => handleSort('age')} className="cursor-pointer text-[10px] font-semibold tracking-wider text-muted-foreground uppercase py-3">
              Age <SortIcon field="age" />
            </TableHead>
            <TableHead onClick={() => handleSort('position')} className="cursor-pointer text-[10px] font-semibold tracking-wider text-muted-foreground uppercase py-3">
              Position <SortIcon field="position" />
            </TableHead>
            <TableHead onClick={() => handleSort('club')} className="cursor-pointer text-[10px] font-semibold tracking-wider text-muted-foreground uppercase py-3">
              Current Club <SortIcon field="club" />
            </TableHead>
            <TableHead onClick={() => handleSort('contract')} className="cursor-pointer text-[10px] font-semibold tracking-wider text-muted-foreground uppercase py-3">
              Contract Expiry <SortIcon field="contract" />
            </TableHead>
            <TableHead onClick={() => handleSort('status')} className="cursor-pointer text-[10px] font-semibold tracking-wider text-muted-foreground uppercase py-3">
              Market Status <SortIcon field="status" />
            </TableHead>
            <TableHead onClick={() => handleSort('country')} className="cursor-pointer text-[10px] font-semibold tracking-wider text-muted-foreground uppercase py-3">
              Country <SortIcon field="country" />
            </TableHead>
            <TableHead className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase py-3 text-right">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-white/5">
          {sortedPlayers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="h-32 text-center text-xs text-muted-foreground">
                No players match the selected filters.
              </TableCell>
            </TableRow>
          ) : (
            sortedPlayers.map((player) => (
              <TableRow
                key={player.id}
                onClick={() => router.push(`/players/${player.id}`)}
                className="cursor-pointer hover:bg-white/5 transition-colors border-white/5 group"
              >
                {/* Player Name */}
                <TableCell className="py-3 font-semibold text-xs text-[#F3F4F6] flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-mono-data text-xs font-bold text-[#B8F35A]">
                    {player.firstName[0]}{player.lastName[0]}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#F3F4F6] group-hover:text-[#B8F35A] transition-colors">
                      {player.firstName} {player.lastName}
                    </div>
                    <div className="text-[10px] text-muted-foreground font-mono-data">
                      €{(player.marketValue / 1000000).toFixed(1)}M
                    </div>
                  </div>
                </TableCell>

                {/* Age */}
                <TableCell className="py-3 font-mono-data text-xs text-[#F3F4F6]">
                  {player.age}
                </TableCell>

                {/* Position */}
                <TableCell className="py-3">
                  <span className="font-mono-data text-xs px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[#F3F4F6]">
                    {player.position}
                    {player.secondaryPosition && (
                      <span className="text-muted-foreground text-[10px] ml-1">({player.secondaryPosition})</span>
                    )}
                  </span>
                </TableCell>

                {/* Current Club */}
                <TableCell className="py-3 text-xs text-[#F3F4F6] font-medium">
                  {player.currentClub}
                </TableCell>

                {/* Contract Expiry */}
                <TableCell className="py-3">
                  {getContractStatusBadge(player.contractStatus, player.contractExpiry)}
                </TableCell>

                {/* Market Status */}
                <TableCell className="py-3">
                  {getMarketStatusBadge(player.marketStatus)}
                </TableCell>

                {/* Country */}
                <TableCell className="py-3 text-xs text-muted-foreground">
                  {player.nationality}
                </TableCell>

                {/* Actions */}
                <TableCell className="py-3 text-right">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/players/${player.id}`);
                    }}
                    className="h-7 px-2 text-[11px] text-muted-foreground hover:text-[#B8F35A] hover:bg-white/5"
                  >
                    View Intel
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
