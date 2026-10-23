import { useId, useState } from "react";
import { ArrowRight, BookOpen, Plus } from "lucide-react";
import { Reveal, SectionHeading } from "./landingParts";
import { useWaitlistModal } from "./WaitlistModalContext";

const FAQS = [
  {
    question: "Which AWS services does Hoppycloud support?",
    answer:
      "You can create and manage EC2 servers, S3 buckets, RDS databases, Lambda functions and API Gateway APIs, plus VPC networking, IAM users and CloudWatch alarms. The resource list also shows DynamoDB tables, ElastiCache clusters, ECS services, OpenSearch domains, SageMaker endpoints and load balancers, which you manage in the AWS console.",
  },
  {
    question: "What permissions does Hoppycloud need?",
    answer:
      "The CloudFormation stack creates an IAM role with access to the services Hoppycloud manages, plus AWS's read-only ViewOnlyAccess policy so it can list your resources. A second, smaller role lets start/stop schedules run. The setup guide lists every permission.",
  },
  {
    question: "How current is the cost data?",
    answer:
      "Spend comes from AWS Cost Explorer, which Hoppycloud refreshes once a day, and AWS's own data runs about a day behind. Per-resource figures are estimates based on AWS's public prices, so they won't match your invoice exactly.",
  },
  {
    question: "What can Hoppycloud change in my account?",
    answer:
      "Only what you ask it to, such as starting a server, uploading a file or changing a setting. Start/stop schedules you create also run on their own. Deleting a server, bucket, database or function asks you to type its name first.",
  },
  {
    question: "How long does setup take?",
    answer:
      "Connecting takes one CloudFormation stack in your AWS console. Once the role is in place, Hoppycloud scans every enabled region of your account; accounts with more resources take longer.",
  },
  {
    question: "Can I connect more than one AWS account?",
    answer: "Yes. Connect each AWS account with its own Hoppycloud role, and Hoppycloud shows the resources and costs from all of them.",
  },
  {
    question: "What happens when I disconnect?",
    answer:
      "Delete the Hoppycloud stack (or the role, if you created it by hand), or deactivate the access key. Hoppycloud can no longer access your account, and your resources stay as they are. Start/stop schedules you created live in your account's EventBridge Scheduler, so remove them there if you no longer need them.",
  },
];

/** Objections, answered plainly. An accessible accordion: buttons own their panels via aria-controls. */
export default function FAQSection() {
  const { openModal } = useWaitlistModal();
  const [open, setOpen] = useState(0);
  const baseId = useId();

  return (
    <section id="faq" aria-labelledby="faq-title" className="px-6 py-20 sm:py-28 md:px-10">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="flex flex-col gap-8">
          <SectionHeading
            id="faq-title"
            title="Cloud questions,"
            accent="cleared up."
            lead="Supported services, permissions, cost data and disconnecting."
          />
          <Reveal>
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <span className="flex size-10 items-center justify-center rounded-xl bg-brand-500/15">
                <BookOpen className="size-5 text-brand-300" aria-hidden />
              </span>
              <p className="mt-5 font-semibold">Still have a question?</p>
              <p className="mt-1 text-sm text-white/55">Join the waitlist and we'll walk you through connecting your first AWS account personally.</p>
              <button type="button" onClick={openModal} className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-brand-300 hover:text-brand-200 sm:min-h-0">
                Join the waitlist <ArrowRight className="size-3.5" aria-hidden />
              </button>
            </div>
          </Reveal>
        </div>

        <div className="flex flex-col divide-y divide-white/10 border-y border-white/10">
          {FAQS.map((faq, i) => {
            const isOpen = open === i;
            const buttonId = `${baseId}-q${i}`;
            const panelId = `${baseId}-a${i}`;
            return (
              <div key={faq.question}>
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left text-lg font-medium transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
                  >
                    {faq.question}
                    <span className={`flex size-8 shrink-0 items-center justify-center rounded-full border transition-transform duration-300 motion-reduce:transition-none ${isOpen ? "rotate-45 border-brand-400/50 bg-brand-500/15" : "border-white/15"}`}>
                      <Plus className="size-4" aria-hidden />
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={`grid transition-all duration-300 motion-reduce:transition-none ${isOpen ? "grid-rows-[1fr] pb-6 opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                >
                  <p className="overflow-hidden pr-12 leading-relaxed text-white/60">{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
