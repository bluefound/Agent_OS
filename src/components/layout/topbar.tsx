'use client';

import React, { useState } from 'react';
import { Search, Bell, Sparkles, ChevronDown, User, ShieldCheck, LogOut } from 'lucide-react';
import { CommandSearch } from './command-search';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

export const Topbar: React.FC = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Contract Alert', desc: 'Daniel Mensah contract expires in 10 months', time: '2h ago', unread: true },
    { id: 2, title: 'Transfer Match', desc: 'FC Nordsjælland fit score updated to 92% for Adeyemi', time: '4h ago', unread: true },
    { id: 3, title: 'Commercial Lead', desc: 'Nike proposal received for Kwame Asante', time: '1d ago', unread: false },
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <>
      <header className="h-14 bg-[#111417] border-b border-white/8 px-6 flex items-center justify-between sticky top-0 z-20">
        {/* Left: Quick Global Search Trigger */}
        <button
          onClick={() => setSearchOpen(true)}
          className="flex items-center gap-3 px-3 py-1.5 rounded-lg bg-[#171B1F] border border-white/8 text-xs text-muted-foreground hover:border-white/20 transition-colors w-72 justify-between"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-muted-foreground" />
            <span>Search players, clubs, intel...</span>
          </div>
          <kbd className="font-mono-data text-[10px] bg-white/5 border border-white/10 px-1.5 py-0.5 rounded text-muted-foreground">
            ⌘K
          </kbd>
        </button>

        {/* Right: Notifications & User Menu */}
        <div className="flex items-center gap-4">
          {/* Notifications Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="relative p-2 rounded-lg bg-[#171B1F] border border-white/8 text-muted-foreground hover:text-[#F3F4F6] hover:border-white/20 transition-colors">
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#B8F35A] text-[#0B0D0F] font-mono-data text-[9px] font-bold flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 bg-[#111417] border border-white/8 text-[#F3F4F6]">
              <DropdownMenuLabel className="flex items-center justify-between font-mono-data text-xs uppercase tracking-wider text-muted-foreground">
                <span>Notifications</span>
                {unreadCount > 0 && (
                  <Badge variant="outline" className="border-[#B8F35A]/30 text-[#B8F35A] text-[9px]">
                    {unreadCount} New
                  </Badge>
                )}
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/8" />
              <div className="space-y-1 p-1">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-2.5 rounded-lg text-xs transition-colors ${
                      n.unread ? 'bg-white/5 border border-white/5' : 'opacity-70'
                    }`}
                  >
                    <div className="flex items-center justify-between font-semibold">
                      <span>{n.title}</span>
                      <span className="font-mono-data text-[10px] text-muted-foreground">{n.time}</span>
                    </div>
                    <p className="mt-0.5 text-muted-foreground text-[11px] leading-tight">{n.desc}</p>
                  </div>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Agency User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2.5 p-1 pr-2 rounded-lg hover:bg-white/5 transition-colors">
              <Avatar className="w-7 h-7 border border-white/10">
                <AvatarFallback className="bg-[#B8F35A]/10 text-[#B8F35A] text-xs font-bold">
                  G
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col text-left">
                <span className="text-xs font-semibold text-[#F3F4F6]">Gabriel</span>
                <span className="text-[9px] font-mono-data text-muted-foreground">AGENCY ADMIN</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-[#111417] border border-white/8 text-[#F3F4F6]">
              <DropdownMenuLabel className="text-xs text-muted-foreground">My Account</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/8" />
              <DropdownMenuItem className="text-xs cursor-pointer hover:bg-white/5">
                <User className="w-3.5 h-3.5 mr-2" /> Profile Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="text-xs cursor-pointer hover:bg-white/5">
                <ShieldCheck className="w-3.5 h-3.5 mr-2" /> Agency Security
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-white/8" />
              <DropdownMenuItem className="text-xs text-rose-400 cursor-pointer hover:bg-white/5">
                <LogOut className="w-3.5 h-3.5 mr-2" /> Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Command Search Modal */}
      <CommandSearch open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
};
