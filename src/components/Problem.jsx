import React, { useEffect, useRef } from "react";
import { Unplug, MessageSquareX, TrendingDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    icon: <Unplug size={22} className="text-foreground" />,
    title: "No serious outbound motion",
    description:
      "Relying on referrals and inbound leads makes you dependent on external factors - you can't plan around them and you can't scale them. There's an entire market of qualified prospects that need your exact solution but will never find you on their own. Outbound is the way to reach them.",
  },
  {
    icon: <MessageSquareX size={22} className="text-foreground" />,
    title: "Outreach that doesn't convert",
    description:
      "The reason most outreach gets ignored is not because it doesn't work, but because it's done poorly. Either the targeting is off and they're reaching people the offer simply isn't relevant to, or the messaging fails to build enough curiosity and trust to get replies. Generic templates that could have been sent to anyone don't feel specific or relevant, and prospects can tell immediately.",
  },
  {
    icon: <TrendingDown size={22} className="text-foreground" />,
    title: "Not reaching enough prospects",
    description:
      "Even when outreach is done well, most companies simply don't do enough volume to generate consistent pipeline. The reason is that manually researched and personalized outreach is slow and expensive. Without the right systems, you can't have both quality and scale the same time and the math doesn't work.",
  },
];

const Problem = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".prob-element", {
        y: 30,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="problem"
      ref={sectionRef}
      className="py-12 md:py-24 px-4 md:px-16 lg:px-96 bg-background"
    >
      <div className="prob-element mb-12 flex flex-col items-start text-left gap-4">
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
            The Problem
          </span>
        </div>
        <h2 className="text-3xl md:text-5xl font-medium text-foreground font-serif leading-tight">
          The Problem With Most Growth Strategies
        </h2>
        <p className="text-base md:text-lg text-muted">
          If your pipeline isn't where you want it to be, one or more of these
          is probably why.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div
            key={card.title}
            className="prob-element bg-surface rounded-none p-8 flex flex-col gap-4 border border-pillBorder"
          >
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "#0d0d0d" }}
            >
              {card.icon}
            </div>
            <p className="font-medium text-foreground text-base leading-snug">
              {card.title}
            </p>
            <p className="text-muted text-sm leading-relaxed">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Problem;
