import React, { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    title: "Precise Targeting",
    bullets: [
      "Analyzing your existing customer base to identify what your best customers have in common",
      "Building segmented lists of contacts that match that profile",
      "Reviewing each company's website and LinkedIn profile with AI to filter out anyone that doesn't fit",
    ],
  },
  {
    number: "02",
    title: "Messaging That Gets Replies",
    bullets: [
      "Writing copy that communicates your value proposition in a compelling and professional way",
      "Tailoring each message to the prospect's unique situation with AI to maximize relevance and build trust",
    ],
  },
  {
    number: "03",
    title: "Infrastructure That Scales",
    bullets: [
      "Setting up dedicated sending infrastructure that allows us to send enough volume",
      "Configuring and warming up infrastructure cleanly so emails consistently land in primary inboxes",
    ],
  },
  {
    number: "04",
    title: "Meetings That Actually Show Up",
    bullets: [
      "Instant notifications for interested replies so the response comes when they're most engaged",
      "Automated pre-call sequence that keeps prospects committed and increases show rates",
    ],
  },
];

const Process = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".process-header", {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });
      gsap.from(".process-step", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: ".process-list", start: "top 75%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="py-16 md:py-24 px-4 md:px-16 lg:px-96 bg-background"
    >
      <div className="process-header mb-20 flex flex-col items-start text-left gap-4">
        <div className="flex items-center px-4 py-1.5 rounded-full border border-pillBorder">
          <span className="text-[11px] font-mono uppercase tracking-[0.16em] text-muted">
            The Solution
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-medium text-foreground font-serif leading-tight">
          One System Designed For Consistent Pipeline
        </h2>
      </div>

      <div className="process-list flex flex-col">
        {steps.map((step, index) => (
          <div key={step.number} className="process-step flex gap-8 md:gap-12">
            {/* Left: number + connector line */}
            <div className="flex flex-col items-center flex-shrink-0">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-surface">
                <span className="text-xs font-mono text-foreground tabular-nums">
                  {step.number}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className="w-px flex-1 bg-borderLight mt-3 mb-3" />
              )}
            </div>

            {/* Right: content */}
            <div
              className={`flex flex-col gap-3 ${index < steps.length - 1 ? "pb-16" : ""}`}
            >
              <p className="font-medium text-foreground text-2xl md:text-3xl leading-snug">
                {step.title}
              </p>
              <ul className="flex flex-col gap-2">
                {step.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <ArrowRight
                      size={14}
                      className="mt-1 flex-shrink-0 text-foreground/50"
                    />
                    <p className="text-muted text-sm leading-relaxed">{b}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Process;
