import { Check } from "lucide-react";
import { Reveal } from "./landingParts";
import WaitlistForm from "./WaitlistForm";

const REASSURANCE = ["No credit card to join", "We'll only email you about launch", "Unsubscribe any time"];

/** The last ask, and the one place everyone eventually lands: join the waitlist. */
export default function FinalCTA() {
  return (
    <section id="waitlist" aria-labelledby="cta-title" className="px-6 pb-28 pt-12 md:px-10">
      <Reveal>
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] border border-white/10 bg-[#05060a] px-6 py-20 text-center sm:px-16">
          {/* A soft beam of the hero's blue, falling onto the panel */}
          <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[36rem] -translate-x-1/2 rounded-full bg-[#012a6e]/40 blur-[120px]" aria-hidden />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-400/60 to-transparent" aria-hidden />
          <div className="relative">
            <h2 id="cta-title" className="mx-auto max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight sm:text-6xl">
              Get your AWS accounts
              <br />
              <span className="italic text-white/70">in sync.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-white/60">Join the waitlist to be first in line when Hoppycloud opens up.</p>
            <div className="mx-auto mt-10 max-w-md">
              <WaitlistForm />
            </div>
            <ul className="mt-8 flex flex-col items-center justify-center gap-x-8 gap-y-2 text-sm text-white/50 sm:flex-row">
              {REASSURANCE.map((r) => (
                <li key={r} className="flex items-center gap-2">
                  <Check className="size-4 text-emerald-400" aria-hidden /> {r}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
