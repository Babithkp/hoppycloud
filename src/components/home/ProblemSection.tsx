import { Compass, Receipt, ShieldAlert, type LucideIcon } from "lucide-react";
import { Reveal, SectionHeading } from "./landingParts";

const PAINS: { icon: LucideIcon; title: string; text: string; stat: string; statLabel: string }[] = [
  {
    icon: Compass,
    title: "Resources are scattered",
    text: "Each AWS service has its own console, and each region shows only its own resources. Finding everything you run means checking them one by one.",
    stat: "200+",
    statLabel: "AWS services, each with its own console",
  },
  {
    icon: Receipt,
    title: "Costs are hard to trace",
    text: "The bill groups spending by service, not by the servers and databases you recognize, and you only see the full total after the month ends.",
    stat: "Month-end",
    statLabel: "when the full bill shows what everything cost",
  },
  {
    icon: ShieldAlert,
    title: "Settings are easy to get wrong",
    text: "Making a bucket public or opening SSH to the whole internet takes one setting, and the console doesn't warn you.",
    stat: "0.0.0.0/0",
    statLabel: "one rule away from opening a port to everyone",
  },
];

/** Names the pain before showing the fix: AWS is powerful, but it isn't built for people who just want to run their app. */
export default function ProblemSection() {
  return (
    <section aria-labelledby="problem-title" className="px-6 py-20 sm:py-28 md:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          id="problem-title"
          title="AWS is powerful."
          accent="Keeping track of it is hard."
          lead="Most teams run more on AWS than they can see at a glance. These are the three problems Hoppycloud is built around."
        />
        <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-3">
          {PAINS.map(({ icon: Icon, title, text, stat, statLabel }, i) => (
            <Reveal key={title} delay={i * 120}>
              <article className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-7">
                <span className="flex size-11 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                  <Icon className="size-5 text-white/80" aria-hidden />
                </span>
                <h3 className="mt-6 text-xl font-semibold">{title}</h3>
                <p className="mt-2 leading-relaxed text-white/55">{text}</p>
                <div className="mt-auto border-t border-white/10 pt-5">
                  <p className="mt-6 text-3xl font-semibold tracking-tight text-brand-400">{stat}</p>
                  <p className="mt-1 text-sm text-white/45">{statLabel}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
