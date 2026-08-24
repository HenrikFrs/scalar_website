import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    label: "Targeting",
    lead: "We map your whole addressable market, not a sliver of it.",
    description:
      "We pull a broad list of potential prospects from multiple sources to cover your entire market, then analyze every single one to filter out prospects that don't fit your ideal customer profile (ICP).",
    checklist: [
      "Broad prospect list pulled to cover your whole market",
      "Every prospect analyzed to filter out bad fits",
      "Do-not-contact list enforced to avoid reaching out to known contacts",
    ],
  },
  {
    label: "Messaging",
    lead: "Every message is personalized and optimized for a cold audience.",
    description:
      "We position your offer to consistently convert completely cold prospects. Every message is deeply personalized to the prospect's unique context, and multiple variants are tested to find your best-performing message.",
    checklist: [
      "Your offer is positioned to convert cold prospects",
      "Every message personalized to the prospect's context",
      "Multiple message variants tested to find the best performer",
    ],
  },
  {
    label: "Infrastructure",
    lead: "A clean sending setup that scales and stays reliable.",
    description:
      "Dedicated sending domains and inboxes are secured, configured, and warmed for 14 days to ensure deliverability. Back-up infrastructure is set up to keep running at the same capacity in case of any issues.",
    checklist: [
      "Dedicated domains and inboxes",
      "14-day warm-up phase builds reputation before launch",
      "Back-up infrastructure provides redundancy",
    ],
  },
  {
    label: "Reply handling",
    lead: "We reply fast and follow up consistently.",
    description:
      "We reply to prospects while your offer is still top of mind, and follow up on a defined cadence to maximize the chance of booking a meeting. Every meeting lands straight on your team's calendar.",
    checklist: [
      "Fast reply to every prospect while your offer is still fresh",
      "Defined follow-up cadence to maximize bookings",
      "Meetings booked directly on your team's calendar",
    ],
  },
];

const StepCard = ({ step, index, className }) => (
  <div
    className={`bg-surface border border-borderLight px-6 py-8 flex flex-col gap-6 ${className}`}
  >
    <span className="font-mono text-xs text-pillAccentText">
      [{String(index + 1).padStart(2, "0")}]
    </span>
    <h3 className="font-serif text-2xl text-foreground leading-tight">
      {step.label}
    </h3>
    <p className="text-base leading-relaxed text-muted">
      <span className="font-semibold text-foreground">{step.lead}</span>{" "}
      {step.description}
    </p>

    <div className="border-t border-borderLight pt-6 flex flex-col gap-3">
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
      className="py-12 md:py-24 px-4 md:px-16 lg:px-96 bg-background overflow-hidden"
    >
      <div className="process-header mb-16 flex flex-col items-start text-left gap-6 max-w-3xl">
        <span className="text-[9px] md:text-[11px] font-sans font-semibold tracking-[0.16em] leading-none px-3 py-2 bg-[#3799f7]/25 backdrop-blur-sm text-[#89c4ff]">
          The Solution
        </span>
        <h2 className="text-[33px] md:text-[42px] font-medium text-foreground font-serif leading-tight max-w-2xl">
          A clear process for quality outbound at scale
        </h2>
        <p className="text-base font-medium text-muted leading-relaxed max-w-3xl">
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
