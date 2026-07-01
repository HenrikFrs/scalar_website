import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    title: "Day 1 — Onboarding & Setup",
    bullets: [
      "You complete a short onboarding form covering everything we need to know to get started",
      "Sending infrastructure is configured and the 14-day inbox warmup period begins",
      "All domains, inboxes, and accounts are registered under your company name from day one",
    ],
  },
  {
    title: "Day 1–14 — Build-Out",
    bullets: [
      "Prospect lists are built, double-verified and AI-qualified",
      "Multiple email sequences are written and every prospect is run through AI personalization",
      "A pre-launch alignment call ensures you approve everything before campaigns go live",
    ],
  },
  {
    title: "Day 14 — Launch",
    bullets: [
      "Campaigns go live — interested replies typically appear within the first few days",
      "Sending volume ramp-up begins, starting with a small number of emails per day and gradually increasing to full capacity",
      "The controlled ramp maximises deliverability and keeps messages out of spam",
    ],
  },
  {
    title: "Day 42 — Full Capacity",
    bullets: [
      "Inboxes reach full sending capacity and the pipeline runs at scale",
      "New leads are continuously sourced, qualified, and added to active campaigns",
      "Inbox reputation, domain health, and A/B results are monitored and optimised weekly",
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
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: ".proc-list", start: "top 75%", once: true },
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
        <span className="text-[9px] md:text-[11px] font-mono font-semibold uppercase tracking-[0.16em] leading-none px-3 py-2 rounded-full bg-[#3799f7]/25 backdrop-blur-sm text-[#89c4ff]">
          The Process
        </span>
        <h2 className="text-3xl md:text-4xl font-medium text-foreground font-serif leading-tight max-w-3xl">
          From Kickoff To Full Pipeline
        </h2>
      </div>

      <div className="proc-list flex flex-col">
        {steps.map((step, index) => (
          <div key={step.title} className="proc-step flex gap-8 md:gap-12">
            {/* Left: dot + connector line */}
            <div className="flex flex-col items-center flex-shrink-0">
              <div className="w-2.5 h-2.5 rounded-sm bg-white flex-shrink-0 mt-1 md:mt-2" />
              {index < steps.length - 1 && (
                <div className="w-0.5 flex-1 bg-borderLight mt-1" />
              )}
            </div>

            {/* Right: two-column grid — title left (1/3), bullets bottom-right (2/3) */}
            <div
              className={`flex-1 grid md:grid-cols-[1fr_2fr] content-start ${index < steps.length - 1 ? "pb-12" : ""}`}
            >
              <p className="font-bold text-foreground text-base md:text-lg leading-snug">
                {step.title}
              </p>
              <div className="md:row-start-2 md:col-start-2 mt-3 bg-surface rounded-xl p-6 md:p-8">
                <ul className="flex flex-col gap-3.5">
                  {step.bullets.map((b, i) => (
                    <li key={i}>
                      <p className="text-base font-medium text-muted leading-relaxed">{b}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Process;
