'use client';

import React, { useState } from 'react';
import { Plus, UserPlus, Shield, Globe, Calendar, Tag } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { Player, Position, MarketStatus, ContractStatus } from '@/lib/types';

interface AddPlayerDialogProps {
  onAddPlayer: (player: Player) => void;
}

export const AddPlayerDialog: React.FC<AddPlayerDialogProps> = ({ onAddPlayer }) => {
  const [open, setOpen] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState<number>(20);
  const [nationality, setNationality] = useState('Nigeria');
  const [position, setPosition] = useState<Position>('CB');
  const [currentClub, setCurrentClub] = useState('FC Nordsjælland');
  const [contractExpiry, setContractExpiry] = useState('2028-06-30');
  const [marketStatus, setMarketStatus] = useState<MarketStatus>('Rising');
  const [marketValue, setMarketValue] = useState<number>(2500000);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName) return;

    const newPlayer: Player = {
      id: `p-${Date.now()}`,
      firstName,
      lastName,
      dateOfBirth: `${2026 - age}-01-01`,
      age,
      nationality,
      position,
      currentClub,
      currentClubId: 'c-001',
      contractExpiry,
      contractStatus: 'Active',
      marketStatus,
      marketValue,
      region: 'West Africa',
    };

    onAddPlayer(newPlayer);
    setOpen(false);

    // Reset form
    setFirstName('');
    setLastName('');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="bg-[#B8F35A] text-[#0B0D0F] hover:bg-[#a3db4a] font-semibold text-xs h-9 px-4 rounded-lg flex items-center gap-1.5 shrink-0">
        <Plus className="w-4 h-4" />
        Add Player
      </DialogTrigger>

      <DialogContent className="bg-[#111417] border border-white/10 text-[#F3F4F6] sm:max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base font-bold text-[#F3F4F6]">
            <UserPlus className="w-4 h-4 text-[#B8F35A]" />
            Add Player to Portfolio
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                First Name
              </label>
              <Input
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="e.g. Victor"
                className="bg-[#171B1F] border-white/10 text-xs text-[#F3F4F6] h-9 mt-1"
              />
            </div>
            <div>
              <label className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                Last Name
              </label>
              <Input
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="e.g. Osimhen"
                className="bg-[#171B1F] border-white/10 text-xs text-[#F3F4F6] h-9 mt-1"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                Age
              </label>
              <Input
                type="number"
                value={age}
                onChange={(e) => setAge(parseInt(e.target.value) || 20)}
                className="bg-[#171B1F] border-white/10 text-xs font-mono-data text-[#F3F4F6] h-9 mt-1"
              />
            </div>
            <div>
              <label className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                Position
              </label>
              <Select value={position} onValueChange={(val) => setPosition(val as Position)}>
                <SelectTrigger className="bg-[#171B1F] border-white/10 text-xs text-[#F3F4F6] h-9 mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#111417] border-white/10 text-xs text-[#F3F4F6]">
                  <SelectItem value="CB">CB</SelectItem>
                  <SelectItem value="LB">LB</SelectItem>
                  <SelectItem value="RB">RB</SelectItem>
                  <SelectItem value="DM">DM</SelectItem>
                  <SelectItem value="CM">CM</SelectItem>
                  <SelectItem value="AM">AM</SelectItem>
                  <SelectItem value="LW">LW</SelectItem>
                  <SelectItem value="RW">RW</SelectItem>
                  <SelectItem value="ST">ST</SelectItem>
                  <SelectItem value="GK">GK</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                Nationality
              </label>
              <Input
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
                placeholder="e.g. Nigeria"
                className="bg-[#171B1F] border-white/10 text-xs text-[#F3F4F6] h-9 mt-1"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                Current Club
              </label>
              <Input
                value={currentClub}
                onChange={(e) => setCurrentClub(e.target.value)}
                className="bg-[#171B1F] border-white/10 text-xs text-[#F3F4F6] h-9 mt-1"
              />
            </div>
            <div>
              <label className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                Market Value (€)
              </label>
              <Input
                type="number"
                step="100000"
                value={marketValue}
                onChange={(e) => setMarketValue(parseInt(e.target.value) || 2000000)}
                className="bg-[#171B1F] border-white/10 text-xs font-mono-data text-[#F3F4F6] h-9 mt-1"
              />
            </div>
          </div>

          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="border-white/10 text-xs h-9"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[#B8F35A] text-[#0B0D0F] hover:bg-[#a3db4a] font-semibold text-xs h-9 px-4"
            >
              Add to Agency Portfolio
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
