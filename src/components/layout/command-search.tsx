'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, User, Shield, Sparkles } from 'lucide-react';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { players } from '@/lib/data/players';
import { clubs } from '@/lib/data/clubs';

interface CommandSearchProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CommandSearch: React.FC<CommandSearchProps> = ({ open, onOpenChange }) => {
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [open, onOpenChange]);

  const runCommand = (command: () => void) => {
    onOpenChange(false);
    command();
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Type a player name, club, or query (⌘K)..." />
      <CommandList className="bg-[#111417] text-[#F3F4F6] border-t border-white/8">
        <CommandEmpty className="py-6 text-center text-xs text-muted-foreground">
          No results found.
        </CommandEmpty>
        <CommandGroup heading="Players">
          {players.map((player) => (
            <CommandItem
              key={player.id}
              value={`${player.firstName} ${player.lastName} ${player.currentClub} ${player.position}`}
              onSelect={() => runCommand(() => router.push(`/players/${player.id}`))}
              className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-white/5 aria-selected:bg-white/5 rounded-md"
            >
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">{player.firstName} {player.lastName}</span>
                <span className="text-xs text-muted-foreground">· {player.currentClub}</span>
              </div>
              <span className="font-mono-data text-xs px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-muted-foreground">
                {player.position}
              </span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Clubs">
          {clubs.slice(0, 6).map((club) => (
            <CommandItem
              key={club.id}
              value={`${club.name} ${club.country} ${club.league}`}
              onSelect={() => runCommand(() => router.push(`/opportunities?club=${club.id}`))}
              className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-white/5 aria-selected:bg-white/5 rounded-md"
            >
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">{club.name}</span>
                <span className="text-xs text-muted-foreground">· {club.league}</span>
              </div>
              <span className="text-xs text-muted-foreground">{club.country}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="AI Intelligence Quick Prompts">
          <CommandItem
            onSelect={() => runCommand(() => router.push('/ai-agent?prompt=Find+clubs+in+Scandinavia+for+our+Nigerian+U23+midfielder'))}
            className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-white/5 aria-selected:bg-white/5 rounded-md text-xs text-[#B8F35A]"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#B8F35A]" />
            <span>Find clubs in Scandinavia for our Nigerian U23 midfielder</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push('/ai-agent?prompt=Which+players+have+contracts+expiring+within+12+months'))}
            className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-white/5 aria-selected:bg-white/5 rounded-md text-xs text-[#B8F35A]"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#B8F35A]" />
            <span>Which players have contracts expiring within 12 months?</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};
