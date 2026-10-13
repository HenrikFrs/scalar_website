import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Ban,
  Building2,
  CalendarCheck,
  Check,
  Clock,
  Globe,
  Mail,
  X,
} from "lucide-react";

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

const inboxes = ["alex", "alex.r", "a.ryan"];
const activeDomains = ["getyourbrand.com", "tryyourbrand.com"];

// A sending domain with its inboxes; back-ups are still in warm-up
const DomainBox = ({ domain, backup = false }) => (
  <div
    className={`border border-borderLight bg-background px-3 py-2.5 flex flex-col gap-2 ${
      backup ? "infra-backup border-dashed" : "infra-domain"
    }`}
  >
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-2 min-w-0">
        <Globe
          size={13}
          className={`flex-shrink-0 ${
            backup ? "text-muted" : "text-pillAccentText"
          }`}
        />
        <span
          className={`font-mono text-xs truncate ${
            backup ? "text-muted" : "text-foreground"
          }`}
        >
          {domain}
        </span>
      </div>
      <span
        className={`font-mono text-[10px] flex items-center gap-1.5 flex-shrink-0 ${
          backup ? "text-amber-400" : "text-emerald-400"
        }`}
      >
        <span
          className={`w-1.5 h-1.5 rounded-full animate-pulse ${
            backup ? "bg-amber-400" : "bg-emerald-400"
          }`}
        />
        {backup ? "Warmup" : "Active"}
      </span>
    </div>

    <div className="grid grid-cols-3 gap-1.5">
      {inboxes.map((name) => (
        <div
          key={name}
          className="infra-inbox border border-borderLight px-2 py-1.5 min-w-0"
        >
          <span className="flex items-center gap-1 min-w-0">
            <Mail
              size={10}
              className={`flex-shrink-0 ${
                backup ? "text-muted" : "text-pillAccentText"
              }`}
            />
            <span
              className={`font-mono text-[10px] truncate ${
                backup ? "text-muted" : "text-foreground"
              }`}
            >
              {name}@
            </span>
          </span>
        </div>
      ))}
    </div>
  </div>
);

// Two active domains, plus a back-up domain still in warm-up
const InfraIllustration = () => (
  <div
    className="infra-illustration flex flex-col gap-4 select-none"
    aria-hidden="true"
  >
    <div className="flex flex-col gap-2">
      {activeDomains.map((domain) => (
        <DomainBox key={domain} domain={domain} />
      ))}
    </div>
    <DomainBox domain="yourbrandhq.com" backup />
  </div>
);

const prospects = [
  { company: "Halden Logistics", status: "fit" },
  { company: "Brightpath Dental", status: "bad" },
  { company: "Corvane Systems", status: "fit" },
  { company: "Meridian Freight", status: "dnc" },
  { company: "Ostra Analytics", status: "fit" },
  { company: "Lumen Café", status: "bad" },
];

const PROSPECT_TAGS = {
  fit: { icon: Check, label: "ICP fit", className: "text-emerald-400" },
  bad: { icon: X, label: "Bad fit", className: "text-muted" },
  dnc: { icon: Ban, label: "Do not contact", className: "text-amber-400" },
};

// Broad prospect list where every row is checked against the ICP and the
// do-not-contact list
const TargetingIllustration = () => (
  <div className="targeting-illustration select-none" aria-hidden="true">
    <div className="border border-borderLight bg-background divide-y divide-borderLight">
      {prospects.map(({ company, status }) => {
        const tag = PROSPECT_TAGS[status];
        const Icon = tag.icon;
        const rejected = status !== "fit";
        return (
          <div
            key={company}
            className="targeting-row px-3 py-2 flex items-center justify-between gap-2"
          >
            <span
              className={`flex items-center gap-2 min-w-0 ${
                rejected ? "targeting-rejected opacity-40" : ""
              }`}
            >
              <Building2 size={12} className="text-muted flex-shrink-0" />
              <span
                className={`font-mono text-xs truncate ${
                  rejected ? "text-muted line-through" : "text-foreground"
                }`}
              >
                {company}
              </span>
            </span>
            <span
              className={`targeting-tag font-mono text-[10px] flex items-center gap-1 flex-shrink-0 ${tag.className}`}
            >
              <Icon size={11} />
              {tag.label}
            </span>
          </div>
        );
      })}
    </div>
  </div>
);

