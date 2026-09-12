'use client';

import React from 'react';
import { ArrowRight, ShieldCheck, Zap, Sparkles, Terminal as TerminalIcon, CheckCircle2, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-500/15 via-indigo-500/20 to-purple-500/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-10 left-10 w-72 h-72 bg-cyan-500/10 blur-[90px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          
          {/* Release Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] backdrop-blur-md mb-8 hover:border-cyan-500/40 transition-all duration-300 group cursor-pointer">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="text-xs font-medium text-slate-300 group-hover:text-white transition-colors">
              Supervisor-Critic Multi-Agent Swarm is now live
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
            Build Autonomous Web Apps with{' '}
            <span className="gradient-text-emerald block sm:inline">Ishva AI</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto mb-10 font-normal">
            Deploy production-ready web applications from natural language. Ishva AI orchestrates an elite{' '}
            <span className="text-slate-200 font-semibold">Supervisor-Critic</span> swarm of AI agents that write, compile, unit-test, and self-heal code in real time.
          </p>

          {/* CTA Buttons with Cursor Primitives */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a href="#pricing" className="w-full sm:w-auto">
              <Button variant="primary" size="lg" className="w-full sm:w-auto">
                <Sparkles className="w-5 h-5 text-cyan-200 group-hover:rotate-12 transition-transform" />
                Start Building Free
                <ArrowRight className="w-4 h-4" />
              </Button>
            </a>

            <a href="#sandbox" className="w-full sm:w-auto">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                <TerminalIcon className="w-5 h-5 text-cyan-400" />
                Explore Live Sandbox
              </Button>
            </a>
          </div>

          {/* Key Metric Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto pt-6 border-t border-white/[0.08]">
            <div className="flex flex-col items-center p-3">
              <div className="flex items-center gap-1.5 text-2xl font-bold text-white mb-0.5">
                <Zap className="w-5 h-5 text-amber-400" />
                10x
              </div>
              <span className="text-xs text-slate-400 font-medium">Dev Velocity</span>
            </div>

            <div className="flex flex-col items-center p-3">
              <div className="flex items-center gap-1.5 text-2xl font-bold text-white mb-0.5">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                99.8%
              </div>
              <span className="text-xs text-slate-400 font-medium">Type-Safe Compilation</span>
            </div>

            <div className="flex flex-col items-center p-3">
              <div className="flex items-center gap-1.5 text-2xl font-bold text-white mb-0.5">
                <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                0
              </div>
              <span className="text-xs text-slate-400 font-medium">Manual Boilerplate</span>
            </div>

            <div className="flex flex-col items-center p-3">
              <div className="flex items-center gap-1.5 text-2xl font-bold text-white mb-0.5">
                <Layers className="w-5 h-5 text-purple-400" />
                Dual-Tier
              </div>
              <span className="text-xs text-slate-400 font-medium">Supervisor + Workers</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}