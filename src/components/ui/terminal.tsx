"use client";

import { useEffect, useMemo, useState } from "react";

export type TerminalLine = {
  prompt?: string;
  text: string;
  tone?: "default" | "comment" | "success" | "warn" | "accent";
};

const DEFAULT_LINES: TerminalLine[] = [
  {
    prompt: "supervisor@",
    text: "ishva compile src/app/dashboard/page.tsx --strict",
    tone: "accent",
  },
  {
    text: "// Worker-UI synthesizing BillingMeter with Tailwind v4 tokens",
    tone: "comment",
  },
  {
    text: 'export function BillingMeter({ used }: { used: number }) {',
  },
  {
    text: "  return <div className=\"h-2 rounded-full bg-cyan-500\" style={{ width: `${used}%` }} />",
  },
  {
    text: "}",
  },
  {
    prompt: "critic@",
    text: "lint --fix  hydration: Date.now() gated behind useEffect",
    tone: "warn",
  },
  {
    prompt: "deploy@",
    text: "preview live → https://preview.ishva.ai/sandbox-402  (0 errors)",
    tone: "success",
  },
];

const toneClass: Record<NonNullable<TerminalLine["tone"]>, string> = {
  default: "text-slate-300",
  comment: "text-slate-500",
  success: "text-emerald-400",
  warn: "text-amber-300",
  accent: "text-cyan-300",
};

type TerminalProps = {
  title?: string;
  lines?: TerminalLine[];
  className?: string;
  simulate?: boolean;
};

export function Terminal({
  title = "ishva-orchestrator :: sandbox-session#402",
  lines = DEFAULT_LINES,
  className = "",
  simulate = true,
}: TerminalProps) {
  const [visibleCount, setVisibleCount] = useState(simulate ? 1 : lines.length);

  const shown = useMemo(
    () => lines.slice(0, visibleCount),
    [lines, visibleCount],
  );

  useEffect(() => {
    if (!simulate || visibleCount >= lines.length) {
      return;
    }

    const timer = window.setTimeout(() => {
      setVisibleCount((count) => Math.min(count + 1, lines.length));
    }, 700);

    return () => window.clearTimeout(timer);
  }, [simulate, visibleCount, lines.length]);

  return (
    <div
      className={[
        "overflow-hidden rounded-2xl border border-white/[0.10] bg-[#070b12]/95 shadow-2xl shadow-black/60",
        className,
      ].join(" ")}
    >
      <div className="flex items-center gap-2 border-b border-white/[0.08] bg-[#05080e] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-500/85" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/85" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/85" />
        <span className="ml-2 truncate font-mono text-[11px] text-slate-400">
          {title}
        </span>
        <span className="ml-auto hidden text-[10px] font-medium uppercase tracking-wider text-emerald-400 sm:inline">
          live
        </span>
      </div>

      <pre className="min-h-[220px] overflow-x-auto p-4 font-mono text-[12px] leading-6">
        {shown.map((line, index) => (
          <div
            key={`${line.text}-${index}`}
            className={toneClass[line.tone ?? "default"]}
          >
            {line.prompt ? (
              <span className="text-cyan-500">{line.prompt}</span>
            ) : null}
            {line.text}
          </div>
        ))}
        <div className="mt-1 text-cyan-400">
          <span className="inline-block h-3.5 w-1.5 animate-pulse bg-cyan-400 align-middle" />
        </div>
      </pre>
    </div>
  );
}
