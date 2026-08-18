import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    label: "Targeting",
    lead: "We map your whole addressable market, not a sliver of it.",
    description:
      "We pull a broad list of potential prospects from multiple sources to cover your entire market, then analyze every single one to filter out prospects that don't fit your ideal customer profile (ICP).",
    checklist: [
      "Broad prospect list pulled to cover your whole market",
      "Every prospect analyzed to filter out bad fits",
      "Do-not-contact list enforced to avoid reaching out to known contacts",
    ],
  },
  {
    label: "Messaging",
    lead: "Every message is personalized and optimized for a cold audience.",
    description:
      "We position your offer to consistently convert completely cold prospects. Every message is deeply personalized to the prospect's unique context, and multiple variants are tested to find your best-performing message.",
    checklist: [
      "Your offer is positioned to convert cold prospects",
      "Every message personalized to the prospect's context",
      "Multiple message variants tested to find the best performer",
    ],
  },
  {
    label: "Infrastructure",
    lead: "A clean sending setup that scales and stays reliable.",
    description:
      "Dedicated sending domains and inboxes are secured, configured, and warmed for 14 days to ensure deliverability. Back-up infrastructure is set up to keep running at the same capacity in case of any issues.",
    checklist: [
      "Dedicated domains and inboxes",
      "14-day warm-up phase builds reputation before launch",
      "Back-up infrastructure provides redundancy",
    ],
  },
  {
    label: "Reply handling",
    lead: "We reply fast and follow up consistently.",
    description:
      "We reply to prospects within 30 minutes of their reply, and follow up on a defined cadence to maximize the chance of booking a meeting. Every meeting lands straight on your team's calendar.",
    checklist: [
      "Fast reply to every prospect within 30 minutes",
      "Defined follow-up cadence to maximize bookings",
      "Meetings booked directly on your team's calendar",
    ],
  },
];

const System = () => {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const isClickScroll = useRef(false);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

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
      gsap.from(".process-panel", {
        y: 20,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
      });

      // Scroll-driven step advance: pin the panel and step through
      // tabs as the user scrolls past the section, on both desktop
      // and mobile.
      const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
      const scrollPerStep = isDesktop ? 500 : 750;
      const st = ScrollTrigger.create({
        trigger: pinRef.current,
        start: isDesktop ? "center center" : "bottom bottom",
        end: () => `+=${(steps.length - 1) * scrollPerStep}`,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          if (isClickScroll.current) return;
          const idx = Math.min(
            steps.length - 1,
            Math.floor(self.progress * steps.length),
          );
          if (idx !== activeRef.current) {
            setActive(idx);
          }
        },
      });

      return () => st.kill();
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const panelRef = useRef(null);
  useEffect(() => {
    if (!panelRef.current) return;
    gsap.fromTo(
      panelRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
    );
  }, [active]);

  const handleStepClick = (i) => {
    setActive(i);
    const st = ScrollTrigger.getAll().find((t) => t.trigger === pinRef.current);
    if (st && window.lenis) {
      isClickScroll.current = true;
      const targetProgress = (i + 0.5) / steps.length;
      const targetScroll = st.start + targetProgress * (st.end - st.start);
      window.lenis.scrollTo(targetScroll, {
        duration: 0.9,
        onComplete: () => {
          isClickScroll.current = false;
        },
      });
    }
  };

  const current = steps[active];

  return (
    <section
      id="system"
      ref={sectionRef}
      className="py-12 md:py-24 px-4 md:px-16 lg:px-96 bg-background overflow-hidden"
    >
      <div ref={pinRef}>
        <div className="process-header mb-16 flex flex-col items-start text-left gap-6 max-w-3xl">
          <span className="text-[9px] md:text-[11px] font-sans font-semibold tracking-[0.16em] leading-none px-3 py-2 bg-[#3799f7]/25 backdrop-blur-sm text-[#89c4ff]">
            The Solution
          </span>
          <h2 className="text-[33px] md:text-[42px] font-medium text-foreground font-serif leading-tight max-w-2xl">
            A clear process for quality outbound at scale
          </h2>
          <p className="text-base font-medium text-muted leading-relaxed max-w-3xl">
            Our process ensures that we cover your entire target market while
            every message stays relevant and results stay consistent.
          </p>
        </div>

        <div className="process-panel grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-0 overflow-hidden">
          {/* Left: step list */}
          <div className="flex flex-col lg:h-[420px]">
            {steps.map((step, i) => (
              <button
                key={step.label}
                onClick={() => handleStepClick(i)}
                className="text-left px-6 md:px-8 py-6 flex-1 flex items-center justify-between gap-4 border-b border-borderLight last:border-b-0 transition-colors duration-200"
              >
                <span className="flex items-baseline gap-3">
                  <span className="font-mono text-xs text-muted">
                    [{String(i + 1).padStart(2, "0")}]
                  </span>
                  <span
                    className={`font-serif text-lg md:text-xl leading-snug transition-colors duration-200 ${
                      active === i ? "text-foreground" : "text-muted"
                    }`}
                  >
                    {step.label}
                  </span>
                </span>
              </button>
            ))}
          </div>

          {/* Right: detail panel */}
          <div
            ref={panelRef}
            className="px-6 md:px-10 py-8 md:py-10 flex flex-col gap-6 bg-background/40"
          >
            <span className="font-mono text-xs text-pillAccentText">
              [{String(active + 1).padStart(2, "0")}]
            </span>
            <h3 className="font-serif text-2xl md:text-3xl text-foreground leading-tight">
              {current.label}
            </h3>
            <p className="text-base leading-relaxed text-muted">
              <span className="font-semibold text-foreground">
                {current.lead}
              </span>{" "}
              {current.description}
            </p>

            <div className="border-t border-borderLight pt-6 flex flex-col gap-3">
              {current.checklist.map((item, i) => (
                <p
                  key={i}
                  className="font-mono text-sm text-muted leading-relaxed flex gap-2"
                >
                  <span className="text-pillAccentText flex-shrink-0">✓</span>
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default System;
