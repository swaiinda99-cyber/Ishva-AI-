'use client';

import React, { useState } from 'react';
import { Check, Sparkles, Zap, ArrowRight } from 'lucide-react';

export default function Pricing() {
  const [annual, setAnnual] = useState(true);

  return (
    <section id="pricing" className="py-24 relative bg-[#070a11] border-t border-white/[0.06]">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-cyan-500/10 to-purple-500/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Zap className="w-3.5 h-3.5" />
            Transparent Pricing
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Build for Free, Scale with <span className="gradient-text-purple">Pro Autonomy</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg mb-8">
            Zero surprise bills. Choose the tier that matches your engineering velocity.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-3 p-1 rounded-xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-md">
            <button
              onClick={() => setAnnual(false)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                !annual ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/25' : 'text-slate-400 hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                annual ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/25' : 'text-slate-400 hover:text-white'
              }`}
            >
              Annual Billing
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-black/20 text-black font-bold uppercase">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          
          {/* Free Starter */}
          <div className="glass-panel p-8 rounded-3xl border border-white/[0.08] flex flex-col justify-between hover:border-white/[0.18] transition-all duration-300">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">Free Starter</h3>
                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-white/[0.05] text-slate-400 border border-white/[0.08]">
                  Hobby &amp; Test
                </span>
              </div>
              <p className="text-sm text-slate-400 mb-6">
                Perfect for experimenting with autonomous agentic web creation.
              </p>

              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl sm:text-5xl font-extrabold text-white">$0</span>
                <span className="text-slate-400 text-sm">/ forever</span>
              </div>

              <ul className="space-y-3.5 text-sm text-slate-300 mb-8">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>5 Autonomous app generations / month</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Standard worker code generation models</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Public GitHub repository sync</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Live Sandbox preview environment</span>
                </li>
                <li className="flex items-center gap-2.5 text-slate-500">
                  <span className="w-4 h-4 flex items-center justify-center shrink-0">—</span>
                  <span>No parallel swarm concurrency</span>
                </li>
              </ul>
            </div>

            <a
              href="#"
              className="w-full py-3.5 px-4 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-white font-semibold text-center text-sm border border-white/[0.1] transition-all"
            >
              Start Building Free
            </a>
          </div>

          {/* Pro Autonomous (Highlighted) */}
          <div className="relative rounded-3xl p-1 bg-gradient-to-b from-cyan-400 via-indigo-500 to-purple-600 shadow-2xl shadow-cyan-500/20 flex flex-col justify-between transform lg:-translate-y-3">
            <div className="bg-[#090d16] p-8 rounded-[22px] h-full flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    Pro Autonomous
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                  </h3>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-cyan-500 to-indigo-500 text-white shadow-md">
                    Most Popular
                  </span>
                </div>
                <p className="text-sm text-slate-400 mb-6">
                  Unleash the full power of Supervisor-Critic multi-agent swarms.
                </p>

                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl sm:text-5xl font-extrabold text-white">
                    ${annual ? '24' : '29'}
                  </span>
                  <span className="text-slate-400 text-sm">/ month</span>
                  {annual && <span className="text-xs text-emerald-400 font-semibold ml-2">(Billed Annually)</span>}
                </div>

                <ul className="space-y-3.5 text-sm text-slate-200 mb-8">
                  <li className="flex items-center gap-2.5 font-medium">
                    <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Unlimited Autonomous App Builds</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Dual-Tier Supervisor-Critic routing engine</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Real-time autonomous self-healing loop</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>8x Parallel agent worker swarm threads</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Private GitHub repositories &amp; automatic PRs</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Bring Your Own Key (BYOK) OpenAI / Anthropic</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>1-Click Deploy to Vercel, Netlify &amp; Docker</span>
                  </li>
                </ul>
              </div>

              <a
                href="#"
                className="w-full py-4 px-4 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-center text-sm shadow-xl shadow-cyan-500/30 transition-all flex items-center justify-center gap-2"
              >
                <span>Get Started with Pro</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Enterprise Swarm */}
          <div className="glass-panel p-8 rounded-3xl border border-white/[0.08] flex flex-col justify-between hover:border-white/[0.18] transition-all duration-300">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">Enterprise Swarm</h3>
                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  Custom
                </span>
              </div>
              <p className="text-sm text-slate-400 mb-6">
                Dedicated isolated compute and security governance for teams.
              </p>

              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl sm:text-5xl font-extrabold text-white">Custom</span>
              </div>

              <ul className="space-y-3.5 text-sm text-slate-300 mb-8">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>Dedicated isolated VPC sandbox clusters</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>Fine-tuned models on internal design systems</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>SOC2 Type II compliance &amp; audit logging</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>Custom SLAs &amp; dedicated solutions engineer</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>Unlimited seats &amp; role-based access control</span>
                </li>
              </ul>
            </div>

            <a
              href="#"
              className="w-full py-3.5 px-4 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-white font-semibold text-center text-sm border border-white/[0.1] transition-all"
            >
              Contact Enterprise Sales
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
