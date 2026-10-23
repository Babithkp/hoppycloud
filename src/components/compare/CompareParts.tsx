import { AlertTriangle, Check, Info, Lightbulb, Minus } from "lucide-react";

/* Trimmed down from the product's docs building blocks — just what the two comparison pages need. */

export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-2xl font-semibold tracking-tight text-white">{title}</h2>
      <div className="flex flex-col gap-4 text-[15px] leading-relaxed text-white/65">{children}</div>
    </section>
  );
}

export function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-semibold text-white">{title}</h3>
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
}

/** A real screen from Hoppycloud, framed like the landing page's screenshots. */
export function Figure({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return (
    <figure className="flex flex-col gap-2">
      <div className="overflow-hidden rounded-xl border border-white/10 bg-[#07080b] p-2 shadow-[0_20px_60px_-25px_rgba(1,42,110,0.45)]">
        <img src={src} alt={alt} loading="lazy" className="block w-full rounded-lg" />
      </div>
      <figcaption className="text-xs text-white/40">{caption}</figcaption>
    </figure>
  );
}

const CALLOUT = {
  info: { icon: Info, box: "border-brand-400/30 bg-brand-500/[0.07]", tone: "text-brand-300" },
  tip: { icon: Lightbulb, box: "border-emerald-400/30 bg-emerald-500/[0.07]", tone: "text-emerald-300" },
  warn: { icon: AlertTriangle, box: "border-amber-400/30 bg-amber-500/[0.07]", tone: "text-amber-300" },
} as const;

export function Callout({ kind, title, children }: { kind: keyof typeof CALLOUT; title?: string; children: React.ReactNode }) {
  const c = CALLOUT[kind];
  return (
    <div className={`flex gap-3 rounded-xl border p-4 text-sm leading-relaxed ${c.box}`}>
      <c.icon className={`mt-0.5 size-4 shrink-0 ${c.tone}`} aria-hidden />
      <div className="text-white/70">
        {title && <p className="mb-1 font-semibold text-white">{title}</p>}
        {children}
      </div>
    </div>
  );
}

export const B = ({ children }: { children: React.ReactNode }) => <strong className="font-semibold text-white">{children}</strong>;

export function CheckList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="flex flex-col gap-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="mt-1 flex size-4 shrink-0 items-center justify-center rounded-full bg-brand-500/15">
            <Check className="size-2.5 text-brand-300" aria-hidden />
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Side-by-side comparison. Each cell is text, or `true`/`false` for a plain yes/no mark. */
export function CompareTable({ columns, rows }: { columns: [string, string, string]; rows: { label: string; them: React.ReactNode; us: React.ReactNode }[] }) {
  const cell = (v: React.ReactNode) =>
    v === true ? <Check className="size-4 text-emerald-300" aria-label="Yes" /> : v === false ? <Minus className="size-4 text-white/30" aria-label="No" /> : v;
  return (
    <>
      {/* Phones: one card per row, both answers stacked, so neither column is off-screen. */}
      <dl className="flex flex-col gap-3 sm:hidden">
        {rows.map((r) => (
          <div key={r.label} className="overflow-hidden rounded-xl border border-white/10 text-sm">
            <dt className="border-b border-white/10 bg-white/[0.03] px-4 py-2.5 font-medium text-white">{r.label}</dt>
            <dd className="px-4 py-2.5 text-white/55">
              <span className="mb-0.5 block text-xs font-medium uppercase tracking-wide text-white/35">{columns[1]}</span>
              {cell(r.them)}
            </dd>
            <dd className="border-t border-white/[0.06] bg-brand-500/[0.05] px-4 py-2.5 text-white/80">
              <span className="mb-0.5 block text-xs font-medium uppercase tracking-wide text-brand-300/80">{columns[2]}</span>
              {cell(r.us)}
            </dd>
          </div>
        ))}
      </dl>
      <div className="hidden overflow-x-auto rounded-xl border border-white/10 sm:block">
        <table className="w-full min-w-[560px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.03] text-white">
              <th scope="col" className="w-[26%] px-4 py-3 font-semibold">
                {columns[0]}
              </th>
              <th scope="col" className="w-[37%] px-4 py-3 font-semibold">
                {columns[1]}
              </th>
              <th scope="col" className="w-[37%] bg-brand-500/[0.06] px-4 py-3 font-semibold text-brand-200">
                {columns[2]}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.label} className="border-b border-white/[0.06] align-top last:border-0">
                <th scope="row" className="px-4 py-3 font-medium text-white/85">
                  {r.label}
                </th>
                <td className="px-4 py-3 text-white/55">{cell(r.them)}</td>
                <td className="bg-brand-500/[0.04] px-4 py-3 text-white/75">{cell(r.us)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
