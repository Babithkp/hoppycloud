import { AlertTriangle, ArrowRight, Bell, Check, ChevronRight, Database, HardDrive, Info, Server, Waypoints, Zap, type LucideIcon } from "lucide-react";
import { MockWindow, Reveal, SectionHeading } from "./landingParts";

/* ---------- Small pieces the mocks share ---------- */

const TONE = {
  ec2: "bg-orange-500",
  s3: "bg-green-600",
  rds: "bg-brand-600",
  lambda: "bg-red-600",
  api: "bg-violet-600",
} as const;

function Chip({ tone, icon: Icon }: { tone: keyof typeof TONE; icon: LucideIcon }) {
  return (
    <span className={`flex size-7 shrink-0 items-center justify-center rounded-lg text-white ${TONE[tone]}`}>
      <Icon className="size-3.5" />
    </span>
  );
}

function Dot({ tone = "ok" }: { tone?: "ok" | "off" | "warn" }) {
  const c = tone === "ok" ? "bg-emerald-400" : tone === "warn" ? "bg-amber-400" : "bg-white/30";
  return <span className={`inline-block size-1.5 rounded-full ${c}`} />;
}

/* ---------- Mocks ---------- */

function ResourcesMock() {
  const rows: { tone: keyof typeof TONE; icon: LucideIcon; name: string; type: string; state: string | null; dot: "ok" | "off"; cost: string }[] = [
    { tone: "ec2", icon: Server, name: "api-prod-1", type: "m5.large", state: "running", dot: "ok", cost: "$204.30" },
    { tone: "ec2", icon: Server, name: "worker-staging", type: "t3.medium", state: "stopped", dot: "off", cost: "$1.60" },
    { tone: "s3", icon: HardDrive, name: "syncloud-prod-assets", type: "214 GB · 1.2M objects", state: null, dot: "ok", cost: "$48.26" },
    { tone: "rds", icon: Database, name: "syncloud-prod-db", type: "db.r5.xlarge · PostgreSQL 15", state: "available", dot: "ok", cost: "$498.60" },
    { tone: "lambda", icon: Zap, name: "webhook-dispatcher", type: "node18 · 256 MB", state: "active", dot: "ok", cost: "$23.34" },
  ];
  return (
    <MockWindow title="Resources">
      <div className="mb-4 grid grid-cols-3 gap-2">
        {[
          ["Resources", "11"],
          ["Regions", "5"],
          ["Est. monthly", "$1,824"],
        ].map(([k, v]) => (
          <div key={k} className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-3">
            <p className="text-[11px] text-white/40">{k}</p>
            <p className="mt-1 text-lg font-semibold">{v}</p>
          </div>
        ))}
      </div>
      <div className="rounded-xl border border-white/[0.07]">
        <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-2.5 text-xs">
          <span className="font-semibold">🇺🇸 us-east-1</span>
          <span className="text-white/40">9 resources</span>
        </div>
        {rows.map((r) => (
          <div key={r.name} className="flex items-center gap-3 border-b border-white/[0.05] px-4 py-2.5 text-xs last:border-0">
            <Chip tone={r.tone} icon={r.icon} />
            <span className="min-w-0 flex-1 truncate font-medium">{r.name}</span>
            <span className="hidden w-28 truncate text-white/40 sm:block">{r.type}</span>
            <span className="flex w-20 items-center gap-1.5 text-white/60">
              {r.state ? (
                <>
                  <Dot tone={r.dot} /> {r.state}
                </>
              ) : (
                <span className="text-white/30">—</span>
              )}
            </span>
            <span className="w-16 text-right tabular-nums text-white/60">{r.cost}</span>
          </div>
        ))}
      </div>
    </MockWindow>
  );
}

