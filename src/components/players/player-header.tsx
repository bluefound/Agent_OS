'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Sparkles, Edit, Shield, Calendar, Globe, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Player } from '@/lib/types';

interface PlayerHeaderProps {
  player: Player;
}

export const PlayerHeader: React.FC<PlayerHeaderProps> = ({ player }) => {
  const router = useRouter();

  return (
    <div className="bg-[#111417] border border-white/8 rounded-2xl p-6 relative overflow-hidden">
      {/* Back button */}
      <button
        onClick={() => router.push('/players')}
        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-[#F3F4F6] transition-colors mb-4"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to Player Portfolio
      </button>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left: Player Avatar & Details */}
        <div className="flex items-start md:items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-[#171B1F] border border-white/10 flex items-center justify-center font-mono-data text-2xl font-bold text-[#B8F35A] shrink-0">
            {player.firstName[0]}{player.lastName[0]}
          </div>

          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-bold text-[#F3F4F6]">
                {player.firstName} {player.lastName}
              </h1>
              <span className="font-mono-data text-xs px-2 py-0.5 rounded bg-[#B8F35A]/10 border border-[#B8F35A]/30 text-[#B8F35A] font-semibold">
                {player.position}
                {player.secondaryPosition && ` / ${player.secondaryPosition}`}
              </span>
              <Badge variant="outline" className="text-[10px] border-white/10 text-muted-foreground">
                {player.marketStatus}
              </Badge>
            </div>

            {/* Quick Metadata Bar */}
            <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-muted-foreground font-mono-data pt-1">
              <div className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-[#F3F4F6] font-sans font-medium">{player.currentClub}</span>
              </div>
              <span>·</span>
              <div className="flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-muted-foreground" />
                <span>{player.nationality}</span>
              </div>
              <span>·</span>
              <div className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                <span>Age {player.age}</span>
              </div>
              <span>·</span>
              <div className="flex items-center gap-1">
                <Tag className="w-3.5 h-3.5 text-muted-foreground" />
                <span>Contract Expiry: <strong className="text-[#F3F4F6]">{player.contractExpiry}</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Primary Action CTAs */}
        <div className="flex items-center gap-3 shrink-0">
          <Link href={`/opportunities?player=${player.id}`}>
            <Button className="bg-[#B8F35A] text-[#0B0D0F] hover:bg-[#a3db4a] font-semibold text-xs h-10 px-4 rounded-lg flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Transfer Opportunity
            </Button>
          </Link>

          <Button variant="outline" className="bg-[#171B1F] border-white/10 text-xs text-[#F3F4F6] hover:bg-white/5 h-10 px-3 rounded-lg flex items-center gap-2">
            <Edit className="w-3.5 h-3.5" />
            Edit Player
          </Button>
        </div>
      </div>
    </div>
  );
};
