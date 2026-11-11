import React from "react";
import { Section, SectionHeader } from "./ui";
import { ArrowRight } from "lucide-react";
import {
  InfraVisual,
  MessagingVisual,
  ReplyVisual,
  TargetingVisual,
} from "./SystemVisuals";

const visuals = {
  infrastructure: InfraVisual,
  targeting: TargetingVisual,
  messaging: MessagingVisual,
  reply: ReplyVisual,
};


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

// One step per row: text beside its diagram in an outlined box. `flipped`
// swaps the sides on desktop, so rows alternate
const StepRow = ({ step, flipped }) => (
  <div className="px-[var(--ci)] py-10 md:py-12 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16 lg:items-center">
    {/* Indented like text inside the boxes elsewhere (their p-6 md:p-8), on
        the outer side */}
    <div
      className={`flex flex-col gap-4 px-6 md:pl-8 md:pr-0 ${
        flipped ? "lg:order-2 lg:pl-0 lg:pr-8" : ""
      }`}
    >
      <span className="pill-tag w-fit">{step.category}</span>
      <h3 className="type-h3 text-heading">{step.label}</h3>

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
      className={`media-box min-h-[240px] lg:min-h-[280px] p-6 md:p-8 flex items-center justify-center ${
        flipped ? "lg:order-1" : ""
      }`}
    >
      {React.createElement(visuals[step.illustration])}
    </div>
  </div>
);

// Static on purpose: no sticky step list or scroll-driven reveals
const System = () => (
  <Section id="system" className="text-body">
    <SectionHeader
      eyebrow="The solution"
      title="A clear process for quality outbound"
      accent="at scale"
      description="Our process ensures that we cover your entire target market while every message stays relevant and results stay consistent."
    />

    {steps.map((step, i) => (
      <StepRow key={step.label} step={step} flipped={i % 2 === 1} />
    ))}

    {/* Closing statement, centred with plenty of room like the reference's
        text section */}
    <div className="px-[var(--ci)] py-16 md:py-20 flex flex-col items-center gap-4 text-center">
      <h3 className="type-h2 text-[28px] min-[810px]:text-[32px] min-[1200px]:text-[36px] text-heading text-balance">
        You own the entire system
      </h3>
      <p className="type-lead text-body max-w-xl">
        The domains, inboxes, contact data and copy all belong to you. Take it
        in-house any time, or keep us running it.
      </p>
    </div>
  </Section>
);

export default System;
