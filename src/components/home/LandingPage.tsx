import { useEffect } from "react";
import { gsap } from "gsap";
import Lenis from "lenis";
import Snap from "lenis/snap";
import FAQSection from "./FAQSection";
import FeatureShowcase from "./FeatureShowcase";
import FinalCTA from "./FinalCTA";
import Footer from "./Footer";
import GrowthStatement from "./GrowthStatement";
import Hero from "./Hero";
import HowItWorks from "./HowItWorks";
import LandingNavbar from "./LandingNavbar";
import LevelsSection from "./LevelsSection";
import ProblemSection from "./ProblemSection";
import SecuritySection from "./SecuritySection";

/**
 * Hero and the scroll-lit statement under it lead in; the rest follows the problem → solution → proof → action arc:
 * why AWS is hard, what Syncloud does (with live product mocks), how its levels keep it simple, how to get started,
 * why it's safe, questions, and one last call to action.
 */
/** Height of the fixed navbar plus some breathing room, so an anchor jump doesn't land flush under it. */
const ANCHOR_OFFSET = -96;

function LandingPage() {
  useEffect(() => {
    // Respect the same reduced-motion preference every other animation on this page already checks.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
    const lenis = new Lenis({ duration: 1.1, easing: easeOutCubic, smoothWheel: true });

    // Drive Lenis from GSAP's own ticker, the pattern GSAP recommends, so ScrollTrigger (used by ScrollReveal)
    // reads the same smoothed position instead of fighting Lenis's rAF loop with its own.
    const onTick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    // Once a scroll gesture comes to rest near a section boundary, ease the rest of the way to its exact top
    // instead of leaving the page stopped mid-section (or, with a fast flick, carried past it). Each top-level
    // section in <main> (plus the footer) is a snap point; proximity-only, so a slow read through a tall section
    // like the feature showcase is never hijacked mid-scroll.
    const snap = new Snap(lenis, { type: "proximity", duration: 0.9, easing: easeOutCubic, distanceThreshold: "25%" });
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main > section, .landing-page > footer"));
    const removeSnapElements = snap.addElements(sections, { align: "start" });

    // Hash links (nav, hero, FAQ, final CTA all point at #features / #how-it-works / #faq) jump instantly by
    // default, which would cut across Lenis's smoothing. Intercept them and let Lenis ease to the target instead.
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a[href^="#"]');
      if (!anchor) return;
      const id = anchor.getAttribute("href")?.slice(1);
      const target = id ? document.getElementById(id) : null;
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: ANCHOR_OFFSET, duration: 1.4 });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      removeSnapElements();
      snap.destroy();
      gsap.ticker.remove(onTick);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="landing-page min-h-screen bg-black text-white">
      <LandingNavbar />
      <main>
        <Hero />
        <GrowthStatement />
        <ProblemSection />
        <FeatureShowcase />
        <LevelsSection />
        <SecuritySection />
        <HowItWorks />
        <FAQSection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

export default LandingPage;
