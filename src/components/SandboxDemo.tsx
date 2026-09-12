'use client';

import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  Wrench, 
  Sparkles
} from 'lucide-react';

interface LogItem {
  id: number;
  agent: string;
  agentColor: string;
  type: 'info' | 'warn' | 'success' | 'fix';
  message: string;
  timestamp: string;
}

const simulationLogs: LogItem[] = [
  {
    id: 1,
    agent: 'SUPERVISOR',
    agentColor: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
    type: 'info',
    message: 'User Spec received: "Autonomous SaaS Subscription Dashboard with Stripe Webhooks & Glassmorphism". Parsing AST graph...',
    timestamp: '00:01.12'
  },
  {
    id: 2,
    agent: 'WORKER-UI',
    agentColor: 'text-indigo-400 border-indigo-500/30 bg-indigo-500/10',
    type: 'info',
    message: 'Synthesizing React component tree in src/components/BillingDashboard.tsx (Tailwind v4 tokens applied)...',
    timestamp: '00:02.45'
  },
  {
    id: 3,
    agent: 'WORKER-API',
    agentColor: 'text-purple-400 border-purple-500/30 bg-purple-500/10',
    type: 'info',
    message: 'Synthesizing Server Action in src/app/actions/checkout.ts with cryptographic signature verification...',
    timestamp: '00:03.18'
  },
  {
    id: 4,
    agent: 'CRITIC-AUDITOR',
    agentColor: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
    type: 'warn',
    message: '⚠️ Build Failure in BillingDashboard.tsx:42 -> Hydration mismatch: Date.now() used during server render pass.',
    timestamp: '00:04.02'
  },
  {
    id: 5,
    agent: 'CRITIC-SELF-HEAL',
    agentColor: 'text-rose-400 border-rose-500/30 bg-rose-500/10',
    type: 'fix',
    message: 'Hotpatch dispatched: Wrapped timestamp in useEffect/mounted gate + added fallback skeleton. Re-compiling...',
    timestamp: '00:04.89'
  },
  {
    id: 6,
    agent: 'CRITIC-AUDITOR',
    agentColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
    type: 'success',
    message: '✅ Next.js Build Succeeded: 0 errors, 0 type issues, 100% strict adherence. Bundle: 38.4 kB.',
    timestamp: '00:05.67'
  },
  {
    id: 7,
    agent: 'DEPLOY-SWARM',
    agentColor: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
    type: 'success',
    message: '🚀 Preview deployed to https://preview.ishwa.ai/sandbox-99. Git commit pushed to main branch.',
    timestamp: '00:06.21'
  }
];

