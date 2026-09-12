import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ishwa AI - Autonomous Agentic Web Development Platform',
  description: 'Deploy production-ready web applications from natural language. Ishwa AI orchestrates an elite Supervisor-Critic swarm of AI agents that write, compile, test, and self-heal code in real time.',
  keywords: ['Ishwa AI', 'Autonomous Web Development', 'AI Software Engineer', 'Supervisor-Critic', 'Next.js 15', 'Agent Swarm'],
  openGraph: {
    title: 'Ishwa AI - Autonomous Agentic Web Development Platform',
    description: 'Autonomous multi-agent platform for real-time web development. From prompt to deployed production software in seconds.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <body className="min-h-screen bg-[#06080d] text-slate-100 antialiased selection:bg-cyan-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}