function ManageMock() {
  return (
    <MockWindow title="api-prod-1 · EC2">
      <div className="flex items-start gap-3">
        <span className="flex size-11 items-center justify-center rounded-xl bg-orange-500 text-white">
          <Server className="size-5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-2 whitespace-nowrap font-semibold">
            api-prod-1 <span className="rounded-full bg-emerald-400/15 px-2 py-0.5 text-[10px] font-medium text-emerald-300">Running</span>
          </p>
          <p className="truncate text-xs text-white/40">EC2 instance · us-east-1</p>
        </div>
        <span className="hidden rounded-lg bg-white/10 px-3 py-1.5 text-xs sm:inline">Stop</span>
        <span className="rounded-lg bg-[#012a6e] px-3 py-1.5 text-xs font-medium">Actions</span>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="relative rounded-xl border border-white/[0.07] bg-white/[0.03] p-3">
          <p className="flex items-center gap-1 text-[11px] text-white/40">
            Instance type <Info className="size-3 text-brand-300" />
          </p>
          <p className="mt-1 font-semibold">m5.large</p>
          {/* The plain-English explainer that opens from every ⓘ */}
          <div className="absolute left-3 top-[calc(100%+8px)] z-10 w-64 rounded-xl border border-white/10 bg-[#15171d] p-3 text-xs shadow-2xl">
            <p className="font-semibold">Instance type</p>
            <p className="mt-1 leading-relaxed text-white/60">The server's size: how many CPUs and how much memory it has. Bigger types cost more.</p>
            <p className="mt-2 rounded-md bg-brand-400/10 px-2 py-1.5 text-brand-200">You can change it later — the server restarts to apply it.</p>
          </div>
        </div>
        <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-3">
          <p className="text-[11px] text-white/40">Uptime</p>
          <p className="mt-1 font-semibold">14 days</p>
        </div>
      </div>

      <div className="mt-40 overflow-hidden rounded-xl border border-white/[0.07] text-xs">
        {["Reboot instance", "Connect (SSH)", "Modify instance type", "Create disk snapshot"].map((a) => (
          <div key={a} className="flex items-center justify-between border-b border-white/[0.05] px-4 py-2.5 last:border-0">
            {a} <ChevronRight className="size-3.5 text-white/30" />
          </div>
        ))}
      </div>
    </MockWindow>
  );
}

function CostMock() {
  const parts = [
    { label: "EC2", amount: "$1,031.74", pct: 47, tone: "bg-orange-500" },
    { label: "RDS", amount: "$838.99", pct: 38, tone: "bg-brand-500" },
    { label: "S3", amount: "$152.46", pct: 7, tone: "bg-green-500" },
    { label: "Lambda", amount: "$113.14", pct: 5, tone: "bg-red-500" },
  ];
  return (
    <MockWindow title="Cost">
      <div className="rounded-xl border border-brand-400/25 bg-brand-500/[0.08] p-4">
        <div className="flex items-baseline justify-between text-xs">
          <span className="font-medium text-brand-300">Cost incurred this month</span>
          <span className="text-white/40">Month to date</span>
        </div>
        <p className="mt-2 text-4xl font-semibold tracking-tight">$2,202.00</p>
        <div className="mt-4 flex h-2 overflow-hidden rounded-full bg-white/10">
          {parts.map((p) => (
            <span key={p.label} className={p.tone} style={{ width: `${p.pct}%` }} />
          ))}
        </div>
        <div className="mt-3 flex justify-between border-t border-white/10 pt-3 text-xs text-white/50">
          <span>Monthly estimate</span>
          <span>$2,598.36 · ≈ $183.50/day</span>
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-2.5 text-xs">
        {parts.map((p) => (
          <div key={p.label} className="flex items-center gap-3">
            <span className={`size-2.5 rounded-sm ${p.tone}`} />
            <span className="flex-1 text-white/70">{p.label}</span>
            <span className="tabular-nums">{p.amount}</span>
            <span className="w-9 text-right tabular-nums text-white/40">{p.pct}%</span>
          </div>
        ))}
      </div>
    </MockWindow>
  );
}

function CanvasMock() {
  const node = (tone: keyof typeof TONE, icon: LucideIcon, label: string, sub: string) => (
    <div className="flex w-[5.5rem] flex-col gap-2 rounded-xl border border-white/10 bg-[#11131a] p-2 sm:w-28 sm:p-2.5">
      <div className="flex items-center gap-2">
        <Chip tone={tone} icon={icon} />
        <span className="text-xs font-semibold">{label}</span>
      </div>
      <span className="truncate rounded-md bg-white/5 px-2 py-1 text-[10px] text-white/60">{sub}</span>
    </div>
  );
  // Arrows drop out on phones so the three columns fit.
  const arrow = <ArrowRight className="hidden size-4 shrink-0 text-white/30 sm:block" />;
  return (
    <MockWindow title="Groups · API Platform">
      <div className="rounded-2xl border-2 border-dashed border-white/10 bg-[radial-gradient(circle,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[length:14px_14px] p-3 sm:p-4">
        <p className="mb-3 flex items-center gap-2 text-xs font-semibold">
          🇺🇸 N. Virginia <span className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[10px] font-normal text-white/50">us-east-1</span>
          <span className="font-normal text-white/40">· 6 resources</span>
        </p>
        <div className="flex items-center justify-between gap-1.5 sm:gap-2">
          {node("api", Waypoints, "API", "syncloud-public-api")}
          {arrow}
          <div className="flex flex-col gap-2">
            {node("ec2", Server, "EC2", "api-prod-1, 2")}
            {node("lambda", Zap, "Lambda", "webhook-dispatcher")}
          </div>
          {arrow}
          <div className="flex flex-col gap-2">
            {node("rds", Database, "RDS", "syncloud-prod-db")}
            {node("s3", HardDrive, "S3", "prod-assets")}
          </div>
        </div>
      </div>
    </MockWindow>
  );
}

