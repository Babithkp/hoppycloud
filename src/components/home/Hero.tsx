import { useEffect, useState } from "react";
import GradientASCII from "../reactbits/GradientASCII";
import SpecularButton from "../reactbits/SpecularButton";
import { useWaitlistModal } from "./WaitlistModalContext";

/** Each tab shows a real screen from the demo dashboard (captured from the app in demo mode, dark theme). */
const TABS = [
  { label: "Overview", image: "/landing/hero-overview.webp", alt: "Hoppycloud dashboard overview: cost this month, resources, alarms and daily spend" },
  { label: "Accounts", image: "/landing/hero-accounts.webp", alt: "Every AWS account connected to Hoppycloud: provider, how it's connected, regions and when it was linked" },
  { label: "Costs", image: "/landing/hero-costs.webp", alt: "Hoppycloud billing view: monthly budget, forecast and spend by service and region" },
  { label: "Inventory", image: "/landing/hero-resources.webp", alt: "Every AWS resource across regions in one Hoppycloud list" },
];

export default function Hero() {
  const { openModal } = useWaitlistModal();
  const [activeTab, setActiveTab] = useState(0);
  // Bumped on every tab click (even the current one) so the screenshot's entrance animation replays.
  const [swap, setSwap] = useState(0);

  // Auto-advances every 3s; a manual click resets this effect (via the activeTab dependency) so the
  // next auto-switch is always a full 3s after the visitor's own interaction, not a leftover tick.
  useEffect(() => {
    const id = setInterval(() => {
      setActiveTab((i) => (i + 1) % TABS.length);
      setSwap((n) => n + 1);
    }, 3000);
    return () => clearInterval(id);
  }, [activeTab]);

  return (
    <section className="relative bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,#0b1f45_0%,#010a1f_55%,#000104_100%)] px-6 pb-24 pt-36 md:px-10">
      {/* Animated ASCII light behind the headline (React Bits GradientASCII). It ignores clicks so the buttons above it
          work, fades out before the product screenshots, and a soft scrim keeps the headline readable. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[760px] [mask-image:linear-gradient(to_bottom,black_55%,transparent)]" aria-hidden="true">
        <GradientASCII
          colors={["#002a6e", "#0b3c6b", "#012a6e", "#3f6fd9"]}
          shape="horizon"
          characters="Hoppycloud"
          cellSize={18}
          density={0.8}
          glyphOpacity={0.32}
          gradientOpacity={0.2}
          fontFamily='"IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace'
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_60%_at_20%_38%,rgba(0,0,0,0.72),transparent_75%)]" />
      </div>
      <div className="relative z-30 mx-auto max-w-7xl">
        <h1 className="max-w-4xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
          Every account, every resource,
          <br />
          <span className="inline-block -skew-x-[7deg]">
            One{" "}
            <span className="inline-block rounded-md bg-primaryColor px-2 text-white">hop</span>{" "}
            away.
          </span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-white">
          See your resources, understand how they're connected, and track costs across all your AWS accounts.
        </p>

        <div className="mt-8 flex items-center gap-3">
          {/* The primary CTA: React Bits SpecularButton, a landing-blue glass button whose edge catches a light that
              slides towards the cursor. Padding and line height match "How it works" beside it. */}
          <SpecularButton
            size="sm"
            radius={12}
            tint="#012a6e"
            tintOpacity={0.85}
            textColor="#ffffff"
            lineColor="#ffffff"
            baseColor="#3f6fd9"
            intensity={1}
            idleIntensity={0.45}
            shineSize={10}
            shineFade={34}
            thickness={1.2}
            glow={1}
            followMouse
            proximity={250}
            onClick={openModal}
            style={{ padding: "13px 24px", lineHeight: "20px" }}
          >
            Join the waitlist
          </SpecularButton>
          <a href="#how-it-works" className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium hover:bg-white/10">
            How it works
          </a>
        </div>
      </div>

      <div className="relative mx-auto mt-5 h-[370px] max-w-7xl sm:h-[680px] overflow-hidden rounded-2xl border border-white/10 bg-[#012a6e]/30 shadow-[0_40px_120px_-40px_rgba(1,42,110,0.55)]">
        <div
          role="tablist"
          aria-label="Product features"
          className="absolute left-1/2 top-5 z-[3] grid w-[calc(100%-64px)] -translate-x-1/2 grid-cols-2 gap-1.5 rounded-[22px] bg-white/[0.06] p-1.5 ring-1 ring-white/10 sm:grid-cols-4 sm:rounded-full"
        >
          {TABS.map((tab, i) => (
            <button
              key={tab.label}
              type="button"
              role="tab"
              aria-selected={activeTab === i}
              onClick={() => {
                setActiveTab(i);
                setSwap((n) => n + 1);
              }}
              className={`min-w-0 overflow-hidden text-ellipsis whitespace-nowrap min-h-11 rounded-full px-2 py-2 text-xs font-medium tracking-normal transition-colors duration-300 sm:min-h-0 sm:px-2.5 sm:text-sm sm:tracking-wider ${
                activeTab === i ? "bg-white text-black shadow-sm" : "text-white/55 hover:bg-white/10 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="absolute left-1/2 top-[138px] z-[2] w-[calc(100%-64px)] -translate-x-1/2 sm:top-[84px]">
          {/* All four stay mounted so switching tabs is instant; only the active one is visible. The active one is keyed by
              the click count, so it remounts and replays its entrance (hero-swap) on every click; the others fade out. */}
          <div className="grid">
            {TABS.map((tab, i) => (
              <img
                key={activeTab === i ? `${tab.image}-${swap}` : tab.image}
                src={tab.image}
                alt={tab.alt}
                aria-hidden={activeTab !== i}
                loading={i === 0 ? "eager" : "lazy"}
                width={2432}
                height={1520}
                className={`col-start-1 row-start-1 block w-full rounded-xl border border-white/10 shadow-[0_24px_80px_-20px_rgba(0,0,0,0.8)] transition-opacity duration-300 motion-reduce:animate-none motion-reduce:transition-none ${
                  activeTab === i ? `opacity-100 ${swap > 0 ? "animate-hero-swap" : ""}` : "opacity-0"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
