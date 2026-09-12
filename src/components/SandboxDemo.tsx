'use client';

import React, { useState } from 'react';
import { 
  Sparkles, 
  RotateCcw, 
  CheckCircle2, 
  Wrench, 
  Code2, 
  Terminal as TerminalIcon,
  Play
} from 'lucide-react';
import { Terminal, TerminalLine } from '@/components/ui/terminal';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

const sandboxCustomLines: TerminalLine[] = [
  {
    prompt: "supervisor@ishwa:~$ ",
    text: "parse-intent \"Build SaaS Billing Portal with Stripe & Tailwind v4\"",
    tone: "accent",
  },
  {
    text: "// [Supervisor] Decomposed intent into DAG: 3 parallel worker threads allocated",
    tone: "comment",
  },
  {
    prompt: "worker-ui@ishwa:~$ ",
    text: "generate src/components/BillingDashboard.tsx --tokens=glassmorphic",
    tone: "accent",
  },
  {
    prompt: "worker-api@ishwa:~$ ",
    text: "generate src/app/actions/checkout.ts --crypto-signatures=strict",
    tone: "accent",
  },
  {
    prompt: "critic@ishwa:~$ ",
    text: "audit --typecheck --lint",
    tone: "warn",
  },
  {
    text: "⚠️  Warning: Hydration mismatch detected at BillingDashboard.tsx:42 (Date.now() on client)",
    tone: "warn",
  },
  {
    prompt: "critic-heal@ishwa:~$ ",
    text: "patch --auto-wrap=useEffect src/components/BillingDashboard.tsx",
    tone: "accent",
  },
  {
    prompt: "critic@ishwa:~$ ",
    text: "retest: next build -> 0 errors, 0 type issues. Bundle: 38.4 kB",
    tone: "success",
  },
  {
    prompt: "deploy@ishwa:~$ ",
    text: "preview live 🚀 https://preview.ishva.ai/sandbox-402 (Zero Error Production)",
    tone: "success",
  },
];

export default function SandboxDemo() {
  const [activeTab, setActiveTab] = useState<'terminal' | 'diff' | 'preview'>('terminal');
  const [sessionKey, setSessionKey] = useState(1);

  return (
    <section id="sandbox" className="py-24 relative bg-[#070a11]">
      {/* Ambient Glow */}
      <div className="absolute top-1/3 left-1/3 w-[500px] h-[350px] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Autonomous Execution Engine
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Live <span className="gradient-text-emerald">Autonomous Sandbox</span> Demo
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Watch Ishva AI write code, run headless tests, catch runtime bugs, and self-heal automatically using Cursor &amp; Antigravity coordinated runtimes.
          </p>
        </div>

        {/* Outer Container */}
        <div className="max-w-5xl mx-auto">
          
          {/* Controls & Tab Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4 px-2">
            <div className="flex items-center gap-2">
              <Button 
                variant={activeTab === 'terminal' ? 'primary' : 'secondary'} 
                size="sm"
                onClick={() => setActiveTab('terminal')}
              >
                <TerminalIcon className="w-3.5 h-3.5" />
                Live Terminal
              </Button>
              <Button 
                variant={activeTab === 'diff' ? 'primary' : 'secondary'} 
                size="sm"
                onClick={() => setActiveTab('diff')}
              >
                <Code2 className="w-3.5 h-3.5" />
                Code Diff (Self-Heal)
              </Button>
              <Button 
                variant={activeTab === 'preview' ? 'primary' : 'secondary'} 
                size="sm"
                onClick={() => setActiveTab('preview')}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Live App Preview
              </Button>
            </div>

            <Button 
              variant="secondary" 
              size="sm"
              onClick={() => setSessionKey(k => k + 1)}
              title="Restart Simulation"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Re-run Swarm
            </Button>
          </div>

          {/* Active Tab View */}
          {activeTab === 'terminal' && (
            <Terminal 
              key={sessionKey}
              title="ishwa-orchestrator :: supervisor-critic-session#402"
              lines={sandboxCustomLines}
              simulate={true}
              className="shadow-2xl shadow-cyan-950/30"
            />
          )}

          {activeTab === 'diff' && (
            <Card className="font-mono text-xs">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-sm">src/components/BillingDashboard.tsx</CardTitle>
                  <span className="text-emerald-400 text-xs font-semibold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                    + Auto-Patched by Critic Agent
                  </span>
                </div>
                <CardDescription>
                  Real-time AST diff applied to resolve hydration mismatch before bundling.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-1.5 bg-[#05080e] p-4 rounded-xl border border-white/[0.06] mt-2">
                <div className="text-rose-400 bg-rose-500/10 px-2 py-1 rounded">
                  - const formattedDate = new Date(Date.now()).toLocaleDateString(); // ⚠️ Hydration Mismatch
                </div>
                <div className="text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">
                  + const [formattedDate, setFormattedDate] = useState&lt;string&gt;('');
                </div>
                <div className="text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">
                  + useEffect(() =&gt; &#123; setFormattedDate(new Date().toLocaleDateString()); &#125;, []);
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'preview' && (
            <Card className="text-center p-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-medium mb-6">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Autonomous Web App Running on Port 3000
              </div>
              <div className="max-w-md mx-auto p-6 rounded-2xl bg-[#090d16] border border-white/[0.1] shadow-2xl text-left">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold text-white text-base">Pro Subscription Dashboard</span>
                  <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">Active</span>
                </div>
                <div className="space-y-3 text-xs text-slate-300">
                  <div className="flex justify-between">
                    <span>Plan Model Routing</span>
                    <span className="font-semibold text-white">Dual-Tier (Claude 3.7 + Flash)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Next Self-Heal Audit</span>
                    <span className="text-cyan-400">Continuous CI Watcher</span>
                  </div>
                  <div className="w-full bg-white/[0.08] h-2.5 rounded-full overflow-hidden mt-3">
                    <div className="bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 h-full w-[84%] rounded-full" />
                  </div>
                  <span className="text-[11px] text-slate-500 block">84% Swarm Concurrency Allocated</span>
                </div>
              </div>
            </Card>
          )}

          {/* Footer Info Bar */}
          <div className="mt-4 px-4 py-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex flex-wrap items-center justify-between text-[11px] text-slate-400 gap-2">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Status: <strong className="text-slate-200">PASSING (0 errors)</strong>
              </span>
              <span>•</span>
              <span>Runtime: Next.js 15 App Router</span>
            </div>
            <div className="flex items-center gap-1.5 text-cyan-400 font-medium">
              <Wrench className="w-3 h-3" />
              <span>Critic Self-Healing Active</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}