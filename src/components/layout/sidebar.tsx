'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Users,
  GitPullRequest,
  Brain,
  Bot,
  FileText,
  Contact,
  Activity,
  Settings,
  Shield,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const workspaceNav = [
  { name: 'Overview', href: '/players', icon: Layers }, // Overview maps to main portfolio
  { name: 'Players', href: '/players', icon: Users },
  { name: 'Opportunities', href: '/opportunities', icon: GitPullRequest },
  { name: 'Intelligence', href: '/ai-agent', icon: Brain },
  { name: 'AI Agent', href: '/ai-agent', icon: Bot, badge: 'AI' },
];

const operationsNav = [
  { name: 'Documents', href: '/documents', icon: FileText },
  { name: 'Contacts', href: '/contacts', icon: Contact },
  { name: 'Activity', href: '/activity', icon: Activity },
];

export const Sidebar: React.FC = () => {
  const pathname = usePathname();

  const isNavActive = (href: string, name: string) => {
    if (name === 'Overview') return pathname === '/';
    if (name === 'Players') return pathname === '/players' || pathname.startsWith('/players/');
    return pathname === href;
  };

  return (
    <aside className="w-60 bg-[#111417] border-r border-white/8 flex flex-col justify-between shrink-0 h-screen sticky top-0 z-30 select-none">
      {/* Brand Header */}
      <div>
        <div className="h-14 px-5 flex items-center gap-3 border-b border-white/8">
          <div className="w-7 h-7 rounded-lg bg-[#B8F35A] text-[#0B0D0F] flex items-center justify-center font-extrabold text-sm tracking-tighter">
            OS
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold tracking-widest uppercase text-[#F3F4F6]">
              AGENT<span className="text-[#B8F35A]">OS</span>
            </span>
            <span className="text-[9px] font-mono-data tracking-wider text-muted-foreground uppercase">
              Player Intelligence v2.4
            </span>
          </div>
        </div>

        {/* Navigation Section: Workspace */}
        <div className="px-3 py-4">
          <div className="px-3 mb-2 text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
            Workspace
          </div>
          <nav className="space-y-0.5">
            {workspaceNav.map((item) => {
              const active = isNavActive(item.href, item.name);
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    active
                      ? 'bg-white/5 text-[#B8F35A] font-semibold border-l-2 border-[#B8F35A]'
                      : 'text-muted-foreground hover:text-[#F3F4F6] hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 stroke-[1.75] ${active ? 'text-[#B8F35A]' : 'text-muted-foreground'}`} />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-mono-data font-bold bg-[#B8F35A]/10 text-[#B8F35A] border border-[#B8F35A]/20">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Navigation Section: Operations */}
        <div className="px-3 py-2">
          <div className="px-3 mb-2 text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
            Operations
          </div>
          <nav className="space-y-0.5">
            {operationsNav.map((item) => {
              const active = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    active
                      ? 'bg-white/5 text-[#B8F35A] font-semibold border-l-2 border-[#B8F35A]'
                      : 'text-muted-foreground hover:text-[#F3F4F6] hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 stroke-[1.75] ${active ? 'text-[#B8F35A]' : 'text-muted-foreground'}`} />
                    <span>{item.name}</span>
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Footer & User Profile */}
      <div className="p-3 border-t border-white/8 space-y-2">
        <Link
          href="/settings"
          className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-muted-foreground hover:text-[#F3F4F6] hover:bg-white/5 transition-colors ${
            pathname === '/settings' ? 'bg-white/5 text-[#B8F35A]' : ''
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </Link>

        {/* User Card */}
        <div className="p-2.5 rounded-xl bg-[#171B1F] border border-white/8 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Avatar className="w-8 h-8 border border-white/10">
              <AvatarFallback className="bg-white/10 text-xs font-bold text-[#B8F35A]">
                GA
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-[#F3F4F6]">Gabriel</span>
              <span className="text-[10px] font-mono-data text-muted-foreground uppercase">Managing Director</span>
            </div>
          </div>
          <span className="w-2 h-2 rounded-full bg-[#B8F35A]" title="System Active" />
        </div>
      </div>
    </aside>
  );
};