const theses = [
  { id: "A", angle: "Hiring signal", replyRate: "4.1%", status: "scaling" },
  {
    id: "B",
    angle: "Cost of manual ops",
    replyRate: "2.6%",
    status: "testing",
  },
  {
    id: "C",
    angle: "Competitor switch",
    replyRate: "0.4%",
    status: "replaced",
  },
  { id: "D", angle: "Recent expansion", replyRate: "–", status: "new" },
];

const THESIS_TAGS = {
  scaling: { label: "Scaling", className: "text-emerald-400" },
  testing: { label: "Testing", className: "text-pillAccentText" },
  replaced: { label: "Replaced", className: "text-muted" },
  new: { label: "New", className: "text-pillAccentText" },
};

// Theses run side by side: the winner scales, the loser is replaced
const MessagingIllustration = () => (
  <div
    className="messaging-illustration grid grid-cols-4 gap-2 select-none"
    aria-hidden="true"
  >
    {theses.map(({ id, angle, replyRate, status }) => {
      const tag = THESIS_TAGS[status];
      const replaced = status === "replaced";
      return (
        <div
          key={id}
          className={`messaging-box border bg-background px-2.5 py-3 min-h-[200px] flex flex-col justify-between gap-3 min-w-0 ${
            status === "scaling"
              ? "border-emerald-400/40"
              : status === "new"
                ? "border-dashed border-borderLight"
                : "border-borderLight"
          }`}
        >
          <div
            className={`flex flex-col gap-2 min-w-0 ${
              replaced ? "messaging-replaced opacity-40" : ""
            }`}
          >
            <span className="font-mono text-[10px] text-muted border border-borderLight w-4 h-4 flex items-center justify-center">
              {id}
            </span>
            <span
              className={`font-mono text-[11px] leading-snug break-words ${
                replaced ? "text-muted line-through" : "text-foreground"
              }`}
            >
              {angle}
            </span>
          </div>

          <div className="messaging-tag flex flex-col gap-1 font-mono">
            <span
              className={`text-base leading-none ${
                replaced ? "text-muted" : "text-foreground"
              }`}
            >
              {replyRate}
            </span>
            <span className="text-[9px] text-muted">reply rate</span>
            <span className={`text-[10px] mt-1 ${tag.className}`}>
              {tag.label}
            </span>
          </div>
        </div>
      );
    })}
  </div>
);

const followUps = ["Day 2", "Day 5", "Day 9"];

// A reply thread from interested prospect to booked meeting (static)
const ReplyIllustration = () => (
  <div className="flex flex-col gap-2 select-none" aria-hidden="true">
    <div className="border border-borderLight bg-background px-3 py-2.5 flex flex-col gap-1.5">
      <div className="flex items-center justify-between gap-2 font-mono text-[10px]">
        <span className="flex items-center gap-1.5 min-w-0 text-muted">
          <Mail size={10} className="flex-shrink-0" />
          <span className="truncate">Sarah · Halden Logistics</span>
        </span>
        <span className="flex items-center gap-1.5 flex-shrink-0 text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          Interested
        </span>
      </div>
      <p className="font-mono text-xs text-foreground leading-relaxed">
        "Sounds interesting, what does it cost?"
      </p>
    </div>

    <div className="border border-borderLight bg-background px-3 py-2.5 flex flex-col gap-1.5 ml-6">
      <div className="flex items-center justify-between gap-2 font-mono text-[10px]">
        <span className="flex items-center gap-1.5 min-w-0 text-muted">
          <Mail size={10} className="text-pillAccentText flex-shrink-0" />
          <span className="truncate">You</span>
        </span>
        <span className="flex items-center gap-1 flex-shrink-0 text-pillAccentText">
          <Clock size={10} />
          Replied in 6 min
        </span>
      </div>
      <p className="font-mono text-xs text-foreground leading-relaxed">
        "Happy to walk you through it. Tue or Wed?"
      </p>
    </div>

    <div className="border border-borderLight bg-background px-3 py-2.5 flex items-center justify-between gap-2 font-mono text-[10px]">
      <span className="text-muted">Follow-up</span>
      <span className="flex items-center gap-3 flex-shrink-0">
        {followUps.map((day) => (
          <span key={day} className="flex items-center gap-1.5 text-muted">
            <span className="w-1.5 h-1.5 rounded-full bg-pillAccentText" />
            {day}
          </span>
        ))}
      </span>
    </div>

    <div className="border border-emerald-400/40 bg-background px-3 py-2.5 flex flex-col gap-1.5">
      <div className="flex items-center justify-between gap-2 font-mono text-[10px]">
        <span className="flex items-center gap-1.5 text-emerald-400">
          <CalendarCheck size={11} />
          Meeting booked
        </span>
        <span className="text-foreground flex-shrink-0">Tue 10:00</span>
      </div>
      <p className="font-mono text-xs text-muted">
        Intro call · Halden Logistics
      </p>
    </div>
  </div>
);

