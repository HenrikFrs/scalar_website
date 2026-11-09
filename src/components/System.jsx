import React from "react";
import { SectionHeader } from "./ui";
import { ArrowRight, Ban, Building2, Check, X } from "lucide-react";


const steps = [
  {
    category: "Infrastructure",
    label: "Building reliable sending infrastructure",
    illustration: "infrastructure",
    checklist: [
      "Dedicated sending domains with 25 inboxes each",
      "Enterprise-grade Microsoft Entra infrastructure",
      "Warmed 2 weeks before launch",
    ],
  },
  {
    category: "Targeting",
    label: "Mapping your entire market",
    illustration: "targeting",
    checklist: [
      "Broad company list pulled from multiple sources",
      "Every company analyzed to filter out bad fits",
      "Segmented into different personas for tailored messaging",
    ],
  },
  {
    category: "Messaging",
    label: "Scaling what the data proves",
    illustration: "messaging",
    checklist: [
      "Multiple variants run simultaneously",
      "Winning messages scale, losers get replaced",
      "Every message personalized for maximum relevance",
    ],
  },
  {
    category: "Reply Handling",
    label: "Turning replies into meetings",
    illustration: "reply",
    checklist: [
      "Every message read and answered by a real person",
      "Fast reply to every prospect while your offer is still fresh",
      "Value-driven follow-ups until we get a clear yes or no",
    ],
  },
];

// A labelled box in a diagram; `dim` is for the steps leading up to the result
const FlowNode = ({ label, dim = false, className = "", children }) => (
  <div
    className={`${dim ? "flow-node-dim" : "flow-node"} px-3 py-1.5 ${className}`}
  >
    {label && (
      <p className="font-mono text-[11px] leading-4 text-muted">{label}</p>
    )}
    <p className="text-[13px] leading-5 tracking-normal text-foreground">
      {children}
    </p>
  </div>
);

// A fixed-height box, so the connectors line up with the rows
const InfraNode = ({ label, dim = false, dashed = false, children }) => (
  <div
    className={`h-10 px-3 flex flex-col justify-center min-w-0 ${
      dim ? "flow-node-dim" : "flow-node"
    } ${dashed ? "border-dashed" : ""}`}
  >
    {label && (
      <p className="font-mono text-[11px] leading-[14px] text-muted truncate">
        {label}
      </p>
    )}
    <p
      className={`text-[12px] leading-4 tracking-normal truncate ${
        dim ? "text-muted" : "text-foreground"
      }`}
    >
      {children}
    </p>
  </div>
);

// One domain holds many inboxes, and one inbox sends a few messages.
// Rows are 40px with 8px gaps, so row centres sit at 20, 68, 116 and 164.
const InfraIllustration = () => (
  <div
    className="w-full max-w-[520px] grid grid-cols-[minmax(0,1fr)_20px_minmax(0,1.1fr)_20px_minmax(0,1fr)] items-center select-none"
    aria-hidden="true"
  >
    {/* Domain */}
    <InfraNode label="Domain · 25 inboxes">getyourbrand.com</InfraNode>

    <svg viewBox="0 0 20 184" className="w-5 h-[184px]">
      <path
        d="M10 92V164M10 68H20M10 116H20"
        className="fill-none stroke-foreground/25"
      />
      <path
        d="M10 164H20"
        strokeDasharray="3 3"
        className="fill-none stroke-foreground/25"
      />
      <path d="M0 92H10V20H20" className="fill-none stroke-brand/60" />
    </svg>

    {/* Inboxes on that domain */}
    <div className="flex flex-col gap-2 min-w-0">
      <InfraNode label="Inbox">anna@getyourbrand.com</InfraNode>
      <InfraNode label="Inbox" dim>ben@getyourbrand.com</InfraNode>
      <InfraNode label="Inbox" dim>clara@getyourbrand.com</InfraNode>
      <InfraNode dim dashed>+ 22 more inboxes</InfraNode>
    </div>

    <svg viewBox="0 0 20 184" className="w-5 h-[184px]">
      <path
        d="M0 20H20M10 20V116M10 68H20M10 116H20"
        className="fill-none stroke-brand/60"
      />
    </svg>

    {/* A few messages from one inbox */}
    <div className="flex flex-col gap-2 min-w-0">
      <InfraNode label="Sent 09:12">Halden Logistics</InfraNode>
      <InfraNode label="Sent 10:47">Corvane Systems</InfraNode>
      <InfraNode label="Sent 13:05">Northgate Supply</InfraNode>
      <span className="h-10" />
    </div>
  </div>
);

