import React, { useEffect, useRef } from "react";
import { Target, MessageSquareText, Radio } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const problems = [
  {
    icon: <Target size={22} style={{ color: "#89c4ff" }} />,
    title: "Targeting",
    description:
      "The right companies match your ideal customer profile and genuinely need your offer. Most people trying to run outreach at scale rely on basic LinkedIn filters, which are notoriously inaccurate at finding them. The result is outreach that's just spam, not a viable growth channel.",
  },
  {
    icon: <MessageSquareText size={22} style={{ color: "#89c4ff" }} />,
    title: "Messaging",
    description:
      "The right message is personalized to each prospect's specific situation. Most people running high volume outreach rely on generic templates that are obviously mass-sent, which prospects recognize and ignore. The result is outreach that gets reported instead of replied to, damaging sender reputation.",
  },
  {
    icon: <Radio size={22} style={{ color: "#89c4ff" }} />,
    title: "Scale",
    description:
      "To hit your goals, you need to send enough volume, without sacrificing targeting or messaging quality. Without the right systems, that's only possible by adding proportional headcount, which is expensive and doesn't scale.",
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
          The Three Variables That Determine Outbound Success
        </h2>
        <p className="text-base font-medium text-muted leading-relaxed max-w-3xl">
          The success of any outreach system depends on these three variables.
          Without the right systems, most companies are missing at least one of
          them, which is why they struggle to hit their goals.
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
