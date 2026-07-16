import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    title: "Precise Targeting",
    bullets: [
      "Start with companies you've already approved as a fit, then expand into a broad list of similar lookalike companies",
      "Extract data from every prospect's website and LinkedIn to build a full picture of who they are",
      "Run each company through a custom AI prompt that evaluates them against your ideal customer profile, removing anyone who isn't a fit",
    ],
  },
  {
    number: "02",
    title: "Messaging That Gets Replies",
    bullets: [
      "Craft compelling copy that communicates your offer and value proposition in a professional way",
      "Tailor each message to the prospect's unique situation with AI to maximize relevance and build trust",
      "Test and iterate on messaging variations to find the best-performing approach and continuously improve results",
    ],
  },
  {
    number: "03",
    title: "Infrastructure That Scales",
    bullets: [
      "Set up multiple sending domains and inboxes to maximize volume while building redundancy across your infrastructure",
      "Handle all deliverability intricacies to ensure your messages land in primary inboxes—DNS configuration, 14-day warmup, email verification, and message optimization",
    ],
  },
  {
    number: "04",
    title: "Meetings That Actually Show Up",
    bullets: [
      "Send instant notifications for interested replies so the response comes when they're most engaged",
      "Automatically book meetings and keep prospects committed with pre-call sequences that increase show rates",
    ],
  },
];

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
      gsap.from(".process-step", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".process-list",
          start: "top 75%",
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
      className="py-12 md:py-24 px-4 md:px-16 lg:px-96 bg-background"
    >
      <div className="process-header mb-16 flex flex-col items-start text-left gap-6">
        <span className="text-[9px] md:text-[11px] font-mono font-semibold uppercase tracking-[0.16em] leading-none px-3 py-2 rounded-full bg-[#3799f7]/25 backdrop-blur-sm text-[#89c4ff]">
          The Solution
        </span>
        <h2 className="text-3xl md:text-4xl font-medium text-foreground font-serif leading-tight max-w-3xl">
          A System Designed For Precision At Scale
        </h2>
        <p className="text-base font-medium text-muted leading-relaxed max-w-3xl">
          Our system uses AI to find your most likely next customers and
          personalize every message at scale. That's how we maximize all three
          variables simultaneously.
        </p>
      </div>

      <div className="process-list flex flex-col gap-6">
        {steps.map((step) => (
          <div
            key={step.number}
            className="process-step bg-surface rounded-xl p-8 flex flex-col gap-4"
          >
            <p className="font-medium text-foreground text-xl leading-snug">
              <span className="font-mono font-semibold mr-2 text-foreground">
                {step.number}
              </span>
              {". "}
              {step.title}
            </p>
            <ul className="flex flex-col gap-3.5">
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

export default System;
