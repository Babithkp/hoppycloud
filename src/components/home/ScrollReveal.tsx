import { useEffect, useMemo, useRef, type ReactNode, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ScrollReveal.css";

gsap.registerPlugin(ScrollTrigger);

/**
 * Adapted from React Bits' ScrollReveal. Two changes from the original:
 * - Renders a plain <div>, not <h2>/<p> — this wraps body copy, not a heading
 *   (the app's global CSS puts h1-h3 in a display font, which this text isn't).
 * - `enableOpacity` (new, default true) can be turned off so the rotation/blur
 *   sweep layers over content that already animates its own opacity (e.g.
 *   GrowthStatement's per-word color reveal) without the two fighting over
 *   the same style property every scroll frame.
 */
export default function ScrollReveal({
  children,
  scrollContainerRef,
  enableBlur = true,
  enableOpacity = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = "",
  textClassName = "",
  rotationEnd = "bottom bottom",
  wordAnimationEnd = "bottom bottom",
}: {
  children: ReactNode;
  scrollContainerRef?: RefObject<HTMLElement>;
  enableBlur?: boolean;
  enableOpacity?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  rotationEnd?: string;
  wordAnimationEnd?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const splitText = useMemo(() => {
    if (typeof children !== "string") return children;
    return children.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <span className="word" key={index}>
          {word}
        </span>
      );
    });
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller = scrollContainerRef?.current ?? window;

    const rotationTween = gsap.fromTo(
      el,
      { transformOrigin: "0% 50%", rotate: baseRotation },
      {
        ease: "none",
        rotate: 0,
        scrollTrigger: { trigger: el, scroller, start: "top bottom", end: rotationEnd, scrub: true },
      }
    );

    const wordElements = el.querySelectorAll(".word");
    const opacityTween = enableOpacity
      ? gsap.fromTo(
          wordElements,
          { opacity: baseOpacity, willChange: "opacity" },
          {
            ease: "none",
            opacity: 1,
            stagger: 0.05,
            scrollTrigger: { trigger: el, scroller, start: "top bottom-=20%", end: wordAnimationEnd, scrub: true },
          }
        )
      : null;

    const blurTween = enableBlur
      ? gsap.fromTo(
          wordElements,
          { filter: `blur(${blurStrength}px)` },
          {
            ease: "none",
            filter: "blur(0px)",
            stagger: 0.05,
            scrollTrigger: { trigger: el, scroller, start: "top bottom-=20%", end: wordAnimationEnd, scrub: true },
          }
        )
      : null;

    return () => {
      [rotationTween, opacityTween, blurTween].forEach((tween) => tween?.scrollTrigger?.kill());
    };
  }, [scrollContainerRef, enableBlur, enableOpacity, baseRotation, baseOpacity, rotationEnd, wordAnimationEnd, blurStrength]);

  return (
    <div ref={containerRef} className={`scroll-reveal ${containerClassName}`}>
      <div className={`scroll-reveal-text ${textClassName}`}>{splitText}</div>
    </div>
  );
}