export default function SandboxDemo() {
  const [currentStep, setCurrentStep] = useState(3);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeTab, setActiveTab] = useState<'terminal' | 'diff' | 'preview'>('terminal');

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStep((prev) => (prev < simulationLogs.length ? prev + 1 : 1));
      }, 2400);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const displayedLogs = simulationLogs.slice(0, currentStep);

  return (
    <section id="sandbox" className="py-24 relative bg-[#070a11]">
      {/* Glow */}
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
            Watch Ishwa AI write code, trigger runtime tests, catch errors in real-time, and autonomously self-heal without human intervention.
          </p>
        </div>

        {/* Terminal Container */}
        <div className="max-w-5xl mx-auto rounded-2xl border border-white/[0.12] bg-[#090d16]/95 backdrop-blur-2xl shadow-2xl shadow-black/80 overflow-hidden">
          
          {/* Terminal Window Header */}
          <div className="flex flex-wrap items-center justify-between px-4 py-3 bg-[#060910] border-b border-white/[0.08] gap-3">
            {/* Traffic Light Dots */}
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80 hover:opacity-80 transition-opacity" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80 hover:opacity-80 transition-opacity" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80 hover:opacity-80 transition-opacity" />
              <span className="ml-2 text-xs font-mono text-slate-400 font-medium flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                ishwa-orchestrator :: sandbox-session#402
              </span>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-1 bg-[#0b0f19] p-1 rounded-lg border border-white/[0.05] text-xs font-medium">
              <button
                onClick={() => setActiveTab('terminal')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  activeTab === 'terminal' 
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Live Terminal
              </button>
              <button
                onClick={() => setActiveTab('diff')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  activeTab === 'diff' 
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Code Diff (Self-Heal)
              </button>
              <button
                onClick={() => setActiveTab('preview')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  activeTab === 'preview' 
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Live App Preview
              </button>
            </div>

            {/* Player Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.06] hover:bg-white/[0.12] text-xs text-slate-300 transition-colors border border-white/[0.08]"
              >
                {isPlaying ? <Pause className="w-3 h-3 text-amber-400" /> : <Play className="w-3 h-3 text-emerald-400" />}
                <span>{isPlaying ? 'Pause' : 'Resume'}</span>
              </button>
              <button
                onClick={() => setCurrentStep(1)}
                className="p-1 rounded-md bg-white/[0.06] hover:bg-white/[0.12] text-slate-400 hover:text-white transition-colors border border-white/[0.08]"
                title="Reset Simulation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-6 min-h-[380px] font-mono text-xs leading-relaxed">
            
            {activeTab === 'terminal' && (
              <div className="space-y-3.5 max-h-[400px] overflow-y-auto pr-2">
                {displayedLogs.map((log) => (
                  <div 
                    key={log.id} 
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-2 p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]"
                  >
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-slate-500 text-[10px]">[{log.timestamp}]</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${log.agentColor}`}>
                        {log.agent}
                      </span>
                    </div>
                    <div className="flex-1 text-slate-300 break-words">
                      {log.type === 'warn' && <span className="text-amber-400 font-semibold">{log.message}</span>}
                      {log.type === 'fix' && <span className="text-rose-400 font-semibold">{log.message}</span>}
                      {log.type === 'success' && <span className="text-emerald-400 font-medium">{log.message}</span>}
                      {log.type === 'info' && <span>{log.message}</span>}
                    </div>
                  </div>
                ))}

                {isPlaying && currentStep < simulationLogs.length && (
                  <div className="flex items-center gap-2 text-cyan-400 pt-2 text-xs">
                    <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                    <span>Agent swarm synthesizing next AST transformation...</span>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'diff' && (
              <div className="bg-[#04060a] p-4 rounded-xl border border-white/[0.06] text-xs font-mono">
                <div className="text-slate-500 mb-2 pb-2 border-b border-white/[0.08] flex justify-between items-center">
                  <span>src/components/BillingDashboard.tsx (Self-Healing Diff)</span>
                  <span className="text-emerald-400 font-semibold">+ Auto-Patched by Critic</span>
                </div>
                <div className="text-slate-400">
                  <div className="text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded my-1">
                    - const formattedDate = new Date(Date.now()).toLocaleDateString(); // ⚠️ Hydration Error
                  </div>
                  <div className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded my-1">
                    + const [formattedDate, setFormattedDate] = useState&lt;string&gt;('');
                  </div>
                  <div className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded my-1">
                    + useEffect(() =&gt; &#123; setFormattedDate(new Date().toLocaleDateString()); &#125;, []);
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'preview' && (
              <div className="bg-[#0b0f19] p-6 rounded-xl border border-white/[0.08] text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-medium mb-4">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Autonomous Web App Built & Running
                </div>
                <div className="max-w-md mx-auto p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] shadow-lg text-left">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-bold text-white text-sm">Pro Subscription Dashboard</span>
                    <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">Active</span>
                  </div>
                  <div className="space-y-2 text-xs text-slate-300">
                    <div className="flex justify-between">
                      <span>Current Plan</span>
                      <span className="font-bold text-white">Pro Autonomous</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Next Billing Date</span>
                      <span className="text-cyan-400">Oct 12, 2026</span>
                    </div>
                    <div className="w-full bg-white/[0.08] h-2 rounded-full overflow-hidden mt-3">
                      <div className="bg-gradient-to-r from-cyan-500 to-indigo-500 h-full w-[78%] rounded-full" />
                    </div>
                    <span className="text-[10px] text-slate-500">78% Monthly Agent Tokens Consumed</span>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Terminal Footer Info Bar */}
          <div className="px-6 py-3 bg-[#060910] border-t border-white/[0.06] flex flex-wrap items-center justify-between text-[11px] text-slate-400 gap-2">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Compiler Status: <strong className="text-slate-200">PASSING (0 errors)</strong>
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">Runtime: Next.js 15 App Router</span>
            </div>
            <div className="flex items-center gap-2 text-cyan-400 font-medium">
              <span>Self-Healing Loop Active</span>
              <Wrench className="w-3 h-3" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
