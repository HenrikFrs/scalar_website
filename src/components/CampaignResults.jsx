import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const clients = ["Founder Sales", "Kontaktkompass", "Secondcity AI"];

const ResultRow = ({ label, stat, image }) => (
  <div className="flex flex-col gap-4 p-4 md:p-6">
    <div className="flex flex-col gap-2.5">
      <span className="pill-tag w-fit">{label}</span>
      <p className="text-lg md:text-xl text-heading leading-snug">{stat}</p>
    </div>
    <div
      className="w-full overflow-hidden border border-border"
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
        ".cr-window",
        { y: 32, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, ease: "power3.out", delay: 0.4 },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="results" ref={sectionRef}>
      <div className="shell pb-16 md:pb-24">
        <div className="cr-window max-w-[920px] mx-auto border border-border bg-background">
          <div className="px-4 md:px-6 py-3.5 border-b border-border">
            <span className="text-[14px] text-heading">Recent campaigns</span>
          </div>
          <div className="divide-y divide-border">
            <ResultRow
              label="Broad B2B"
              stat="42 sales meetings booked across a broad B2B market"
              image="client_result_kontaktkompass.png"
            />
            <ResultRow
              label="Finance & SaaS"
              stat="16 sales meetings booked targeting financial services & SaaS"
              image="client_results_scalar.png"
            />
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 text-center">
          <span className="text-[14px] text-muted">Trusted by teams at</span>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            {clients.map((client) => (
              <span key={client} className="text-[15px] text-body">
                {client}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CampaignResults;
