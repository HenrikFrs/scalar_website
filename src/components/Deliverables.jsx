import React, { useEffect, useRef } from "react";
import {
  Rocket,
  ListChecks,
  PenLine,
  Mail,
  BarChart3,
  RefreshCcw,
  UsersRound,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const deliverables = [
  {
    icon: Rocket,
    title: "Infrastructure setup",
    description:
      "Buying domains and inboxes, configuring them correctly, and warming them for two weeks to build a strong reputation before launch.",
  },
  {
    icon: ListChecks,
    title: "List-building and verification",
    description:
      "Scraping contact data from multiple sources, filtering every contact for ICP fit, and verifying every email address to ensure deliverability.",
  },
  {
    icon: PenLine,
    title: "Offer-positioning and copywriting",
    description:
      "Positioning your offer for maximum effectiveness with cold prospects, and writing sequences with multiple variants to test and optimize for the best results.",
  },
  {
    icon: Mail,
    title: "Reply management and scheduling",
    description:
      "Handling every reply fast, while your offer is still top of mind, and following up with every interested prospect at least 4 times on a set cadence to maximize the chance of booking a meeting.",
  },
  {
    icon: BarChart3,
    title: "Deliverability monitoring and troubleshooting",
    description:
      "Daily monitoring of your sending reputation and deliverability, and troubleshooting any issues that arise to keep sending at full capacity.",
  },
  {
    icon: RefreshCcw,
    title: "Messaging angle and copy iteration",
    description:
      "Adapting your messaging as soon as a test hits statistical signficance or a new insight lands.",
  },
  {
    icon: UsersRound,
    title: "Continuous contact-sourcing",
    description:
      "Continuously preparing new contacts and keeping existing data up to date to keep your campaigns running at full capacity.",
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
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });
      gsap.from(".deliv-item", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: ".deliv-grid", start: "top 80%", once: true },
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
      <div className="deliv-header mb-16 flex flex-col items-start text-left gap-6">
        <span className="text-[9px] md:text-[11px] font-sans font-semibold tracking-[0.16em] leading-none px-3 py-2 bg-[#3799f7]/25 backdrop-blur-sm text-[#89c4ff]">
          What You Get
        </span>
        <h2 className="text-[33px] md:text-[42px] font-medium text-foreground font-serif leading-tight max-w-2xl">
          We handle everything
        </h2>
        <p className="text-base font-medium text-muted leading-relaxed max-w-3xl">
          We own the whole process until the first meeting is attended. Your
          team only needs to show up and close.
        </p>
      </div>

      <div className="deliv-grid grid grid-cols-1 md:grid-cols-2 gap-x-12">
        {deliverables.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="deliv-item flex items-start gap-4 py-6 border-t border-borderLight"
            >
              <Icon
                size={18}
                className="mt-0.5 flex-shrink-0 text-pillAccentText"
              />
              <div className="flex flex-col gap-1.5">
                <p className="font-semibold text-foreground text-base leading-snug">
                  {item.title}
                </p>
                <p className="text-sm font-medium text-muted leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Deliverables;
