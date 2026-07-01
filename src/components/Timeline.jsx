import React, { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  {
    day: "Day 1",
    items: [
      "Onboarding form sent",
      "Infrastructure set up and 14-day warmup started",
    ],
  },
  {
    day: "Day 7",
    items: ["Pre-launch call", "Copy written", "Lists built"],
  },
  {
    day: "Day 14",
    items: [
      "Campaign goes live",
      "Interested leads start coming in within the first days",
    ],
  },
];

const Timeline = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".tl-header", {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
      });
      gsap.from(".tl-card", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="timeline"
      ref={sectionRef}
      className="py-12 md:py-24 px-4 md:px-16 lg:px-96 bg-background"
    >
      <div>
        {/* Header */}
        <div className="tl-header mb-16 flex flex-col items-start text-left gap-6">
          <span className="text-[9px] md:text-[11px] font-mono font-semibold uppercase tracking-[0.16em] leading-none px-3 py-2 rounded-full bg-[#3799f7]/25 backdrop-blur-sm text-[#89c4ff]" >
            Timeline
          </span>
          <h2 className="text-3xl md:text-4xl font-medium text-foreground font-serif leading-tight max-w-3xl">
            A Clear Timeline to Your
            <br />
            First Qualified Meeting
          </h2>
          <p className="text-lg text-muted max-w-md font-medium">
            From signed agreement to interested leads in 14 days.
          </p>
        </div>

        {/* Desktop */}
        <div className="tl-track hidden md:block">
          {/* Dot + line row */}
          <div className="grid grid-cols-3 relative mb-8">
            {/* Full-width line through dot centers */}
            <div className="absolute top-[6px] left-[calc(1/6*100%)] right-[calc(1/6*100%)] h-px bg-black/15" />
            {milestones.map((m) => (
              <div
                key={m.day}
                className="flex flex-col items-center gap-3 relative"
              >
                <div className="w-3 h-3 rounded bg-black z-10" />
                <span className="text-sm font-mono uppercase tracking-[0.12em] text-foreground/50">
                  {m.day}
                </span>
              </div>
            ))}
          </div>

          {/* Cards */}
          <div className="grid grid-cols-3 gap-6">
            {milestones.map((m) => (
              <div
                key={m.day}
                className="tl-card bg-surface rounded-2xl p-8 flex flex-col gap-4"
              >
                <ul className="flex flex-col gap-3">
                  {m.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <ArrowRight
                        size={14}
                        className="mt-1 flex-shrink-0 text-foreground/50"
                      />
                      <p className="text-base font-medium text-muted leading-relaxed">
                        {item}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical */}
        <div className="md:hidden flex flex-col gap-4">
          {milestones.map((m, i) => (
            <div key={m.day} className="tl-card flex gap-5">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded bg-black mt-1 flex-shrink-0" />
                {i < milestones.length - 1 && (
                  <div className="w-px flex-1 bg-black/15 mt-2 min-h-[2rem]" />
                )}
              </div>
              <div className="bg-surface rounded-2xl p-6 flex flex-col gap-3 flex-1 mb-2">
                <p className="text-base font-medium text-foreground">{m.day}</p>
                <ul className="flex flex-col gap-2">
                  {m.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <ArrowRight
                        size={14}
                        className="mt-1 flex-shrink-0 text-foreground/50"
                      />
                      <p className="text-base font-medium text-muted leading-relaxed">
                        {item}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
