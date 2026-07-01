import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ResultCard = ({ title }) => (
  <div className="cr-element flex flex-col bg-surface rounded-xl overflow-hidden">
    <div className="w-full bg-surface2 px-2 md:px-10 pt-4 md:pt-8 pb-4 md:pb-8">
      <div
        className="w-full overflow-hidden rounded-lg"
        style={{ aspectRatio: "1344 / 235" }}
      >
        <img
          src={`${import.meta.env.BASE_URL}campaign_result1.png`}
          alt="Campaign result screenshot"
          className="w-full h-full object-cover"
        />
      </div>
    </div>

    <div className="flex flex-col gap-2 px-8 md:px-10 py-8 bg-surface">
      <h3 className="text-xl font-semibold text-foreground leading-tight tracking-tight">
        {title}
      </h3>
      <p className="text-base font-medium text-muted leading-relaxed">
        B2B Service Firm targeting both broad and tech-specific markets
      </p>
    </div>
  </div>
);

const CampaignResults = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cr-element",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 95%",
            once: true,
          },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="results"
      ref={sectionRef}
      className="w-full bg-background py-12 md:py-24 px-4 md:px-16 lg:px-96"
    >
      <div>
        <div className="cr-element mb-10 flex flex-col items-start text-left gap-6">
          <span className="text-[9px] md:text-[11px] font-mono font-semibold uppercase tracking-[0.16em] leading-none px-3 py-2 rounded-full bg-[#3799f7]/25 backdrop-blur-sm text-[#89c4ff]">
            Client Results
          </span>
          <h2 className="text-3xl md:text-4xl font-medium text-foreground font-serif leading-tight max-w-3xl">
            Our Clients Are Booking Qualified Calls
          </h2>
        </div>
        <ResultCard title="28 sales meetings booked - $256,400 projected revenue created" />
      </div>
    </section>
  );
};

export default CampaignResults;
