import React, { useEffect, useRef } from "react";
import { UserX, MessageSquareX, TrendingDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const problems = [
  {
    icon: <UserX size={22} style={{ color: "#89c4ff" }} />,
    title: "Reaching the wrong prospects",
    description:
      "Most people use the same basic LinkedIn filters like industry, location, and company size. Since everyone uses the same filters, they're reaching the exact same hammered contacts as their competitors. Plus those filters are self-reported and largely inaccurate, so they're not even reaching who they think they are.",
  },
  {
    icon: <MessageSquareX size={22} style={{ color: "#89c4ff" }} />,
    title: "Sending messages that get ignored",
    description:
      "In the current landscape, good copywriting alone doesn't cut it anymore. People immediately recognize generic messages and ignore them or even report you. Not only does that kill response rates, but it damages the sender reputation, which means future messages land in spam.",
  },
  {
    icon: <TrendingDown size={22} style={{ color: "#89c4ff" }} />,
    title: "Not doing enough volume",
    description:
      "When you put enough effort into it, targeting and messaging is good. But scaling that effort is way too expensive. You're forced to choose between quality work that doesn't reach enough people or cutting corners to achieve volume, which kills your results anyway.",
  },
];

const Problem = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".prob-header", {
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
      gsap.from(".prob-item", {
        y: 20,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: ".prob-list", start: "top 78%", once: true },
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
      <div className="prob-header mb-16 flex flex-col items-start text-left gap-6">
        <span className="text-[9px] md:text-[11px] font-mono font-semibold uppercase tracking-[0.16em] leading-none px-3 py-2 rounded-full bg-[#3799f7]/25 backdrop-blur-sm text-[#89c4ff]">
          The Problem
        </span>
        <h2 className="text-3xl md:text-4xl font-medium text-foreground font-serif leading-tight max-w-3xl">
          The Problem With Most Growth Strategies
        </h2>
        <p className="text-base font-medium text-muted leading-relaxed max-w-3xl">
          The success of any outreach system can be broken down to a simple
          formula:{" "}
          <span className="italic">
            Pipeline = Targeting * Messaging * Scale
          </span>
          . Most companies completely miss one or more of these factors.
        </p>
      </div>

      <div className="prob-list grid grid-cols-1 md:grid-cols-3 gap-6">
        {problems.map((item) => (
          <div
            key={item.title}
            className="prob-item bg-surface rounded-xl p-8 flex flex-col gap-4"
          >
            <div className="w-14 h-14 rounded-full bg-surface2 flex items-center justify-center">
              {item.icon}
            </div>
            <p className="font-medium text-foreground text-base md:text-xl leading-snug mt-4">
              {item.title}
            </p>
            <p className="text-base font-medium text-muted leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Problem;
