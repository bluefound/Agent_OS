'use client';

import React, { useState } from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { MatchDial } from '@/components/ui/match-dial';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bot, Sparkles, Send, CheckCircle2, ArrowRight, FileText, Download } from 'lucide-react';
import type { AgentMessage, AgentToolCall } from '@/lib/types';

export default function AIAgentPage() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [toolStep, setToolStep] = useState<string | null>(null);

  const [messages, setMessages] = useState<AgentMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Welcome to Agent Intelligence. Ask questions about your players, clubs, and transfer opportunities.',
      timestamp: new Date().toISOString(),
      sources: ['Player Database', 'Scouting Intelligence'],
      recommendations: [
        'Run transfer opportunity scans for expiring contract players',
        'Search Scandinavian recruitment networks for African defenders',
      ],
    },
  ]);

  const promptCards = [
    'Find clubs in Scandinavia for our Nigerian U23 midfielder',
    'Which players have contracts expiring within 12 months?',
    'Show me our strongest commercial opportunities',
    'Prepare a transfer brief for Samuel Adeyemi',
    'Which clubs have recently signed African defenders?',
  ];

  const handleSend = async (textToSend?: string) => {
    const q = textToSend || query;
    if (!q.trim()) return;

    const userMsg: AgentMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: q,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMsg]);
    setQuery('');
    setLoading(true);

    try {
      setToolStep('Searching player database...');
      await new Promise(r => setTimeout(r, 600));

      setToolStep('Scanning club recruitment network...');
      await new Promise(r => setTimeout(r, 600));

      setToolStep('Computing match fit scores...');
      await new Promise(r => setTimeout(r, 600));

      const res = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q }),
      });

      const data = await res.json();
      if (data.message) {
        setMessages(prev => [...prev, data.message]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setToolStep(null);
    }
  };

  return (
    <AppShell>
      <div className="space-y-6 max-w-5xl mx-auto">
        {/* Title & Header */}
        <div>
          <div className="flex items-center gap-2 text-[#B8F35A]">
            <Bot className="w-5 h-5" />
            <h1 className="text-2xl font-bold tracking-tight text-[#F3F4F6]">
              Agent Intelligence
            </h1>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Ask questions about your players, clubs, and transfer opportunities with transparent tool execution.
          </p>
        </div>

        {/* Suggested Prompt Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {promptCards.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSend(prompt)}
              className="bg-[#111417] border border-white/8 hover:border-[#B8F35A]/50 rounded-xl p-3 text-left transition-colors group"
            >
              <div className="flex items-start gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#B8F35A] shrink-0 mt-0.5" />
                <span className="text-xs font-medium text-[#F3F4F6] group-hover:text-[#B8F35A] transition-colors leading-snug">
                  {prompt}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Query Input */}
        <div className="bg-[#111417] border border-white/8 rounded-xl p-2 flex items-center gap-2">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask anything about your portfolio, transfer targets, or commercial deals..."
            className="bg-[#171B1F] border-none text-xs text-[#F3F4F6] placeholder:text-muted-foreground h-10 rounded-lg focus-visible:ring-[#B8F35A]"
          />
          <Button
            onClick={() => handleSend()}
            disabled={loading}
            className="bg-[#B8F35A] text-[#0B0D0F] hover:bg-[#a3db4a] font-semibold text-xs h-10 px-4 rounded-lg shrink-0"
          >
            <Send className="w-3.5 h-3.5 mr-1" />
            Query Agent
          </Button>
        </div>

        {/* Active Tool Step Indicator */}
        {loading && toolStep && (
          <div className="bg-[#171B1F] border border-[#B8F35A]/30 rounded-xl p-4 flex items-center gap-3 animate-pulse">
            <Sparkles className="w-4 h-4 text-[#B8F35A] animate-spin" />
            <span className="font-mono-data text-xs font-medium text-[#B8F35A]">{toolStep}</span>
          </div>
        )}

        {/* Message Thread */}
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`rounded-2xl p-6 border ${
                msg.role === 'user'
                  ? 'bg-[#171B1F] border-white/10 ml-12'
                  : 'bg-[#111417] border-white/8 mr-6'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono-data text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  {msg.role === 'user' ? 'GABRIEL (ADMIN)' : 'AGENTOS INTELLIGENCE'}
                </span>
              </div>

              <p className="text-xs leading-relaxed text-[#F3F4F6]">{msg.content}</p>

              {/* Tool Execution Steps */}
              {msg.toolCalls && msg.toolCalls.length > 0 && (
                <div className="mt-4 pt-3 border-t border-white/5 space-y-1.5">
                  <span className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                    Executed Tool Actions:
                  </span>
                  {msg.toolCalls.map((tc, idx) => (
                    <div key={idx} className="flex items-center gap-2 font-mono-data text-[11px] text-muted-foreground">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#B8F35A]" />
                      <span>{tc.label}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Recommendations */}
              {msg.recommendations && (
                <div className="mt-4 pt-3 border-t border-white/5 space-y-1">
                  <span className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                    Recommended Actions:
                  </span>
                  <ul className="space-y-1">
                    {msg.recommendations.map((rec, i) => (
                      <li key={i} className="text-xs text-muted-foreground flex items-center gap-1.5">
                        <ArrowRight className="w-3 h-3 text-[#B8F35A]" />
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Transfer Brief Action Box */}
              {msg.actions && (
                <div className="mt-4 p-4 rounded-xl bg-[#171B1F] border border-[#B8F35A]/30 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-[#B8F35A]" />
                    <div>
                      <h4 className="text-xs font-bold text-[#F3F4F6]">TRANSFER BRIEF GENERATED</h4>
                      <p className="text-[10px] text-muted-foreground font-mono-data">5 matches ranked · Statistics compiled</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" className="bg-[#B8F35A] text-[#0B0D0F] font-semibold text-xs h-7">
                      Open Brief
                    </Button>
                    <Button size="sm" variant="outline" className="border-white/10 text-xs h-7">
                      <Download className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