// Five rows in a four-row window, so the outer two fade at the edges
const prospects = [
  { company: "Brightpath Dental", status: "bad" },
  { company: "Halden Logistics", status: "fit" },
  { company: "Meridian Freight", status: "dnc" },
  { company: "Corvane Systems", status: "fit" },
  { company: "Lumen Café", status: "bad" },
];

const PROSPECT_TAGS = {
  fit: { icon: Check, label: "ICP fit", className: "text-brand" },
  bad: { icon: X, label: "Bad fit", className: "text-muted" },
  dnc: { icon: Ban, label: "Do not contact", className: "text-warn" },
};

const ProspectRow = ({ company, status }) => {
  const tag = PROSPECT_TAGS[status];
  const Icon = tag.icon;
  const rejected = status !== "fit";
  return (
    <div className="h-8 flex items-center justify-between gap-2 leading-4">
      <span
        className={`flex items-center gap-2 min-w-0 ${
          rejected ? "opacity-50" : ""
        }`}
      >
        <span className="flow-node-dim w-5 h-5 flex items-center justify-center flex-shrink-0">
          <Building2 size={10} className="text-muted" />
        </span>
        <span
          className={`text-[13px] tracking-normal truncate ${
            rejected ? "text-muted line-through" : "text-foreground"
          }`}
        >
          {company}
        </span>
      </span>
      <span
        className={`font-mono text-[12px] flex items-center gap-1 flex-shrink-0 ${tag.className}`}
      >
        <Icon size={10} />
        {tag.label}
      </span>
    </div>
  );
};

// Every company in the market gets checked against the ICP
const TargetingIllustration = () => (
  <div
    className="w-full max-w-[360px] flex flex-col gap-2 select-none"
    aria-hidden="true"
  >
    <FlowNode className="py-2">Analyzing every company</FlowNode>
    <div className="flow-node-dim fade-y h-[136px] overflow-hidden px-3 flex flex-col justify-center">
      {prospects.map(({ company, status }) => (
        <ProspectRow key={company} company={company} status={status} />
      ))}
    </div>
  </div>
);

const theses = [
  { angle: "Cost of manual ops", replyRate: "2.6%", status: "testing" },
  { angle: "Hiring signal", replyRate: "4.1%", status: "scaling" },
  { angle: "Competitor switch", replyRate: "0.4%", status: "replaced" },
  { angle: "Recent expansion", replyRate: "–", status: "new" },
];

const THESIS_TAGS = {
  scaling: { label: "Scaling", className: "text-brand" },
  testing: { label: "Testing", className: "text-warn" },
  replaced: { label: "Replaced", className: "text-muted" },
  new: { label: "New", className: "text-foreground" },
};

// Sequences run side by side: the winner scales, the loser is replaced
const MessagingIllustration = () => (
  <div className="w-full flex flex-col select-none" aria-hidden="true">
    <FlowNode dim className="w-fit mx-auto">
      Hand-written sequences
    </FlowNode>
    <span className="flow-line" />
    <FlowNode className="w-fit mx-auto">Scale the winner</FlowNode>
    <span className="flow-line" />
    <div className="fade-x flex justify-center gap-1.5 overflow-hidden">
      {theses.map(({ angle, replyRate, status }) => {
        const tag = THESIS_TAGS[status];
        const replaced = status === "replaced";
        return (
          <div
            key={angle}
            className={`${
              status === "scaling" ? "flow-node" : "flow-node-dim"
            } w-[130px] flex-shrink-0 px-2.5 py-2`}
          >
            <p
              className={`text-[12px] leading-5 tracking-normal truncate ${
                replaced ? "text-muted line-through" : "text-foreground"
              }`}
            >
              {angle}
            </p>
            <p className="mt-1 flex items-center justify-between gap-1 font-mono text-[12px] leading-5">
              <span className={replaced ? "text-muted" : "text-foreground"}>
                {replyRate}
              </span>
              <span className={tag.className}>{tag.label}</span>
            </p>
          </div>
        );
      })}
    </div>
  </div>
);

