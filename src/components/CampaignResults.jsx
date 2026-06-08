import React from "react";

const ResultCard = ({ chip, title }) => (
  <div className="cr-element flex flex-col gap-0 bg-surface rounded-none overflow-hidden border border-pillBorder">
    <div className="flex flex-col gap-3 px-8 md:px-10 py-8 bg-surface">
      <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-muted">
        {chip}
      </span>
      <h3 className="text-xl md:text-2xl font-semibold text-foreground leading-tight tracking-tight">
        {title}
      </h3>
    </div>

    <div
      className="w-full overflow-hidden"
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
  return (
    <section
      id="results"
      className="w-full bg-background py-12 md:py-24 px-4 md:px-16 lg:px-96"
    >
      <div>
        <div className="cr-element mb-10 flex flex-col items-start text-left gap-4">
          <div
            className="flex items-center px-4 py-2"
            style={{
              backgroundColor: "rgba(59,130,246,0.1)",
              backdropFilter: "blur(8px)",
              borderRadius: "9999px",
            }}
          >
            <span
              className="text-[9px] md:text-[11px] font-mono uppercase tracking-[0.16em] leading-none translate-y-px"
              style={{ color: "#3b82f6" }}
            >
              Client Results
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-medium text-foreground font-serif leading-tight">
            Our clients are booking calls and closing deals
          </h2>
        </div>
        <ResultCard
          chip="Software & Mixed-Market Campaigns"
          title="26 sales meetings booked - $218,400 pipeline created"
        />
      </div>
    </section>
  );
};

export default CampaignResults;
