import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "./ui";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    day: "Day 1",
    title: "Build-out & onboarding",
    bullets: [
      "Infrastructure set up, 14 day warmup begins",
      "Onboarding call on positioning & target market",
    ],
  },
  {
    day: "Day 14",
    title: "Launch",
    bullets: [
      "Lead lists & sequences approved, campaigns go live",
      "First deliverability & response metrics",
      "Volume ramps up week by week",
    ],
  },
  {
    day: "Day 30",
    title: "Sales conversations",
    bullets: [
      "Qualified calls on your calendar",
      "Refining copy & lead lists",
      "Scaling what works",
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
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });
      gsap.from(".proc-list", {
        y: 20,
        opacity: 0,
        duration: 1.1,
        ease: "expo.out",
        scrollTrigger: { trigger: ".proc-list", start: "top 78%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={sectionRef} className="section-line">
      <div className="shell">
        <div className="section-y">
          <SectionHeader
            align="center"
            className="proc-header mb-12"
            eyebrow="Timeline"
            title="From kickoff to"
            accent="booked meetings"
          />

          <div className="proc-list box-grid">
            {steps.map((step) => (
              <div
                key={step.title}
                className="p-6 md:p-8 flex flex-col gap-2"
              >
                <span className="type-stat text-heading mb-6">{step.day}</span>
                <p className="type-title-lg text-heading">
                  {step.title}
                </p>
                <ul className="flex flex-col gap-2.5 mt-2">
                  {step.bullets.map((b, j) => (
                    <li
                      key={j}
                      className="type-small text-body flex gap-2.5"
                    >
                      <ArrowRight
                        size={14}
                        strokeWidth={1.5}
                        className="mt-1 flex-shrink-0 text-foreground"
                      />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
