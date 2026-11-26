import React, { useState } from "react";
import { createPortal } from "react-dom";
import { Section, SectionHeader } from "./ui";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import SystemDetail from "./SystemDetail";
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
const StepRow = ({ step, flipped, onOpen, visual, moreLabel }) => (
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

      <button
        type="button"
        onClick={onOpen}
        className="group ui-label text-muted hover:text-brand w-fit mt-4 flex items-center gap-1.5 underline underline-offset-4 decoration-dotted transition-all duration-300 hover:-translate-y-px"
      >
        {moreLabel}
        <ArrowUpRight
          size={14}
          strokeWidth={1.5}
          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </button>
    </div>

    <div
      className={`media-box min-h-[240px] lg:min-h-[280px] p-6 md:p-8 flex items-center justify-center ${
        flipped ? "lg:order-1" : ""
      }`}
    >
      {React.createElement(visual)}
    </div>
  </div>
);

// The alternating step rows plus their pop-up. Shared with the LinkedIn
// page, which passes its own steps, diagrams, pop-up copy and labels
export const SystemSteps = ({
  steps,
  visuals,
  details,
  detailLabels,
  moreLabel = "Learn more",
}) => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <>
      {steps.map((step, i) => (
        <StepRow
          key={step.label}
          step={step}
          flipped={i % 2 === 1}
          onOpen={() => setOpenIndex(i)}
          visual={visuals[step.illustration]}
          moreLabel={moreLabel}
        />
      ))}

      {openIndex !== null &&
        createPortal(
          <SystemDetail
            steps={steps}
            index={openIndex}
            onClose={() => setOpenIndex(null)}
            onNavigate={setOpenIndex}
            content={details}
            labels={detailLabels}
          />,
          document.body,
        )}
    </>
  );
};

// Static on purpose: no sticky step list or scroll-driven reveals. Each step
// opens a pop-up with the in-depth explanation
const System = () => (
  <Section id="system" className="text-body">
    <SectionHeader
      eyebrow="The solution"
      title="A clear process for quality outbound"
      accent="at scale"
      description="Our process ensures that we cover your entire target market while every message stays relevant and results stay consistent."
    />
    <SystemSteps steps={steps} visuals={visuals} />
  </Section>
);

export default System;
