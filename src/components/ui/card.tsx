import type { HTMLAttributes } from "react";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  hover?: boolean;
};

export function Card({
  hover = true,
  className = "",
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={[
        "relative overflow-hidden rounded-2xl",
        "bg-slate-900/55 backdrop-blur-xl",
        "border border-white/[0.10]",
        "shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset,0_24px_48px_-24px_rgba(0,0,0,0.7)]",
        hover
          ? "transition-all duration-300 ease-out hover:-translate-y-1 hover:border-indigo-400/35 hover:bg-slate-800/70 hover:shadow-[0_20px_40px_-16px_rgba(99,102,241,0.28)]"
          : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"
      />
      {children}
    </div>
  );
}

export function CardHeader({
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={`px-6 pt-6 pb-2 ${className}`} {...props} />;
}

export function CardTitle({
  className = "",
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={`text-lg font-semibold tracking-tight text-white ${className}`}
      {...props}
    />
  );
}

export function CardDescription({
  className = "",
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={`mt-1 text-sm leading-relaxed text-slate-400 ${className}`} {...props} />
  );
}

export function CardContent({
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={`px-6 py-4 ${className}`} {...props} />;
}

export function CardFooter({
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`flex items-center gap-3 border-t border-white/[0.06] px-6 py-4 ${className}`}
      {...props}
    />
  );
}
