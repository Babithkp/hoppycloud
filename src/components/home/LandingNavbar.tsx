import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { ChevronDown, Menu, X } from "lucide-react";
import { useWaitlistModal } from "./WaitlistModalContext";

/** Menu rows slide down into place one after another as the menu opens, and fade out together as it closes. */
const menuItem = (open: boolean) =>
  `transition-[transform,opacity] duration-300 ease-out motion-reduce:transition-none ${open ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"}`;

const LINKS: { label: string; href: string }[] = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "FAQ", href: "#faq" },
];

const COMPARE_LINKS: { label: string; href: string }[] = [
  { label: "vs AWS Console", href: "/vs-console" },
  { label: "vs IaC", href: "/vs-iac" },
];

export default function LandingNavbar() {
  const { openModal } = useWaitlistModal();
  // Below lg the links live in a drop-down menu opened from the menu button.
  const [menuOpen, setMenuOpen] = useState(false);
  // The "Compare" nav item's own dropdown (desktop only — on mobile its links are just listed inline).
  const [compareOpen, setCompareOpen] = useState(false);
  const compareRef = useRef<HTMLLIElement>(null);
  // Transparent over the hero at the very top; a dark, blurred bar once the page has scrolled. Stays visible
  // (never slides away) at every scroll depth and direction.
  const [scrolled, setScrolled] = useState(() => typeof window !== "undefined" && window.scrollY > 8);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    // The menu is for small screens: close it if the window grows past lg.
    const wide = window.matchMedia("(min-width: 1024px)");
    const onWide = () => wide.matches && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    wide.addEventListener("change", onWide);
    return () => {
      window.removeEventListener("keydown", onKey);
      wide.removeEventListener("change", onWide);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!compareOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setCompareOpen(false);
    const onClick = (e: MouseEvent) => {
      if (compareRef.current && !compareRef.current.contains(e.target as Node)) setCompareOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [compareOpen]);

  const close = () => setMenuOpen(false);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-6">
      <div
        className={`mx-auto max-w-5xl rounded-[22px] border px-5 backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-300 ${
          menuOpen
            ? "border-white/10 bg-[#05060a]"
            : scrolled
              ? "border-white/10 bg-white/[0.04] shadow-[0_20px_60px_-30px_rgba(0,0,0,0.9)]"
              : "border-transparent bg-transparent"
        }`}
      >
        <div className="flex h-16 flex-1 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src="/hoppycloud-lockup-32.svg" alt="Hoppycloud" className="h-8 w-auto" />
          </Link>

          <ul className="hidden items-center gap-8 text-sm text-subHeadingColor lg:flex">
            {LINKS.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="transition-colors hover:text-white">
                  {l.label}
                </a>
              </li>
            ))}
            <li
              ref={compareRef}
              className="relative"
              onMouseEnter={() => setCompareOpen(true)}
              onMouseLeave={() => setCompareOpen(false)}
            >
              <button
                type="button"
                onClick={() => setCompareOpen((o) => !o)}
                aria-expanded={compareOpen}
                aria-haspopup="true"
                className="flex items-center gap-1 transition-colors hover:text-white"
              >
                Compare
                <ChevronDown className={`size-3.5 transition-transform duration-200 ${compareOpen ? "rotate-180" : ""}`} aria-hidden />
              </button>
              <div
                className={`absolute left-1/2 top-full z-10 mt-3 w-48 -translate-x-1/2 rounded-xl border border-white/10 bg-[#0b0c10] p-1.5 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.9)] transition-[opacity,transform] duration-150 ${
                  compareOpen ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0"
                }`}
              >
                {COMPARE_LINKS.map((l) => (
                  <Link
                    key={l.label}
                    to={l.href}
                    onClick={() => setCompareOpen(false)}
                    className="block rounded-lg px-3 py-2 text-sm text-white/70 hover:bg-white/[0.06] hover:text-white"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </li>
          </ul>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={openModal}
              className="inline-flex min-h-10 items-center rounded-xl bg-[#012a6e] px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 sm:min-h-0"
            >
              Join waitlist
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-expanded={menuOpen}
              aria-controls="landing-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="-mr-2 flex size-10 items-center justify-center rounded-full text-white hover:bg-white/10 lg:hidden"
            >
              {/* ☰ turns into ✕: the two icons cross-fade with a quarter turn. */}
              <span className="relative size-5" aria-hidden>
                <Menu
                  className={`absolute inset-0 size-5 transition-[transform,opacity] duration-300 motion-reduce:transition-none ${menuOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"}`}
                />
                <X
                  className={`absolute inset-0 size-5 transition-[transform,opacity] duration-300 motion-reduce:transition-none ${menuOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"}`}
                />
              </span>
            </button>
          </div>
        </div>

        {/* Always mounted so it can animate both ways: the grid row grows from 0fr to 1fr (a height transition that needs
            no measuring), and `invisible` once closed keeps the links out of the tab order and away from screen readers. */}
        <div
          id="landing-menu"
          className={`grid w-full transition-[grid-template-rows,opacity,visibility] duration-300 ease-out motion-reduce:transition-none lg:hidden ${
            menuOpen ? "visible grid-rows-[1fr] opacity-100" : "invisible grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="min-h-0 overflow-hidden">
            <ul className="flex flex-col border-t border-white/10 pb-4 pt-2">
              {LINKS.map((l, i) => (
                <li key={l.label} className={menuItem(menuOpen)} style={{ transitionDelay: menuOpen ? `${60 + i * 35}ms` : "0ms" }}>
                  <a href={l.href} onClick={close} className="flex min-h-12 items-center text-base text-white/80 hover:text-white">
                    {l.label}
                  </a>
                </li>
              ))}
              <li className={menuItem(menuOpen)} style={{ transitionDelay: menuOpen ? `${60 + LINKS.length * 35}ms` : "0ms" }}>
                <p className="flex min-h-12 items-center text-base text-white/40">Compare</p>
                <ul className="flex flex-col pl-4">
                  {COMPARE_LINKS.map((l) => (
                    <li key={l.label}>
                      <Link to={l.href} onClick={close} className="flex min-h-11 items-center text-base text-white/80 hover:text-white">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
