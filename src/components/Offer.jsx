import React, { useEffect, useRef } from "react";
import { Check } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const items = [
  {
    bold: true,
    text: "Flat per-call fee for every meeting booked — you only pay for results",
  },
  {
    bold: true,
    text: "Software costs passed through in a single tech fee — no markup: domains, inboxes, contact data, sending platform, and enrichments",
  },
  {
    bold: false,
    text: "Everything is set up in your company's name — you own it completely",
  },
  { bold: false, text: "Two-month minimum to get the system dialled in" },
  {
    bold: false,
    text: "No lock-in after that — Leave anytime if you're not happy",
  },
];

const Offer = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".offer-header", {
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
      gsap.from(".offer-item", {
        y: 16,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".offer-list", start: "top 80%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="offer"
      ref={sectionRef}
      className="py-12 md:py-24 px-4 md:px-16 lg:px-96 bg-background"
    >
      <div className="offer-header flex flex-col items-start gap-6 mb-16">
        <span className="text-[9px] md:text-[11px] font-mono font-semibold uppercase tracking-[0.16em] leading-none px-3 py-2 rounded-full bg-[#3799f7]/25 backdrop-blur-sm text-[#89c4ff]">
          The Offer
        </span>
        <h2 className="text-3xl md:text-4xl font-medium text-foreground font-serif leading-tight max-w-3xl">
          Performance-Based Pricing
        </h2>
      </div>

      <div className="offer-list bg-surface rounded-xl p-8 flex flex-col gap-4">
        {items.map((item, index) => (
          <div key={index} className="offer-item flex items-start gap-3">
            <Check
              size={16}
              className="mt-0.5 flex-shrink-0"
              style={{ color: "#89c4ff" }}
            />
            <p
              className={`text-base font-semibold leading-relaxed ${item.bold ? "text-foreground" : "text-muted"}`}
            >
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Offer;
