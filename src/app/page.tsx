import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Architecture from '@/components/Architecture';
import SandboxDemo from '@/components/SandboxDemo';
import Features from '@/components/Features';
import Pricing from '@/components/Pricing';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-[#06080d] text-slate-100">
      <Navbar />
      <Hero />
      <Architecture />
      <SandboxDemo />
      <Features />
      <Pricing />
      <Footer />
    </main>
  );
}

