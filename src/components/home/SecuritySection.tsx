import { KeyRound, ListChecks, MousePointerClick, Unplug, type LucideIcon } from "lucide-react";
import { Reveal, SectionHeading } from "./landingParts";

const POINTS: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: KeyRound,
    title: "No AWS keys to share",
    text: "Hoppycloud assumes an IAM role that trusts it only with your account's unique External ID, and uses short-lived credentials for each session. If you connect with an access key instead, it's stored encrypted.",
  },
  {
    icon: ListChecks,
    title: "You control its permissions",
    text: "The role's policy lists the actions Hoppycloud can take, and the role can't change its own permissions. Review it before you create the stack, and edit it in IAM later.",
  },
  {
    icon: MousePointerClick,
    title: "Changes only when you act",
    text: "Hoppycloud changes your account only when you take an action, or when a schedule you created runs. Each change appears in your CloudTrail under your Hoppycloud user.",
  },
  {
    icon: Unplug,
    title: "Disconnect from AWS",
    text: "Delete the Hoppycloud CloudFormation stack, or deactivate the access key, and Hoppycloud can no longer reach your account. Your resources stay as they are.",
  },
];

/** Trust, from how the product actually works — no badges or claims Syncloud can't back up. */
export default function SecuritySection() {
  return (
    <section aria-labelledby="security-title" className="px-6 py-20 sm:py-28 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            id="security-title"
            title="Your account."
            accent="Your rules."
            lead="Hoppycloud works through an IAM role in your own AWS account, within the permissions that role grants. Your resources never leave your account."
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {POINTS.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 100}>
                <article className="h-full rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-emerald-400/10">
                    <Icon className="size-5 text-emerald-300" aria-hidden />
                  </span>
                  <h3 className="mt-5 font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">{text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
