import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const lanes = [
  {
    label: "Targeting",
    steps: [
      "Pull a broad company list from LinkedIn that includes your whole target market",
      "Filter out bad-fit companies with a custom AI prompt trained on your ICP",
      "Find the right contacts at each qualified company via LinkedIn & web scraping",
      "Enrich missing emails and double-verify every address to protect deliverability",
    ],
    ongoing:
      "Continuously prepare new contacts and refresh existing ones so we keep running at full sending capacity",
  },
  {
    label: "Messaging",
    steps: [
      "Ground every sequence in real market research before writing a word",
      "Write 2–3 step sequences with 2+ variants per step to find your ideal message fast",
      "Deeply personalize every message by populating small copy variables with custom AI prompts",
    ],
    ongoing:
      "Iterate copy the moment a test hits significance or a new insight lands",
  },
  {
    label: "Infrastructure",
    steps: [
      "Calculate exact sending volume needed to hit your goal",
      "Secure branded sending domains and inboxes to support your target volume",
      "Configure DNS records and run a 14-day warmup to protect your sender reputation",
      "Ramp up sending volume week by week to full capacity",
    ],
    ongoing:
      "Monitor deliverability daily — replace domain the moment deliverability drops below 98%",
  },
];

const Arrow = () => (
  <div className="hidden lg:flex items-center justify-center flex-shrink-0 w-8">
    <svg width="32" height="16" viewBox="0 0 32 16" fill="none">
      <line
        x1="0"
        y1="8"
        x2="24"
        y2="8"
        stroke="#3799f7"
        strokeWidth="1.5"
        strokeOpacity="0.4"
      />
      <path
        d="M24 2L30 8L24 14"
        stroke="#3799f7"
        strokeWidth="1.5"
        strokeOpacity="0.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  </div>
);

const DownArrow = () => (
  <div className="flex lg:hidden items-center justify-center flex-shrink-0 h-6">
    <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
      <line
        x1="8"
        y1="0"
        x2="8"
        y2="18"
        stroke="#3799f7"
        strokeWidth="1.5"
        strokeOpacity="0.4"
      />
      <path
        d="M2 18L8 24L14 18"
        stroke="#3799f7"
        strokeWidth="1.5"
        strokeOpacity="0.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  </div>
);

const Box = ({ children, ongoing }) => (
  <div
    className={`process-step flex-shrink-0 w-full lg:w-[200px] rounded-2xl p-5 flex items-center ${
      ongoing ? "bg-pillAccent/10" : "bg-surface"
    }`}
  >
    <p className="text-sm font-medium leading-relaxed text-muted">
      {ongoing && (
        <span className="font-semibold text-pillAccentText">ONGOING: </span>
      )}
      {children}
    </p>
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
      gsap.utils.toArray(".process-lane").forEach((lane) => {
        gsap.from(lane.querySelectorAll(".process-step"), {
          y: 24,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: lane,
            start: "top 80%",
            once: true,
          },
        });
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
        <span className="text-[9px] md:text-[11px] font-mono font-semibold uppercase tracking-[0.16em] leading-none px-3 py-2 rounded-full bg-[#3799f7]/25 backdrop-blur-sm text-[#89c4ff]">
          The Solution
        </span>
        <h2 className="text-3xl md:text-4xl font-medium text-foreground font-serif leading-tight max-w-3xl">
          A System Designed For Precision At Scale
        </h2>
        <p className="text-base font-medium text-muted leading-relaxed max-w-3xl">
          Our process uses AI to build a fully qualified contact list of your
          entire target market and deeply personalize every message. That lets
          us send highly relevant outreach at scale, without the headcount cost
          of manual prospecting.
        </p>
      </div>

      <div className="flex flex-col gap-16">
        {lanes.map((lane) => (
          <div key={lane.label} className="process-lane flex flex-col gap-6">
            <h3 className="text-lg md:text-xl font-semibold font-sans text-foreground">
              {lane.label}
            </h3>
            <div className="flex flex-col lg:flex-row lg:items-stretch gap-4 lg:gap-0 lg:overflow-x-auto pb-2 lg:pb-0 w-full">
              {lane.steps.map((step, i) => (
                <React.Fragment key={i}>
                  <Box>{step}</Box>
                  <Arrow />
                  <DownArrow />
                </React.Fragment>
              ))}
              <Box ongoing>{lane.ongoing}</Box>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default System;
