import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeader } from "./ui";

gsap.registerPlugin(ScrollTrigger);

const campaigns = [
  {
    label: "Broad B2B",
    stat: "216 opportunities and 80 sales calls from 20,000 contacts",
    image: "Kontaktkompass_Campaigns.png",
    width: 1473,
    height: 183,
    alt: "Campaign dashboard: 38,814 emails sent to 20,407 leads, 2,274 replies at an 11.14% reply rate, and 216 positive replies.",
  },
  {
    label: "Finance & SaaS",
    stat: "119 opportunities and 23 sales calls from 31,000 contacts",
    image: "Scalar_Campaigns.png",
    width: 1474,
    height: 183,
    alt: "Campaign dashboard: 57,660 emails sent to 31,782 leads, 608 replies at a 1.91% reply rate, and 119 positive replies.",
  },
];

const CampaignRow = ({ label, stat, image, width, height, alt }) => (
  <div className="p-6 md:p-8 flex flex-col gap-4">
    <div className="flex flex-col gap-3">
      <span className="pill-tag w-fit">{label}</span>
      <h3 className="type-title text-heading">{stat}</h3>
    </div>
    <div className="border border-borderLight">
      <img
        src={`${import.meta.env.BASE_URL}${image}`}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        className="block w-full h-auto"
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
        duration: 1.2,
        stagger: 0.15,
        ease: "expo.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="campaigns" ref={sectionRef} className="section-line">
      <div className="shell section-y">
        <SectionHeader
          className="cr-element mb-12"
          eyebrow="Campaign Screenshots"
          title="Selected client campaigns"
        />

        <div className="cr-element border border-borderLight divide-y divide-borderLight">
          {campaigns.map((campaign) => (
            <CampaignRow key={campaign.image} {...campaign} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CampaignResults;
