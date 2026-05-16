import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ResultCard = ({ chip, title }) => (
  <div className="cr-element bg-surface border border-borderLight rounded-[2rem] p-8 md:p-10 flex flex-col gap-6">
    <span className="self-start inline-flex items-center gap-1.5 bg-surface2 border border-borderLight text-muted text-xs font-mono px-3 py-1.5 rounded-full">
      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
      {chip}
    </span>

    <h3 className="text-2xl md:text-3xl font-semibold text-foreground leading-tight tracking-tight">
      {title}
    </h3>

    <div
      className="w-full rounded-[1.25rem] overflow-hidden border border-borderLight"
      style={{ aspectRatio: "1344 / 235" }}
    >
      <img
        src={`${import.meta.env.BASE_URL}campaign_result1.png`}
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
      gsap.from(".cr-element", {
        y: 30,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="results"
      ref={sectionRef}
      className="w-full bg-background py-24 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 flex flex-col items-center text-center gap-4">
          <h2 className="cr-element text-4xl md:text-5xl font-medium tracking-normal text-foreground font-sans leading-tight pb-2">
            Client Results
          </h2>
          <p className="cr-element text-lg text-muted max-w-md font-medium">
            Here's what happens when you combine AI with proven cold email
            systems.
          </p>
        </div>

        <ResultCard
          chip="Software & Mixed-Market Campaigns"
          title="10% reply rate. 13 sales meetings booked."
        />
      </div>
    </section>
  );
};

export default CampaignResults;
