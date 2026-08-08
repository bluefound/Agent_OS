'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MatchDial } from '@/components/ui/match-dial';
import { FileText, Download, CheckCircle2, Shield, Calendar, Award } from 'lucide-react';
import type { Player, TransferOpportunity } from '@/lib/types';

interface TransferBriefModalProps {
  player: Player;
  opportunities: TransferOpportunity[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const TransferBriefModal: React.FC<TransferBriefModalProps> = ({
  player,
  opportunities,
  open,
  onOpenChange,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#111417] border border-white/10 text-[#F3F4F6] sm:max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl p-6">
        <DialogHeader className="border-b border-white/8 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#B8F35A]" />
              <DialogTitle className="text-base font-bold text-[#F3F4F6]">
                CONFIDENTIAL TRANSFER BRIEF & DOSSIER
              </DialogTitle>
            </div>
            <span className="font-mono-data text-[10px] px-2 py-0.5 rounded bg-white/5 text-muted-foreground border border-white/10">
              AGENTOS INTEL v2.4
            </span>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-2">
          {/* Executive Overview */}
          <div className="bg-[#171B1F] border border-white/8 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-semibold tracking-wider text-[#B8F35A] uppercase">
                Target Prospect
              </span>
              <h2 className="text-xl font-bold text-[#F3F4F6]">
                {player.firstName} {player.lastName}
              </h2>
              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground font-mono-data mt-1">
                <span>{player.position}</span>
                <span>·</span>
                <span>{player.currentClub}</span>
                <span>·</span>
                <span>Age {player.age}</span>
                <span>·</span>
                <span>{player.nationality}</span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                Estimated Valuation
              </span>
              <div className="font-mono-data text-2xl font-bold text-[#B8F35A]">
                €{(player.marketValue / 1000000).toFixed(1)}M
              </div>
              <span className="text-[10px] font-mono-data text-muted-foreground">
                Contract Expiry: {player.contractExpiry}
              </span>
            </div>
          </div>

          {/* Performance & Scouting Highlights */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Executive Scouting Summary
            </h3>
            <p className="text-xs leading-relaxed text-[#F3F4F6] bg-[#171B1F] border border-white/8 rounded-xl p-4">
              {player.firstName} {player.lastName} is a highly promising {player.age}-year-old {player.position} currently playing for {player.currentClub}. Characterised by exceptional defensive reading, high duel success rate, and strong athletic recovery. Fits modern high-intensity press systems in competitive Scandinavian and mid-tier European leagues.
            </p>
          </div>

          {/* Ranked Club Opportunities */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Ranked Club Destinations ({opportunities.length})
            </h3>

            <div className="space-y-3">
              {opportunities.slice(0, 4).map((opp, idx) => (
                <div key={opp.id} className="bg-[#171B1F] border border-white/8 rounded-xl p-4 flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono-data text-xs font-bold text-[#B8F35A]">#{idx + 1}</span>
                      <h4 className="text-sm font-bold text-[#F3F4F6]">{opp.club.name}</h4>
                      <span className="text-xs text-muted-foreground">({opp.club.country})</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-3 text-xs text-muted-foreground">
                      {opp.factors.filter(f => f.showAsReason).map((f, i) => (
                        <div key={i} className="flex items-center gap-1 text-[11px] text-[#F3F4F6]">
                          <CheckCircle2 className="w-3 h-3 text-[#B8F35A]" />
                          <span>{f.description}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <MatchDial score={opp.matchScore} size="sm" />
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Next Steps */}
          <div className="space-y-2 border-t border-white/8 pt-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Recommended Agency Operations
            </h3>
            <ul className="space-y-1 text-xs text-muted-foreground font-mono-data">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B8F35A]" />
                1. Initiate direct contact with sporting directors at top matching clubs
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B8F35A]" />
                2. Prepare video highlight package focusing on defensive transition
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B8F35A]" />
                3. Align commercial endorsement proposals with regional brand leads
              </li>
            </ul>
          </div>

          {/* Modal Footer Actions */}
          <div className="flex items-center justify-between border-t border-white/8 pt-4">
            <span className="text-[10px] font-mono-data text-muted-foreground">
              Prepared for Gabriel · Agency Managing Director
            </span>

            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)} className="text-xs h-9 border-white/10">
                Close
              </Button>
              <Button className="bg-[#B8F35A] text-[#0B0D0F] hover:bg-[#a3db4a] font-semibold text-xs h-9 px-4 flex items-center gap-1.5">
                <Download className="w-3.5 h-3.5" />
                Download PDF Dossier
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
