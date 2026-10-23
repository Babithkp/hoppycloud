import ComparePageLayout from "./ComparePageLayout";
import { B, CheckList, CompareTable, Figure, Section } from "./CompareParts";

export default function VsConsolePage() {
  return (
    <ComparePageLayout
      title="Hoppycloud vs the AWS console"
      lead="The console shows everything, one service and one region at a time. Hoppycloud is built around what you actually need day to day: what's running, what it costs, and what needs attention."
    >
      <Section title="Side by side">
        <CompareTable
          columns={["", "AWS console", "Hoppycloud"]}
          rows={[
            { label: "Services covered", them: "Every AWS service and setting", us: "EC2, S3, RDS, Lambda and API Gateway, plus networking, CloudWatch and IAM; other services listed with costs" },
            { label: "Finding what you run", them: "One service and one region at a time", us: "Every region in one list" },
            { label: "Settings shown", them: "All of them, all at once", us: "Defaults, Common or Everything — you choose" },
            { label: "Explanations", them: "Links to documentation", us: "A plain-English ⓘ next to every AWS term" },
            { label: "Defaults when creating", them: "Varies by service and wizard", us: "Encrypted, private, SSH only from your IP, IMDSv2" },
            { label: "Costs", them: "In Billing and Cost Explorer, separate from the resources", us: "Next to every resource, plus spend, forecast and budget" },
            { label: "Problems flagged", them: "Spread across separate services you set up", us: "One Needs attention list, ranked by severity" },
            { label: "Who it's for", them: "People who know AWS well", us: "Teams who'd rather not need to" },
          ]}
        />
      </Section>

      <Section title="Finding what you run">
        <p>
          The console is organised by service, and each region is a separate view — a server in <code>eu-west-1</code> is invisible while you're looking at{" "}
          <code>us-east-1</code>. Hoppycloud scans every enabled region at once and groups everything by region, so forgotten resources can't hide.
        </p>
      </Section>

      <Section title="Changing things safely">
        <p>
          In the console, a server launch or bucket setup shows every option on one long page, and the quickest path isn't always the safe one. Hoppycloud starts at the
          essentials with safe values filled in, explains each term, and asks you to confirm anything destructive.
        </p>
        <Figure src="/landing/hero-manage.webp" alt="Hoppycloud's page for one EC2 server: state, uptime, monthly cost, connections and quick actions" caption="One page per resource, with its actions in one place" />
      </Section>

      <Section title="Seeing costs">
        <p>
          In the console, cost lives in Billing and Cost Explorer, organised by service — not next to the server or database that's costing you. Hoppycloud shows an estimated
          monthly cost on every resource, and what you've actually spent, by service and region.
        </p>
      </Section>

      <Section title="When to still use the console">
        <p>Hoppycloud doesn't replace the console for everything. Use the console for:</p>
        <CheckList
          items={[
            "Services Hoppycloud lists but doesn't manage yet, like DynamoDB or ECS.",
            "Rare settings outside what Hoppycloud offers for a service.",
            "Account-level setup: billing, AWS Organizations, support plans.",
          ]}
        />
        <p>
          Every resource in Hoppycloud has an <B>Open in AWS console</B> link that takes you straight to it, so switching is one click.
        </p>
      </Section>
    </ComparePageLayout>
  );
}
