import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

const WEB3FORMS_ACCESS_KEY = "debf4974-6afd-4f0b-b921-bbcc4de4f809";

type Status = "idle" | "submitting" | "done" | "error";

/** Captures an email address and sends it straight to Hoppycloud's inbox via Web3Forms — no backend of our own. */
export default function WaitlistForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "submitting" || status === "done") return;
    setStatus("submitting");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: "New Hoppycloud waitlist signup",
          from_name: "Hoppycloud waitlist",
          email,
        }),
      });
      const data = await res.json();
      if (data.success) setStatus("done");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <div className={`flex items-center gap-2 text-emerald-400 ${compact ? "text-sm" : "text-base"}`}>
        <Check className="size-5 shrink-0" aria-hidden />
        <span>You're on the list — we'll email you when Hoppycloud is ready.</span>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className={`flex w-full flex-col gap-3 ${compact ? "" : "sm:flex-row sm:items-start"}`}>
      <div className="flex-1">
        <label htmlFor="waitlist-email" className="sr-only">
          Email address
        </label>
        <input
          id="waitlist-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          className={`min-h-12 w-full rounded-xl border border-white/15 bg-white/5 px-4 text-sm text-white placeholder:text-white/40 outline-none ring-0 transition-colors focus:border-brand-400/60 ${compact ? "" : "sm:min-h-0 sm:py-3"}`}
        />
      </div>
      <button
        type="submit"
        disabled={status === "submitting"}
        className={`inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#012a6e] px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60 ${compact ? "" : "sm:w-auto sm:min-h-0"}`}
      >
        {status === "submitting" ? "Hop the waitlist…" : "Join the waitlist"}
        {status !== "submitting" && <ArrowRight className="size-4" aria-hidden />}
      </button>
      {status === "error" && <p className="text-sm text-red-400 sm:absolute sm:mt-14">Couldn't submit — try again in a moment.</p>}
    </form>
  );
}