function AlertsMock() {
  const items: { icon: LucideIcon; tone: string; title: string; detail: string; action: string }[] = [
    { icon: AlertTriangle, tone: "text-red-400", title: "Deletion protection is off on syncloud-prod-db", detail: "A single accidental delete call could remove this database.", action: "Fix" },
    { icon: Bell, tone: "text-amber-300", title: "Low free storage on syncloud-prod-db", detail: "Alarm firing — free storage space below 20%.", action: "View" },
    { icon: AlertTriangle, tone: "text-amber-300", title: "Unattached EBS volume still billing", detail: "worker-staging-data: 20 GB gp3, unattached for 14 days.", action: "Review" },
  ];
  return (
    <MockWindow title="Needs attention">
      <div className="flex flex-col gap-2.5">
        {items.map(({ icon: Icon, tone, title, detail, action }) => (
          <div key={title} className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.03] p-3.5">
            <Icon className={`size-4 shrink-0 ${tone}`} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{title}</p>
              <p className="truncate text-xs text-white/45">{detail}</p>
            </div>
            <span className="rounded-lg border border-white/10 px-2.5 py-1 text-xs">{action}</span>
          </div>
        ))}
      </div>
    </MockWindow>
  );
}

/* ---------- Section ---------- */

const FEATURES: { title: string; text: string; points: string[]; mock: React.ReactNode }[] = [
  {
    title: "Every region, one resource list.",
    text: "Hoppycloud scans each enabled region of your AWS accounts for servers, buckets, databases, functions and other supported resources. Each one shows its status and estimated monthly cost.",
    points: ["Grouped by region, filterable by service and status", "Stopped servers and unattached disks flagged", "Rescan whenever you want fresh results"],
    mock: <ResourcesMock />,
  },
  {
    title: "One page for each resource.",
    text: "Each supported resource has a page with its settings, metrics, the actions you can take and how it connects to the rest of your network. AWS terms come with a short plain-English explanation.",
    points: ["Start, stop, reboot, resize and snapshot EC2 servers", "See a server's VPC, subnets and what can reach it", "Browse, upload and download files in S3 buckets"],
    mock: <ManageMock />,
  },
  {
    title: "See where your AWS spend goes.",
    text: "Hoppycloud shows your month-to-date spend from AWS Cost Explorer, broken down by service and region, with a forecast for the month. Each resource also shows an estimated monthly cost based on AWS prices.",
    points: ["Spend by service and region, refreshed daily", "Estimated monthly cost for each resource", "A monthly budget, with a warning at 80%"],
    mock: <CostMock />,
  },
  {
    title: "Organize resources by project.",
    text: "Put the resources behind one project or workload into a group. Its canvas lays them out by region, from the API at the front to the databases behind it.",
    points: ["Resources laid out by region and type", "Click a resource to see its details", "Status and estimated cost for the whole group"],
    mock: <CanvasMock />,
  },
  {
    title: "Spot risky settings early.",
    text: "Hoppycloud checks your resources for common problems, such as SSH open to the internet or a database without deletion protection, and explains each finding.",
    points: ["Open ports and public buckets flagged", "Firing CloudWatch alarms listed with your findings", "One-click fixes for some findings"],
    mock: <AlertsMock />,
  },
];

/** The solution, one capability at a time: copy on one side, a live mock of the product on the other, alternating. */
export default function FeatureShowcase() {
  return (
    <section id="features" aria-labelledby="features-title" className="landing-glow px-6 py-20 sm:py-28 md:px-10">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id="features-title"
          title="Find, organize and manage"
          accent="the AWS resources you run."
          lead="Built around the services most apps run on: EC2 servers, S3 buckets, RDS databases, Lambda functions and API Gateway APIs."
          center
        />

        <div className="mt-24 flex flex-col gap-28">
          {FEATURES.map((f, i) => (
            <div key={f.title} className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <Reveal className={i % 2 === 1 ? "lg:order-2" : ""}>
                <h3 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">{f.title}</h3>
                <p className="mt-4 text-lg leading-relaxed text-white/60">{f.text}</p>
                <ul className="mt-6 flex flex-col gap-3">
                  {f.points.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-white/80">
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-500/15">
                        <Check className="size-3 text-brand-300" aria-hidden />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={150} className={i % 2 === 1 ? "lg:order-1" : ""}>
                {f.mock}
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
