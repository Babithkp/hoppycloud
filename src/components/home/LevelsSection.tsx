import { useState } from "react";
import { ChevronDown, Lock, ShieldCheck } from "lucide-react";
import { Reveal, SectionHeading } from "./landingParts";

type Level = 1 | 2 | 3;

const LEVELS: { level: Level; label: string; who: string }[] = [
  { level: 1, label: "Defaults", who: "Just the essentials. Hoppycloud picks safe values for everything else." },
  { level: 2, label: "Common", who: "The settings most teams adjust: disks, network access, keys." },
  { level: 3, label: "Everything", who: "Full control for when you know exactly what you want." },
];

const FIELDS: { label: string; value: string; level: Level; select?: boolean }[] = [
  { label: "Name", value: "web-1", level: 1 },
  { label: "Region", value: "ap-south-1 · Mumbai", level: 1, select: true },
  { label: "Size", value: "Small · 2 vCPU, 4 GB", level: 1, select: true },
  { label: "Disk", value: "30 GB, encrypted", level: 2 },
  { label: "SSH key", value: "Create a new key", level: 2, select: true },
  { label: "Allow web traffic", value: "HTTP and HTTPS", level: 2 },
  { label: "Network", value: "main-vpc · public-a", level: 3, select: true },
  { label: "Server role", value: "app-reads-uploads", level: 3, select: true },
  { label: "Pricing", value: "Spot — up to 70% cheaper", level: 3, select: true },
];

const DEFAULTS = [
  "Disks and buckets encrypted",
  "Buckets private, public access blocked",
  "SSH open only to your own IP",
  "Instance metadata locked down (IMDSv2)",
  "Databases kept off the public internet",
  "Deletes need you to type the name",
];

/**
 * Syncloud's core idea, shown rather than told: the same create form at three levels of detail.
 * Switching level adds fields in place, so visitors see they can start simple and grow into the details.
 */
export default function LevelsSection() {
  const [level, setLevel] = useState<Level>(1);
  const current = LEVELS.find((l) => l.level === level)!;

  return (
    <section aria-labelledby="levels-title" className="px-6 py-20 sm:py-28 md:px-10">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-14 lg:grid-cols-[1fr_1.1fr]">
        <div className="flex flex-col gap-10">
          <SectionHeading
            id="levels-title"
            title="Start simple."
            accent="Go deeper any time."
            lead="Forms and settings pages have three levels: Defaults, Common and Everything. Start with the essentials, and switch a service to a higher level when you need more options."
          />
          <Reveal>
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <p className="flex items-center gap-2 font-semibold">
                <ShieldCheck className="size-5 text-emerald-400" aria-hidden /> Safe by default, at every level
              </p>
              <ul className="mt-4 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
                {DEFAULTS.map((d) => (
                  <li key={d} className="flex items-start gap-2.5 text-sm text-white/70">
                    <Lock className="mt-0.5 size-3.5 shrink-0 text-emerald-400/80" aria-hidden />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal delay={150}>
          <div className="rounded-2xl border border-white/10 bg-[#0b0c10] p-6 shadow-[0_30px_80px_-30px_rgba(1,42,110,0.45)]">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="font-semibold">Create a server</p>
              <div role="radiogroup" aria-label="Options shown" className="flex rounded-lg border border-white/10 p-0.5 text-sm">
                {LEVELS.map((l) => (
                  <button
                    key={l.level}
                    type="button"
                    role="radio"
                    aria-checked={l.level === level}
                    onClick={() => setLevel(l.level)}
                    className={`rounded-md px-3 py-2.5 transition-colors sm:py-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 ${
                      l.level === level ? "bg-white font-medium text-black" : "text-white/60 hover:text-white"
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>
            <p className="mt-2 min-h-10 text-sm text-white/50" aria-live="polite">
              {current.who}
            </p>

            <div className="mt-5 flex flex-col gap-3">
              {FIELDS.map((f) => {
                const visible = f.level <= level;
                return (
                  <div
                    key={f.label}
                    aria-hidden={!visible}
                    className={`grid transition-all duration-300 motion-reduce:transition-none ${visible ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                  >
                    <div className="overflow-hidden">
                      <p className="mb-1.5 flex items-center gap-2 text-xs text-white/50">
                        {f.label}
                        {f.level > 1 && (
                          <span className="rounded bg-brand-500/15 px-1.5 py-0.5 text-[10px] text-brand-300">{f.level === 2 ? "Common" : "Everything"}</span>
                        )}
                      </p>
                      <div className="flex h-10 items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] px-3 text-sm">
                        {f.value}
                        {f.select && <ChevronDown className="size-4 text-white/30" aria-hidden />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 flex items-center justify-between gap-3 border-t border-white/10 pt-5">
              <p className="text-sm text-white/50">
                Est. <span className="font-semibold text-white">$30.37</span> / month
              </p>
              <span className="rounded-lg bg-[#012a6e] px-4 py-2 text-sm font-medium">Create server</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