const illustrations = {
  infrastructure: InfraIllustration,
  targeting: TargetingIllustration,
  messaging: MessagingIllustration,
  reply: ReplyIllustration,
};

const StepCard = ({ step, index, className }) => (
  <div
    className={`bg-surface border border-borderLight px-6 py-8 ${
      step.illustration
        ? "grid grid-cols-1 md:grid-cols-2 gap-10 md:items-start"
        : ""
    } ${className}`}
  >
    <div className="flex flex-col gap-6">
      <span className="font-mono text-xs text-pillAccentText">
        [{step.category}]
      </span>
      <h3 className="font-serif text-2xl text-foreground leading-tight">
        {step.label}
      </h3>
      {step.description && (
        <p className="text-base leading-relaxed text-muted">
          <span className="font-semibold text-foreground">{step.lead}</span>{" "}
          {step.description}
        </p>
      )}

      <div
        className={`flex flex-col gap-3 ${
          step.description ? "border-t border-borderLight pt-6" : ""
        }`}
      >
        {step.checklist.map((item, j) => (
          <p
            key={j}
            className="font-mono text-sm text-muted leading-relaxed flex gap-2"
          >
            <span className="text-pillAccentText flex-shrink-0">✓</span>
            {item}
          </p>
        ))}
      </div>
    </div>

    {/* Illustrations alternate sides on desktop: right, left, right, ... */}
    {step.illustration && (
      <div className={index % 2 === 1 ? "md:order-first" : ""}>
        {React.createElement(illustrations[step.illustration])}
      </div>
    )}
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

      const infraTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".infra-illustration",
          start: "top 80%",
          once: true,
        },
      });
      infraTl
        .from(".infra-domain", {
          y: 20,
          opacity: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out",
        })
        .from(
          ".infra-inbox",
          {
            y: 12,
            opacity: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: "power3.out",
          },
          "-=0.3",
        )
        .from(
          ".infra-backup",
          { y: 20, opacity: 0, duration: 0.6, ease: "power3.out" },
          "-=0.6",
        );

      const targetingTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".targeting-illustration",
          start: "top 80%",
          once: true,
        },
      });
      targetingTl
        .from(".targeting-row", {
          y: 12,
          opacity: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power3.out",
        })
        .from(".targeting-rejected", {
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.inOut",
        })
        .from(
          ".targeting-tag",
          {
            opacity: 0,
            x: 8,
            duration: 0.4,
            stagger: 0.08,
            ease: "power3.out",
          },
          "<",
        );

      const messagingTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".messaging-illustration",
          start: "top 80%",
          once: true,
        },
      });
      messagingTl
        .from(".messaging-box", {
          y: 20,
          opacity: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out",
        })
        .from(".messaging-replaced", {
          opacity: 1,
          duration: 0.6,
          ease: "power2.inOut",
        })
        .from(
          ".messaging-tag",
          {
            opacity: 0,
            y: 8,
            duration: 0.4,
            stagger: 0.08,
            ease: "power3.out",
          },
          "<",
        );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="system"
      ref={sectionRef}
      className="py-12 md:py-24 px-4 md:px-16 lg:px-96 bg-background overflow-hidden"
    >
      <div className="process-header mb-16 flex flex-col items-center text-center gap-6 max-w-3xl mx-auto">
        <span className="text-[9px] md:text-[11px] font-sans font-semibold tracking-[0.16em] leading-none px-3 py-2 bg-[#3799f7]/25 backdrop-blur-sm text-[#89c4ff]">
          The Solution
        </span>
        <h2 className="text-[33px] md:text-[42px] font-medium text-foreground font-serif leading-tight max-w-2xl">
          A clear process for quality outbound at scale
        </h2>
        <p className="text-base font-medium text-muted leading-relaxed max-w-2xl">
          Our process ensures that we cover your entire target market while
          every message stays relevant and results stay consistent.
        </p>
      </div>

      <div className="process-step-list flex flex-col gap-6">
        {steps.map((step, i) => (
          <StepCard
            key={step.label}
            step={step}
            index={i}
            className="process-step-card"
          />
        ))}
      </div>
    </section>
  );
};

export default System;
