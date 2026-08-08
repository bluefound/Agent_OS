'use client';

import React from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { FileText, Download, Upload, Shield, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { documents } from '@/lib/data/documents';

export default function DocumentsPage() {
  return (
    <AppShell>
      <div className="space-y-6 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#F3F4F6]">
              Agency Documents & Vault
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Secure document vault for player contracts, passports, medicals, and visa approvals.
            </p>
          </div>

          <Button className="bg-[#B8F35A] text-[#0B0D0F] hover:bg-[#a3db4a] font-semibold text-xs h-9 px-4 rounded-lg flex items-center gap-1.5 shrink-0">
            <Upload className="w-4 h-4" />
            Upload Document
          </Button>
        </div>

        <div className="bg-[#111417] border border-white/8 rounded-xl p-4 flex items-center gap-3">
          <Search className="w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search document title, player, or status..."
            className="bg-[#171B1F] border-none text-xs text-[#F3F4F6] placeholder:text-muted-foreground h-9"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {documents.map((doc) => (
            <div key={doc.id} className="bg-[#111417] border border-white/8 rounded-xl p-5 flex items-center justify-between hover:border-white/15 transition-colors">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#171B1F] border border-white/10 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-[#B8F35A]" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#F3F4F6]">{doc.title}</h4>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground font-mono-data mt-1">
                    <span>{doc.type}</span>
                    <span>·</span>
                    <span>{doc.fileSize}</span>
                    <span>·</span>
                    <span>Uploaded {doc.uploadedAt}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="font-mono-data text-xs px-2 py-0.5 rounded bg-white/5 border border-white/10 text-emerald-400">
                  {doc.status}
                </span>
                <Button size="sm" variant="ghost" className="h-8 px-2 text-muted-foreground hover:text-[#B8F35A]">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
