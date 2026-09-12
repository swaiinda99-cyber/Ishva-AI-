'use client';

import React from 'react';
import { 
  GitBranch, 
  ShieldCheck, 
  Zap, 
  RefreshCw, 
  Lock, 
  Layers, 
  Boxes 
} from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: RefreshCw,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      title: 'Autonomous Self-Healing Loop',
      desc: 'The Critic compiler continuously runs test suites in an isolated sandbox. If a runtime exception or hydration issue occurs, it auto-patches code before you ever see it.'
    },
    {
      icon: GitBranch,
      color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
      title: 'Bi-Directional GitHub PR Sync',
      desc: 'Connect your repository once. Ishwa AI creates clean branches, writes descriptive pull requests, and syncs directly with team CI/CD pipelines.'
    },
    {
      icon: Layers,
      color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
      title: 'Parallel Swarm Concurrency',
      desc: 'Stop waiting for single-agent sequential generation. Specialized worker models write your database schema, server actions, and UI components in parallel.'
    },
    {
      icon: ShieldCheck,
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
      title: 'Zero Hallucinated Packages',
      desc: 'Our dependency auditor strictly verifies package existence and semantic versions against the live npm registry before committing package.json.'
    },
    {
      icon: Zap,
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      title: 'Next.js 15 App Router Native',
      desc: 'Built specifically for modern web architectures. Generates Server Components, Server Actions, suspense boundaries, and streaming UI by default.'
    },
    {
      icon: Lock,
      color: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
      title: 'Private & Secure Sandboxing',
      desc: 'Bring your own API keys or host on dedicated enterprise infrastructure. Your intellectual property and code logic never train third-party models.'
    }
  ];

  return (
    <section id="features" className="py-24 relative bg-[#06080d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Boxes className="w-3.5 h-3.5" />
            Next-Gen Capabilities
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Engineered for <span className="gradient-text-emerald">Autonomous Reliability</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            Not just a code completion tool. Ishwa AI is a full-lifecycle autonomous software engineer that delivers verified, deployable applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div 
                key={idx}
                className="glass-panel glass-panel-hover p-8 rounded-2xl border border-white/[0.08] relative group"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border mb-6 ${feat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                  {feat.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed font-normal">
                  {feat.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
