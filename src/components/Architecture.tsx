'use client';

import React, { useState } from 'react';
import { 
  Bot, 
  Workflow, 
  CheckCircle, 
  Cpu, 
  Code2, 
  RefreshCcw, 
  Database, 
  Palette, 
  Zap, 
  ArrowDown, 
  ArrowRight
} from 'lucide-react';

export default function Architecture() {
  const [activeTab, setActiveTab] = useState<'supervisor' | 'workers' | 'critic'>('supervisor');

  return (
    <section id="architecture" className="py-24 relative bg-[#06080d] border-t border-b border-white/[0.06]">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-indigo-500/10 blur-[130px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Workflow className="w-3.5 h-3.5" />
            Orchestration Intelligence
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Dual-Tier <span className="gradient-text-purple">Supervisor-Critic</span> Routing
          </h2>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            Why burn expensive tokens on repetitive boilerplates? Ishwa AI routes complex planning to top-tier reasoning LLMs, dispatches code generation to parallel micro-workers, and validates everything through a ruthless real-time Critic.
          </p>
        </div>

        {/* Interactive Architecture Flow Diagram */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          
          {/* Card 1: Supervisor */}
          <div 
            onClick={() => setActiveTab('supervisor')}
            className={`p-6 sm:p-8 rounded-2xl transition-all duration-300 cursor-pointer border ${
              activeTab === 'supervisor' 
                ? 'bg-[#0e1424] border-cyan-500/40 shadow-xl shadow-cyan-500/10 ring-1 ring-cyan-500/30' 
                : 'glass-panel hover:border-white/20'
            }`}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <Bot className="w-6 h-6" />
              </div>
              <span className="px-2.5 py-1 rounded text-xs font-semibold bg-cyan-500/15 text-cyan-300 border border-cyan-500/20">
                Tier 1: Top-Tier LLM
              </span>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2">The Supervisor</h3>
            <p className="text-sm text-slate-400 mb-4 leading-relaxed">
              Powered by high-reasoning flagship models. Decomposes high-level intent into deterministic DAGs (Directed Acyclic Graphs), outlines API contracts, and assigns discrete tasks to worker swarms.
            </p>

            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Context boundary management & DAG generation</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Next.js App Router & state tree architect</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Cost-optimized model dispatching</span>
              </li>
            </ul>
          </div>

          {/* Card 2: Worker Swarm */}
          <div 
            onClick={() => setActiveTab('workers')}
            className={`p-6 sm:p-8 rounded-2xl transition-all duration-300 cursor-pointer border ${
              activeTab === 'workers' 
                ? 'bg-[#0e1424] border-indigo-500/40 shadow-xl shadow-indigo-500/10 ring-1 ring-indigo-500/30' 
                : 'glass-panel hover:border-white/20'
            }`}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Zap className="w-6 h-6" />
              </div>
              <span className="px-2.5 py-1 rounded text-xs font-semibold bg-indigo-500/15 text-indigo-300 border border-indigo-500/20">
                Tier 2: Worker Swarm
              </span>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2">Low-Cost Code Workers</h3>
            <p className="text-sm text-slate-400 mb-4 leading-relaxed">
              Ultra-fast, targeted micro-models working in parallel threads. Each agent focuses on a single file or component, generating clean, modular code with maximum velocity and zero latency lag.
            </p>

            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <Palette className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span><strong>UI Worker</strong>: React, Tailwind, Glassmorphism</span>
              </li>
              <li className="flex items-center gap-2">
                <Database className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span><strong>Data Worker</strong>: Prisma schemas, queries & mutations</span>
              </li>
              <li className="flex items-center gap-2">
                <Code2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span><strong>API Worker</strong>: Route handlers & Server Actions</span>
              </li>
            </ul>
          </div>

          {/* Card 3: The Critic */}
          <div 
            onClick={() => setActiveTab('critic')}
            className={`p-6 sm:p-8 rounded-2xl transition-all duration-300 cursor-pointer border ${
              activeTab === 'critic' 
                ? 'bg-[#0e1424] border-emerald-500/40 shadow-xl shadow-emerald-500/10 ring-1 ring-emerald-500/30' 
                : 'glass-panel hover:border-white/20'
            }`}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <RefreshCcw className="w-6 h-6" />
              </div>
              <span className="px-2.5 py-1 rounded text-xs font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/20">
                Self-Healing Loop
              </span>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2">The Critic & Linter</h3>
            <p className="text-sm text-slate-400 mb-4 leading-relaxed">
              The guardian of software correctness. The Critic executes real TypeScript compilation, runs unit tests, flags hallucinations, and immediately re-routes failing code back to workers for automatic self-patching.
            </p>

            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Headless TypeScript compiler & Next.js linting</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Hydration mismatch & runtime error trap</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Zero broken PRs: Merges only green builds</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Visual Pipeline Flow Bar */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/[0.08]">
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-6 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyan-400" />
            Live Routing Execution Pipeline
          </h4>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono">
            
            {/* Step 1 */}
            <div className="flex items-center gap-3 w-full md:w-auto p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <p className="text-white font-bold">Natural Spec Input</p>
                <p className="text-slate-400 text-[11px]">Prompt + Figma Tokens</p>
              </div>
            </div>

            <ArrowRight className="hidden md:block w-4 h-4 text-slate-600 shrink-0" />
            <ArrowDown className="md:hidden w-4 h-4 text-slate-600 shrink-0" />

            {/* Step 2 */}
            <div className="flex items-center gap-3 w-full md:w-auto p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <div className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <p className="text-white font-bold">Supervisor Planner</p>
                <p className="text-slate-400 text-[11px]">Decomposes to DAG</p>
              </div>
            </div>

            <ArrowRight className="hidden md:block w-4 h-4 text-slate-600 shrink-0" />
            <ArrowDown className="md:hidden w-4 h-4 text-slate-600 shrink-0" />

            {/* Step 3 */}
            <div className="flex items-center gap-3 w-full md:w-auto p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <div className="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <p className="text-white font-bold">Worker Swarm Parallel</p>
                <p className="text-slate-400 text-[11px]">UI, Logic, DB Schemas</p>
              </div>
            </div>

            <ArrowRight className="hidden md:block w-4 h-4 text-slate-600 shrink-0" />
            <ArrowDown className="md:hidden w-4 h-4 text-slate-600 shrink-0" />

            {/* Step 4 */}
            <div className="flex items-center gap-3 w-full md:w-auto p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                4
              </div>
              <div>
                <p className="text-white font-bold">Critic Linter & Tester</p>
                <p className="text-slate-400 text-[11px]">Self-Heals on Error</p>
              </div>
            </div>

            <ArrowRight className="hidden md:block w-4 h-4 text-slate-600 shrink-0" />
            <ArrowDown className="md:hidden w-4 h-4 text-slate-600 shrink-0" />

            {/* Step 5 */}
            <div className="flex items-center gap-3 w-full md:w-auto p-3 rounded-xl bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/30">
              <div className="w-7 h-7 rounded-lg bg-emerald-500 text-black flex items-center justify-center font-bold">
                ✓
              </div>
              <div>
                <p className="text-emerald-400 font-bold">Live Deployment</p>
                <p className="text-slate-400 text-[11px]">Zero Error Production</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
