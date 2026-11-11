import React, { useEffect, useRef } from "react";
import { Users, MailWarning, Clock } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Section, SectionHeader } from "./ui";

gsap.registerPlugin(ScrollTrigger);

const problems = [
  {
    icon: Users,
    title: "Not enough volume",
    description:
      "Cold email is a numbers game. Most teams only reach a few hundred prospects a month, which is far too few to produce a steady flow of sales calls. The companies winning with outbound reach thousands.",
  },
  {
    icon: MailWarning,
    title: "Not landing in the inbox",
    description:
      "Running high volume outreach the wrong way gets you flagged by Google and Microsoft. Without the right sending infrastructure, warmup, monitoring, and rotation, your emails end up in spam and nobody ever reads them.",
  },
  {
    icon: Clock,
    title: "No time to run the channel",
    description:
      "Outbound needs constant attention: building lists, testing copy, watching deliverability, and handling replies. Most teams are busy running their business, so the channel never gets the time it needs to work.",
  },
];

const Problem = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".prob-header", {
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
      gsap.from(".prob-list", {
        y: 20,
        opacity: 0,
        duration: 1.1,
        ease: "expo.out",
        scrollTrigger: { trigger: ".prob-list", start: "top 78%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <Section id="problem" ref={sectionRef}>
      <SectionHeader
        className="prob-header"
        eyebrow="The problem"
        title="Why outbound has not worked"
        accent="yet"
        description="Most companies run into the same three walls when they try to grow through outbound. And any one of them is enough to stall pipeline."
      />

      <div className="frame-body">
        <div className="prob-list box-grid">
          {problems.map((item) => (
            <div key={item.title} className="p-6 md:p-8 flex flex-col gap-2">
              <item.icon
                size={28}
                strokeWidth={1.25}
                className="mb-8 text-brand"
              />
              <p className="type-title-lg text-heading">{item.title}</p>
              <p className="type-body text-body">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Problem;
