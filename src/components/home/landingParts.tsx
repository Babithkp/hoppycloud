import { useEffect, useRef, useState } from "react";

/** Fades and lifts its children in the first time they scroll into view. Skipped for people who prefer reduced motion. */
export function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${shown ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"} ${className}`}
      style={{ transitionDelay: shown ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}

/** Two-line headline (second line italic, like the hero), and an optional lead. */
export function SectionHeading({
  id,
  title,
  accent,
  lead,
  center = false,
}: {
  id: string;
  title: string;
  accent?: string;
  lead?: string;
  center?: boolean;
}) {
  return (
    <Reveal className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <h2 id={id} className="text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
        {title}
        {accent && (
          <>
            <br />
            <span className="italic text-white/70">{accent}</span>
          </>
        )}
      </h2>
      {lead && <p className="mt-5 text-lg leading-relaxed text-white/60">{lead}</p>}
    </Reveal>
  );
}

/** The shared frame for every mock UI on the page: a dark window with a faint chrome bar. */
export function MockWindow({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-white/10 bg-[#0b0c10] shadow-[0_30px_80px_-30px_rgba(1,42,110,0.45)] ${className}`} aria-hidden>
      <div className="flex items-center gap-1.5 border-b border-white/[0.07] px-4 py-3">
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="ml-3 text-xs text-white/40">{title}</span>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

export const PRIMARY_CTA = "inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-semibold text-black transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black";
export const SECONDARY_CTA = "inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 text-sm font-medium transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400";
