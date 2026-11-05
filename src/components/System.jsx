import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeader } from "./ui";
import { ArrowRight, Ban, Building2, Check, X } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    category: "Infrastructure",
    label: "Building reliable sending infrastructure",
    illustration: "infrastructure",
    checklist: [
      "Dedicated sending domains with 25 inboxes each",
      "Warmed 2 weeks before launch",
      "Daily deliverability monitoring",
      "Flagged domains are swapped for back-ups and replaced",
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
    label: "Scaling the best message",
    illustration: "messaging",
    checklist: [
      "At least two hand-written sequences per segment",
      "Winning messages scale, losers get replaced",
      "Every message personalized for maximum relevance",
    ],
  },
  {
    category: "Reply Handling",
    label: "Turning replies into meetings",
    illustration: "reply",
    checklist: [
      "Fast reply to every prospect while your offer is still fresh",
      "Defined follow-up cadence to maximize bookings",
      "Meetings booked directly on your team's calendar",
    ],
  },
];

// A labelled box in a diagram; `dim` is for the steps leading up to the result
const FlowNode = ({ label, dim = false, className = "", children }) => (
  <div className={`${dim ? "flow-node-dim" : "flow-node"} px-3 py-1.5 ${className}`}>
    {label && (
      <p className="font-mono text-[9px] leading-3 text-muted">{label}</p>
    )}
    <p className="text-[11px] leading-4 tracking-normal text-foreground">
      {children}
    </p>
  </div>
);

const DomainNode = ({ domain, backup = false }) => (
  <div
    className={`h-[46px] px-3 flex flex-col justify-center ${
      backup ? "flow-node-dim border-dashed" : "flow-node"
    }`}
  >
    <p className="flex items-center justify-between gap-2 leading-4">
      <span
        className={`text-[11px] tracking-normal truncate ${
          backup ? "text-muted" : "text-foreground"
        }`}
      >
        {domain}
      </span>
      <span
        className={`font-mono text-[9px] flex items-center gap-1 flex-shrink-0 ${
          backup ? "text-warn" : "text-brand"
        }`}
      >
        <span
          className={`w-1 h-1 rounded-full ${backup ? "bg-warn" : "bg-brand"}`}
        />
        {backup ? "Warmup" : "Active"}
      </span>
    </p>
    <p className="font-mono text-[9px] leading-3 text-muted">
      {backup ? "Back-up · 25 inboxes" : "25 inboxes"}
    </p>
  </div>
);

// Active domains send under daily monitoring, with a back-up on standby.
// The connector's rows line up with the three 46px nodes and their 8px gaps.
const InfraIllustration = () => (
  <div
    className="w-full max-w-[460px] grid grid-cols-[minmax(0,1fr)_24px_minmax(0,0.65fr)] items-center select-none"
    aria-hidden="true"
  >
    <div className="flex flex-col gap-2">
      <DomainNode domain="getyourbrand.com" />
      <DomainNode domain="tryyourbrand.com" />
      <DomainNode domain="yourbrandhq.com" backup />
    </div>
    <svg viewBox="0 0 24 154" className="w-6 h-[154px]">
      <path d="M0 23H12V77M0 77H24" className="fill-none stroke-brand/60" />
      <path
        d="M0 131H12V77"
        strokeDasharray="3 3"
        className="fill-none stroke-foreground/25"
      />
    </svg>
    <FlowNode label="Monitored daily">Landing in the inbox</FlowNode>
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
          className={`text-[11px] tracking-normal truncate ${
            rejected ? "text-muted line-through" : "text-foreground"
          }`}
        >
          {company}
        </span>
      </span>
      <span
        className={`font-mono text-[10px] flex items-center gap-1 flex-shrink-0 ${tag.className}`}
      >
        <Icon size={10} />
        {tag.label}
      </span>
    </div>
  );
};

// Every company in the market gets checked against the ICP
const TargetingIllustration = () => (
  <div className="w-full max-w-[320px] flex flex-col gap-2 select-none" aria-hidden="true">
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
            } w-[116px] flex-shrink-0 px-2.5 py-2`}
          >
            <p
              className={`text-[10px] leading-4 tracking-normal truncate ${
                replaced ? "text-muted line-through" : "text-foreground"
              }`}
            >
              {angle}
            </p>
            <p className="mt-1 flex items-center justify-between gap-1 font-mono text-[10px] leading-4">
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
  <div className="w-full max-w-[300px] flex flex-col select-none" aria-hidden="true">
    <FlowNode dim label="Sarah · Halden Logistics">
      "Sounds interesting, what does it cost?"
    </FlowNode>
    <span className="flow-line" />
    <FlowNode dim label="Replied in 6 min">
      "Happy to walk you through it. Tue or Wed?"
    </FlowNode>
    <span className="flow-line" />
    <FlowNode label="Meeting booked">Intro call · Tue 10:00</FlowNode>
    <p className="mt-2 flex items-center justify-center gap-1.5 font-mono text-[9px] leading-3 text-muted">
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

// Text beside its illustration; `flipped` swaps the sides on desktop
const StepRow = ({ step, flipped, className }) => (
  <div
    className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-x-20 lg:items-center ${className}`}
  >
    <div className={`flex flex-col gap-3 ${flipped ? "lg:order-2" : ""}`}>
      <span className="pill-tag w-fit">{step.category}</span>
      <h3 className="type-title text-heading">
        {step.label}
      </h3>

      <div className="flex flex-col gap-2.5 mt-3">
        {step.checklist.map((item) => (
          <p
            key={item}
            className="type-small text-body flex gap-2.5"
          >
            <ArrowRight
              size={14}
              strokeWidth={1.5}
              className="mt-1 flex-shrink-0 text-foreground"
            />
            {item}
          </p>
        ))}
      </div>
    </div>

    <div
      className={`border border-borderLight h-[216px] p-3 flex items-center justify-center overflow-hidden ${
        flipped ? "lg:order-1" : ""
      }`}
    >
      {React.createElement(illustrations[step.illustration])}
    </div>
  </div>
);

const System = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".process-header", {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });

      gsap.from(".process-step-card", {
        y: 20,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".process-step-list",
          start: "top 85%",
          once: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="system"
      ref={sectionRef}
      className="theme-dark relative isolate bg-background text-body"
    >
      <div className="page-guides" aria-hidden="true" />
      <div className="shell">
        <div className="section-y">
          <SectionHeader
            className="process-header mb-16 md:mb-24"
            eyebrow="The solution"
            title="A clear process for quality outbound"
            accent="at scale."
            description="Our process ensures that we cover your entire target market while every message stays relevant and results stay consistent."
          />

          <div className="process-step-list flex flex-col gap-14 lg:gap-24">
            {steps.map((step, i) => (
              <StepRow
                key={step.label}
                step={step}
                flipped={i % 2 === 1}
                className="process-step-card"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default System;
