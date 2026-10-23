import ComparePageLayout from "./ComparePageLayout";
import { B, Callout, CheckList, CompareTable, Section, SubSection } from "./CompareParts";

export default function VsIacPage() {
  return (
    <ComparePageLayout
      title="Hoppycloud vs infrastructure as code"
      lead="IaC and Hoppycloud do different jobs. One rebuilds the same environment from code; the other shows you everything that's actually running right now, however it got there."
    >
      <Section title="Different jobs">
        <p>
          <B>Infrastructure as code</B> (IaC) — Terraform, OpenTofu, Pulumi, CloudFormation, CDK — describes the infrastructure you want in files. You review changes like code,
          apply them, and the tool records what it created in a state file. It's excellent for building the same environment again and again, with every change reviewed.
        </p>
        <p>
          <B>Hoppycloud</B> starts from the other end: what actually exists in your AWS account right now. It shows all of it — however it was created — with costs and problems,
          and lets you operate and change it from a UI, without writing code.
        </p>
        <p>Many teams need both: code for the core they rebuild often, and a clear view of everything that's really running.</p>
      </Section>

      <Section title="Side by side">
        <CompareTable
          columns={["", "Infrastructure as code", "Hoppycloud"]}
          rows={[
            { label: "Source of truth", them: "Your code and the tool's state file", us: "Your AWS account itself, read live" },
            { label: "Sees resources created outside it", them: "No — only what's in its state", us: "Yes — everything in every enabled region" },
            { label: "Drift", them: "Code, state and reality can disagree until the next plan", us: "No separate state, so nothing to drift" },
            { label: "Getting started", them: "Learn the tool and its language, set up state storage and pipelines", us: "Connect your account — about 5 minutes" },
            { label: "Reviewing changes", them: "Pull requests and plans before anything changes", us: "Each change is one action you confirm; recorded in CloudTrail under your Hoppycloud user" },
            { label: "Rebuilding an environment", them: "Yes — its main strength", us: "Not what it's built for" },
            { label: "Day-to-day operations", them: "Not its job (restarts, logs, files, snapshots)", us: "Built in" },
            { label: "Costs", them: "Needs separate tools", us: "Estimate per resource, spend, forecast and budget" },
            { label: "Risky settings", them: "Needs separate policy or scanning tools", us: "Checked across the account, with what to do" },
          ]}
        />
      </Section>

      <Section title="Using both together">
        <SubSection title="Hoppycloud sees IaC resources too">
          <p>
            Hoppycloud reads your account, so resources your IaC created show up like any other — with their costs, metrics and warnings. Nothing to import, and nothing changes in
            your code or state.
          </p>
        </SubSection>
        <SubSection title="Changing IaC-managed resources">
          <p>
            If you change a setting in Hoppycloud on a resource your code manages, your IaC tool will see the difference on its next plan and try to put it back. Hoppycloud never
            reverts it the other way: it always shows what's in AWS.
          </p>
          <Callout kind="tip" title="A simple rule">
            For resources managed in code, use Hoppycloud to look, operate and investigate — restart, read logs, browse files, check costs — and make lasting setting changes in
            code. For everything else, change it in Hoppycloud.
          </Callout>
        </SubSection>
      </Section>

      <Section title="Which one when">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
            <p className="mb-3 font-semibold text-white">Reach for IaC when…</p>
            <CheckList
              items={["You rebuild the same environment often (per customer, per region, per branch).", "Every change must go through code review.", "You have people to maintain the code, state and pipelines."]}
            />
          </div>
          <div className="rounded-2xl border border-brand-400/30 bg-brand-500/[0.05] p-5">
            <p className="mb-3 font-semibold text-white">Reach for Hoppycloud when…</p>
            <CheckList
              items={[
                "You need to know what's running and what it costs — including what's not in code.",
                "You're operating day to day: restarts, files, logs, schedules.",
                "Your team doesn't have a dedicated platform engineer.",
              ]}
            />
          </div>
        </div>
        <p>
          Want to see this on your own account?{" "}
          <a href="/#waitlist" className="text-brand-300 hover:text-brand-200">
            Join the waitlist
          </a>
          .
        </p>
      </Section>
    </ComparePageLayout>
  );
}
