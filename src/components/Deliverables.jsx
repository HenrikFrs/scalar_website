import React, { useEffect, useRef } from "react";
import { Check, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "./Header";

gsap.registerPlugin(ScrollTrigger);

const phases = [
  {
    label: "Phase 1",
    title: "Setup",
    description:
      "Everything built and configured before a single email goes out.",
    items: [
      "Full infrastructure setup — configured domains, inboxes, and sending tool",
      "14-day inbox warmup period",
      "Contact lists built, pulled, and double-verified",
      "Calendar booking system with automated reminders and pre-call sequence",
    ],
  },
  {
    label: "Phase 2",
    title: "Launch",
    description: "Targeting, messaging, and campaigns go live.",
    items: [
      "AI prompt built to score and filter contacts by ICP fit",
      "Multiple copy variants written with dynamic variables tailored to your offer",
      "AI prompt built to personalize each email based on each prospect's digital footprint",
      "Everything assembled in the sending tool and campaigns launched",
    ],
  },
  {
    label: "Phase 3",
    title: "Ongoing",
    description: "We keep it running, optimizing, and scaling.",
    items: [
      "Campaign performance and deliverability monitored daily",
      "Copy and AI prompts iterated based on A/B test learnings",
      "Enough new contacts pushed through the pipeline to always run at full capacity",
    ],
  },
];

const Deliverables = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".deliv-header", {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });
      gsap.from(".deliv-card", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: ".deliv-grid", start: "top 80%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="deliverables"
      ref={sectionRef}
      className="py-12 md:py-24 px-4 md:px-16 lg:px-96 bg-background"
    >
      <div className="deliv-header mb-12 flex flex-col items-start text-left gap-4">
        <div
          className="flex items-center px-4 py-2"
          style={{
            backgroundColor: "rgba(59,130,246,0.1)",
            backdropFilter: "blur(8px)",
            borderRadius: "9999px",
          }}
        >
          <span
            className="text-[9px] md:text-[11px] font-mono uppercase tracking-[0.16em] leading-none translate-y-px"
            style={{ color: "#3b82f6" }}
          >
            What You Get
          </span>
        </div>
        <h2 className="text-3xl md:text-5xl font-medium text-foreground font-serif leading-tight">
          We handle everything.
        </h2>
      </div>

      <div className="deliv-grid grid grid-cols-1 md:grid-cols-3 gap-6">
        {phases.map((phase) => (
          <div
            key={phase.title}
            className="deliv-card bg-surface p-8 flex flex-col gap-6 border border-pillBorder"
          >
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-muted">
                {phase.label}
              </span>
              <p className="text-lg font-medium text-foreground">
                {phase.title}
              </p>
              <p className="text-sm text-muted leading-relaxed">
                {phase.description}
              </p>
            </div>
            <div className="border-t border-borderLight" />
            <ul className="flex flex-col gap-3">
              {phase.items.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center">
                    <Check
                      size={9}
                      className="text-white/60"
                      strokeWidth={2.5}
                    />
                  </span>
                  <p className="text-sm text-muted leading-relaxed">{item}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-12 flex flex-col items-start gap-3">
        <MagneticButton
          variant="heroPrimary"
          className="text-sm py-3 px-8"
          onClick={() =>
            window.open(
              "https://cal.com/henrik-freisleben-3prokl/outbound-system",
              "_blank",
            )
          }
        >
          Learn How It Works For You <ArrowUpRight size={16} className="ml-1" />
        </MagneticButton>
      </div>
    </section>
  );
};

export default Deliverables;
