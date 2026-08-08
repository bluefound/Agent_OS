'use client';

import React from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { Settings, Shield, Key, Database, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function SettingsPage() {
  return (
    <AppShell>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#F3F4F6]">
            Agency OS Settings
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Configure integration endpoints for Supabase, Postgres, and OpenAI API keys.
          </p>
        </div>

        <div className="space-y-6">
          {/* OpenAI Integration Card */}
          <div className="bg-[#111417] border border-white/8 rounded-xl p-6 space-y-4">
            <div className="flex items-center gap-3">
              <Bot className="w-5 h-5 text-[#B8F35A]" />
              <div>
                <h3 className="text-sm font-bold text-[#F3F4F6]">AI Layer — OpenAI API Integration</h3>
                <p className="text-xs text-muted-foreground">Swap local mock agent with real OpenAI function calling model</p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                OpenAI API Key
              </label>
              <Input
                type="password"
                placeholder="sk-proj-..."
                defaultValue="sk-proj-mock-agentos-key-2026"
                className="bg-[#171B1F] border-white/10 text-xs font-mono-data text-[#F3F4F6] h-9"
              />
            </div>
          </div>

          {/* Supabase Database Integration Card */}
          <div className="bg-[#111417] border border-white/8 rounded-xl p-6 space-y-4">
            <div className="flex items-center gap-3">
              <Database className="w-5 h-5 text-[#B8F35A]" />
              <div>
                <h3 className="text-sm font-bold text-[#F3F4F6]">Database Layer — Supabase / Postgres</h3>
                <p className="text-xs text-muted-foreground">Swap local mock arrays with live PostgreSQL data provider</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                  Supabase Project URL
                </label>
                <Input
                  placeholder="https://xyz.supabase.co"
                  defaultValue="https://agentos.supabase.co"
                  className="bg-[#171B1F] border-white/10 text-xs font-mono-data text-[#F3F4F6] h-9"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                  Anon / Public Key
                </label>
                <Input
                  type="password"
                  defaultValue="eyJhY3RpdmVfYWdlbmN5X29zX2tleSJ9"
                  className="bg-[#171B1F] border-white/10 text-xs font-mono-data text-[#F3F4F6] h-9"
                />
              </div>
            </div>
          </div>

          <Button className="bg-[#B8F35A] text-[#0B0D0F] hover:bg-[#a3db4a] font-semibold text-xs h-9 px-4">
            Save Settings & Test Connection
          </Button>
        </div>
      </div>
    </AppShell>
  );
}
