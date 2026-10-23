import { useEffect, useRef } from "react";
import ScrollReveal from "./ScrollReveal";

const PARAGRAPHS = [
  "As your cloud grows, complexity shouldn't grow with it.",
  "Hoppycloud discovers the resources across your AWS accounts, helps you organize them into groups and manage them, and shows what they cost.",
];

/** Dim and blurred (unread) → blue (reading) → white (read), the same sweep Framer's scroll-scrubbed copy uses. */
const DIM: [number, number, number] = [71, 85, 105];
/** Tailwind blue-400: bright enough to read clearly on black while a word is "being read". */
const MID: [number, number, number] = [96, 165, 250];
const BRIGHT: [number, number, number] = [255, 255, 255];
/** How wide the transition band is, in scroll-progress units — a cluster of words is blue together. */
const REVEAL_WINDOW = 0.2;
/** Blur on words that haven't appeared yet, in px; it clears as they turn blue. */
const MAX_BLUR = 6;
/** Each word's transition: dim → blue over [0, TO_BLUE], holds blue until FROM_BLUE, then fades to white. */
const TO_BLUE = 0.35;
const FROM_BLUE = 0.7;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function mixColor(c1: [number, number, number], c2: [number, number, number], t: number) {
  return `rgb(${Math.round(lerp(c1[0], c2[0], t))}, ${Math.round(lerp(c1[1], c2[1], t))}, ${Math.round(lerp(c1[2], c2[2], t))})`;
}

export default function GrowthStatement() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const paragraphs = PARAGRAPHS.map((p) => p.split(" "));
  const totalWords = paragraphs.reduce((sum, words) => sum + words.length, 0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the section enters the bottom of the viewport, 1 shortly after its top starts
      // scrolling past the viewport top — the sweep finishes while the block is still fully visible,
      // not right as it enters and not after it's scrolled away.
      const progress = Math.min(1, Math.max(0, (vh - rect.top) / (rect.height * 1.1)));

      // Thresholds are packed into [REVEAL_WINDOW, 1 - REVEAL_WINDOW] so the first word's transition
      // starts right at progress 0 and the last word's finishes right at progress 1 — otherwise the
      // tail end of the text would still be mid-fade once the section has fully scrolled past.
      const span = 1 - 2 * REVEAL_WINDOW;
      for (let i = 0; i < totalWords; i++) {
        const el = wordRefs.current[i];
        if (!el) continue;
        const threshold = REVEAL_WINDOW + (totalWords > 1 ? (i / (totalWords - 1)) * span : 0);
        const local = Math.min(1, Math.max(0, (progress - (threshold - REVEAL_WINDOW)) / (REVEAL_WINDOW * 2)));

        if (local < TO_BLUE) {
          const t = local / TO_BLUE;
          el.style.color = mixColor(DIM, MID, t);
          el.style.opacity = String(lerp(0.3, 1, t));
          el.style.filter = `blur(${(lerp(MAX_BLUR, 0, t)).toFixed(2)}px)`;
        } else if (local < FROM_BLUE) {
          el.style.color = `rgb(${MID.join(",")})`;
          el.style.opacity = "1";
          el.style.filter = "none";
        } else {
          const t = (local - FROM_BLUE) / (1 - FROM_BLUE);
          el.style.color = mixColor(MID, BRIGHT, t);
          el.style.opacity = "1";
          el.style.filter = "none";
        }
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [totalWords]);

  let wordIndex = -1;

  return (
    <section ref={sectionRef} className="px-6 py-20 sm:py-28 md:px-10">
      <ScrollReveal enableOpacity={false} baseRotation={0} enableBlur={false}>
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 text-left font-sans text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl sm:leading-[1.08] lg:w-2/3 lg:text-[56px]">
          {paragraphs.map((words, pIdx) => (
            <p key={pIdx}>
              {words.map((word, i) => {
                wordIndex += 1;
                const idx = wordIndex;
                return (
                  <span key={i}>
                    <span
                      ref={(el) => void (wordRefs.current[idx] = el)}
                      className="word"
                      style={{ opacity: 0.3, color: `rgb(${DIM.join(",")})`, filter: `blur(${MAX_BLUR}px)` }}
                    >
                      {word}
                    </span>{" "}
                  </span>
                );
              })}
            </p>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
