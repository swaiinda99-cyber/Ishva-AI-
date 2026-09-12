'use client';

import React from 'react';
import { Cpu } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#04060a] border-t border-white/[0.08] text-slate-400 py-16 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Col */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-600 p-[1px]">
                <div className="w-full h-full bg-[#090d16] rounded-lg flex items-center justify-center">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <span className="font-bold text-lg text-white">Ishwa AI</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Autonomous multi-agent platform for real-time web development. From prompt to deployed production software in seconds.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>All Systems Operational</span>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase text-white tracking-wider mb-4">Architecture</h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#architecture" className="hover:text-cyan-400 transition-colors">Supervisor-Critic Swarm</a></li>
              <li><a href="#sandbox" className="hover:text-cyan-400 transition-colors">Autonomous Self-Healing</a></li>
              <li><a href="#sandbox" className="hover:text-cyan-400 transition-colors">Live Sandbox Simulator</a></li>
              <li><a href="#features" className="hover:text-cyan-400 transition-colors">Next.js 15 App Router Native</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xs font-semibold uppercase text-white tracking-wider mb-4">Developers</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a 
                  href="https://github.com/swaiinda99-cyber/Ishva-AI-" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  <span>GitHub Repository</span>
                </a>
              </li>
              <li><a href="#pricing" className="hover:text-cyan-400 transition-colors">Documentation &amp; Guides</a></li>
              <li><a href="#pricing" className="hover:text-cyan-400 transition-colors">Changelog</a></li>
              <li><a href="#pricing" className="hover:text-cyan-400 transition-colors">Community Discord</a></li>
            </ul>
          </div>

          {/* Legal / Social */}
          <div>
            <h4 className="text-xs font-semibold uppercase text-white tracking-wider mb-4">Connect</h4>
            <div className="flex items-center gap-3 mb-4">
              <a 
                href="https://github.com/swaiinda99-cyber/Ishva-AI-" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] flex items-center justify-center text-slate-300 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
            </div>
            <p className="text-xs text-slate-500">
              &copy; 2026 Ishwa AI. All rights reserved.
            </p>
          </div>

        </div>

        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>Built with Next.js 15, TypeScript &amp; Tailwind CSS.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-400 transition-colors">Terms of Service</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-400 transition-colors">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
