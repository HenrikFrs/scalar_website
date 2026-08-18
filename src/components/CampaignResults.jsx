import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ResultCard = ({ stat, image }) => (
  <div className="cr-element flex flex-col bg-surface border border-borderLight overflow-hidden px-8 md:px-10 pt-6 md:pt-8 pb-4 md:pb-8 gap-4">
    <p className="text-sm md:text-lg font-semibold text-foreground leading-snug">
      {stat}
    </p>
    <div
      className="w-full overflow-hidden"
      style={{ aspectRatio: "1469 / 241" }}
    >
      <img
        src={`${import.meta.env.BASE_URL}${image}`}
        alt="Campaign result screenshot"
        className="w-full h-full object-cover"
      />
    </div>
  </div>
);

const CampaignResults = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cr-element",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
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
      className="w-full bg-background py-12 md:py-24 px-4 md:px-16 lg:px-96 flex flex-col gap-6"
    >
      <ResultCard
        stat="42 sales meetings booked across a broad B2B market"
        image="client_result_kontaktkompass.png"
      />
      <ResultCard
        stat="16 sales meetings booked targeting financial services & SaaS"
        image="client_results_scalar.png"
      />
    </section>
  );
};

export default CampaignResults;