// One reply followed through to a booked meeting
const ReplyIllustration = () => (
  <div
    className="w-full max-w-[340px] flex flex-col select-none"
    aria-hidden="true"
  >
    <FlowNode dim label="Sarah · Halden Logistics">
      "Sounds interesting, what does it cost?"
    </FlowNode>
    <span className="flow-line" />
    <FlowNode dim label="Replied in 6 min">
      "Happy to walk you through it. Tue or Wed?"
    </FlowNode>
    <span className="flow-line" />
    <FlowNode label="Meeting booked">Intro call · Tue 10:00</FlowNode>
    <p className="mt-2 flex items-center justify-center gap-1.5 font-mono text-[11px] leading-4 text-muted">
      <span className="w-1 h-1 rounded-full bg-brand" />
      Follow-ups on day 2, 5 and 9
    </p>
  </div>
);

const illustrations = {
  infrastructure: InfraIllustration,
  targeting: TargetingIllustration,
  messaging: MessagingIllustration,
  reply: ReplyIllustration,
};

// Text on the page background beside its diagram, which is the only part in
// an outlined box. `flipped` swaps the sides on desktop, so rows alternate
const StepRow = ({ step, flipped }) => (
  <div
    className={`w-full max-w-[1100px] mx-auto grid grid-cols-1 gap-8 lg:gap-x-12 lg:items-center ${
      flipped
        ? "lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)]"
        : "lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)]"
    }`}
  >
    <div
      className={`flex flex-col gap-3 ${
        flipped ? "lg:order-2" : ""
      }`}
    >
      <span className="pill-tag w-fit">{step.category}</span>
      <h3 className="type-title-lg md:text-[21px] md:leading-[29px] text-heading">{step.label}</h3>

      <div className="flex flex-col gap-2.5 mt-2">
        {step.checklist.map((item) => (
          <p key={item} className="type-body text-body flex gap-2.5">
            <ArrowRight
              size={14}
              strokeWidth={1.5}
              className="mt-[5px] flex-shrink-0 text-foreground"
            />
            {item}
          </p>
        ))}
      </div>
    </div>

    <div
      className={`bg-surface border border-borderLight min-h-[240px] lg:min-h-[280px] p-6 md:p-8 flex items-center justify-center overflow-hidden ${
        flipped ? "lg:order-1" : ""
      }`}
    >
      {React.createElement(illustrations[step.illustration])}
    </div>
  </div>
);

// Static on purpose: no sticky step list or scroll-driven reveals
const System = () => (
  <section id="system" className="section-line text-body">
    <div className="shell section-y">
      <SectionHeader
        align="center"
        className="mb-12"
        eyebrow="The solution"
        title="A clear process for quality outbound"
        accent="at scale"
        description="Our process ensures that we cover your entire target market while every message stays relevant and results stay consistent."
      />

      <div className="flex flex-col gap-16 lg:gap-24">
        {steps.map((step, i) => (
          <StepRow key={step.label} step={step} flipped={i % 2 === 1} />
        ))}

        <div className="flex flex-col items-center gap-2 text-center">
          <h3 className="type-title-lg md:text-[21px] md:leading-[29px] text-heading">
            You own the entire system
          </h3>
          <p className="type-body text-body max-w-xl">
            The domains, inboxes, contact data and copy all belong to you.
            Take it in-house any time, or keep us running it.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default System;
