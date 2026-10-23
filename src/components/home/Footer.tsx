import { Link } from "react-router";
import { useWaitlistModal } from "./WaitlistModalContext";

const COLUMNS: { title: string; links: { label: string; href: string; internal?: boolean }[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "How it works", href: "#how-it-works" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    title: "Compare",
    links: [
      { label: "Hoppycloud vs IaC", href: "/vs-iac", internal: true },
      { label: "Hoppycloud vs Console", href: "/vs-console", internal: true },
    ],
  },
];

export default function Footer() {
  const { openModal } = useWaitlistModal();
  const linkClass = "inline-flex min-h-11 items-center text-white/50 transition-colors sm:min-h-0 hover:text-white focus-visible:text-white focus-visible:outline-none";
  return (
    <footer className="border-t border-white/10 bg-[radial-gradient(ellipse_90%_120%_at_50%_100%,#0b3c6b_0%,#001833_45%,#000000_100%)] px-6 pt-16 md:px-10">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div className="col-span-2 md:col-span-1">
          <Link to="/">
            <img src="/hoppycloud-lockup-32.svg" alt="Hoppycloud" className="h-7 w-auto" />
          </Link>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/50">Discover, organize and manage what you run on AWS, and see what it costs.</p>
        </div>
        {COLUMNS.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <p className="text-sm font-semibold">{col.title}</p>
            <ul className="mt-2 flex flex-col text-sm sm:mt-4 sm:gap-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  {l.internal ? (
                    <Link to={l.href} className={linkClass}>
                      {l.label}
                    </Link>
                  ) : (
                    <a href={l.href} className={linkClass}>
                      {l.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        ))}
        <nav aria-label="Get started">
          <p className="text-sm font-semibold">Get started</p>
          <ul className="mt-2 flex flex-col text-sm sm:mt-4 sm:gap-2.5">
            <li>
              <button type="button" onClick={openModal} className={linkClass}>
                Join waitlist
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <div className="mx-auto mt-14 flex max-w-6xl flex-col gap-2 border-t border-white/10 py-6 text-xs text-white/40 sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} Hoppycloud</p>
        <p>AWS and related marks are trademarks of Amazon.com, Inc. Hoppycloud isn't affiliated with Amazon Web Services.</p>
      </div>
    </footer>
  );
}
