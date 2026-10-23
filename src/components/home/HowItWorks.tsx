import { useState } from "react";
import { MockWindow, Reveal, SectionHeading } from "./landingParts";

/** Real screens from the app in its dark theme, each matching its step's copy (public/landing/how-*.webp).
 *  Each has its own aspect ratio (a connect screen is taller than a wide data table) — sized by its own
 *  width/height instead of forced into one box, so there's no cropping and no empty letterbox padding. */
const shot = "block h-auto w-full rounded-lg border border-white/10 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)]";

const STEPS: { label: string; title: string; text: string; time: string; image: string; alt: string; width: number; height: number }[] = [
  {
    label: "Connect",
    title: "Connect your AWS account",
    text: "Create the Hoppycloud IAM role with one CloudFormation stack, using the External ID Hoppycloud gives you. You can review its permissions first, or connect with an access key instead.",
    time: "One CloudFormation stack",
    image: "/landing/how-connect.webp",
    alt: "Hoppycloud's connect screen: your External ID and a button to create the Hoppycloud role in AWS",
    width: 1600,
    height: 1075,
  },
  {
    label: "Scan",
    title: "Hoppycloud scans your account",
    text: "Hoppycloud scans each enabled region for supported resources and estimates what each one costs.",
    time: "Every enabled region",
    image: "/landing/how-scan.webp",
    alt: "Hoppycloud's resource list after a scan: every resource across 5 regions, grouped by category and region",
    width: 1765,
    height: 855,
  },
  {
    label: "Organize",
    title: "Organize and manage",
    text: "Group resources by project, review what Hoppycloud flags, and create or change supported resources from the dashboard.",
    time: "From the dashboard",
    image: "/landing/how-manage.webp",
    alt: "Hoppycloud's dashboard: cost by region, and the issues that need attention with a way to fix each",
    width: 1765,
    height: 790,
  },
];

/** The screen is the focal point — framed in the same MockWindow chrome as the rest of the page's product shots,
 *  sized by aspect-ratio so there's no dead space around it. A pill selector below (the same pattern the hero's
 *  tab bar uses) switches steps; the active step's description appears once, under the selector, instead of
 *  being repeated per step. */
export default function HowItWorks() {
  const [step, setStep] = useState(0);
  const current = STEPS[step];

  return (
    <section id="how-it-works" aria-labelledby="how-title" className="landing-glow px-6 py-20 sm:py-28 md:px-10">
      <div className="mx-auto max-w-5xl">
        <SectionHeading id="how-title" title="Connect your AWS account." accent="Then see what you run." center />

        <Reveal delay={100}>
          <MockWindow title={current.title} className="mt-16 shadow-[0_30px_90px_-30px_rgba(1,42,110,0.45)]">
            <div key={step} className="overflow-hidden rounded-lg animate-in fade-in zoom-in-95 duration-500 motion-reduce:animate-none">
              <img src={current.image} alt={current.alt} width={current.width} height={current.height} className={shot} loading={step === 0 ? "eager" : "lazy"} />
            </div>
          </MockWindow>
        </Reveal>

        <Reveal delay={200}>
          <div
            role="tablist"
            aria-label="How it works, steps"
            className="mx-auto mt-8 flex max-w-md gap-1.5 rounded-full bg-white/[0.06] p-1.5 ring-1 ring-white/10"
          >
            {STEPS.map((s, i) => {
              const active = i === step;
              return (
                <button
                  key={s.label}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setStep(i)}
                  className={`flex-1 rounded-full px-3 py-2.5 text-sm font-medium transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 ${
                    active ? "bg-white text-black shadow-sm" : "text-white/55 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span className={active ? "text-brand-600" : "text-white/35"}>{i + 1}.</span> {s.label}
                </button>
              );
            })}
          </div>

          {/* The active step's own copy — shown once, under the selector, instead of repeated per tab. */}
          <p key={step} className="mx-auto mt-6 max-w-xl text-center leading-relaxed text-white/60 animate-in fade-in duration-300 motion-reduce:animate-none" aria-live="polite">
            {current.text} <span className="font-medium uppercase tracking-wider text-brand-300/80">— {current.time}</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
