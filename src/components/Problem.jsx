import React, { useEffect, useRef } from "react";
import { Users, MessageSquareText, MailQuestion } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const problems = [
  {
    icon: <Users size={22} style={{ color: "#89c4ff" }} />,
    title: "Only reaching a fraction of their market",
    description:
      "Most teams cap themselves at the few hundred contacts they can manually research and reach. Whole segments of their addressable market go untouched, not because those companies aren't a fit, but because nobody ever got in front of them.",
  },
  {
    icon: <MessageSquareText size={22} style={{ color: "#89c4ff" }} />,
    title: "Messaging that isn't optimized for a cold audience",
    description:
      "Copy written for warm leads falls flat on people who've never heard of you. Most outreach skips the context a cold prospect actually needs, so it reads as generic, gets ignored, and never earns the reply.",
  },
  {
    icon: <MailQuestion size={22} style={{ color: "#89c4ff" }} />,
    title: "Replies that go nowhere",
    description:
      "An interested reply is only worth something if someone follows up fast and keeps at it. Most teams respond late, skip a real follow-up cadence, and give up on interested prospects long before they've actually lost interest.",
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
        <span className="text-[9px] md:text-[11px] font-sans font-semibold tracking-[0.16em] leading-none px-3 py-2 bg-[#3799f7]/25 backdrop-blur-sm text-[#89c4ff]">
          The Problem
        </span>
        <h2 className="text-[33px] md:text-[42px] font-medium text-foreground font-serif leading-tight max-w-2xl">
          Why outbound has not worked yet
        </h2>
        <p className="text-base font-medium text-muted leading-relaxed max-w-3xl">
          Most companies run into the same three walls when they try to grow
          through outbound. And any one of them is enough to stall pipeline.
        </p>
      </div>

      <div className="prob-list grid grid-cols-1 md:grid-cols-3 gap-6">
        {problems.map((item) => (
          <div
            key={item.title}
            className="prob-item bg-surface border border-borderLight p-8 flex flex-col gap-4"
          >
            <div className="w-14 h-14 flex items-center justify-center">
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
