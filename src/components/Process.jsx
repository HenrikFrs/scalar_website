import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    title: "Day 1 — Onboarding & setup",
    bullets: [
      "Onboarding call to gather info on your offer & target market",
      "Domains & inboxes registered under your company",
      "Sending infrastructure configured, 14-day warmup begins",
    ],
  },
  {
    title: "Day 10 — Build-out",
    bullets: [
      "Prospect lists built, verified, and AI-qualified",
      "Sequences written, every prospect AI-personalized",
      "Pre-launch alignment for your final approval",
    ],
  },
  {
    title: "Day 14 — Launch",
    bullets: [
      "Campaigns go live",
      "Sending volume ramps up gradually to full capacity",
      "First interested replies start coming in within days",
    ],
  },
];

const Process = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".proc-header", {
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
      gsap.from(".proc-step", {
        y: 20,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: ".proc-list", start: "top 78%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="py-12 md:py-24 px-4 md:px-16 lg:px-96 bg-background"
    >
      <div className="proc-header mb-16 flex flex-col items-start text-left gap-6">
        <span className="text-[9px] md:text-[11px] font-sans font-semibold tracking-[0.16em] leading-none px-3 py-2 bg-[#3799f7]/25 backdrop-blur-sm text-[#89c4ff]">
          The Timeline
        </span>
        <h2 className="text-[33px] md:text-[42px] font-medium text-foreground font-serif leading-tight max-w-2xl">
          From kickoff to booked meetings
        </h2>
      </div>

      <div className="proc-list grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step) => (
          <div
            key={step.title}
            className="proc-step bg-surface border border-borderLight p-8 flex flex-col gap-4"
          >
            <p className="font-bold text-foreground text-base md:text-lg leading-snug">
              {step.title}
            </p>
            <ul className="flex flex-col gap-3">
              {step.bullets.map((b, i) => (
                <li key={i}>
                  <p className="text-base font-medium text-muted leading-relaxed">
                    {b}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Process;
