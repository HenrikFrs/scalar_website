import React, { useState, useEffect, useRef } from "react";
import { Database, PenLine, Server } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Card 1 — List Building: scored prospect cards cycle through
const ProspectScorer = () => {
  const prospects = [
    { name: "Sarah M. — VP Sales", score: 94, fit: "Strong fit" },
    { name: "James T. — Head of Ops", score: 81, fit: "Good fit" },
    { name: "Lena K. — Founder", score: 97, fit: "Ideal ICP" },
  ];
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setIdx((p) => (p + 1) % prospects.length),
      2800,
    );
    return () => clearInterval(t);
  }, []);

  const current = prospects[idx];

  return (
    <div className="h-48 w-full bg-surface2 p-5 flex flex-col justify-between overflow-hidden relative border border-pillBorder">
      <div className="flex items-center gap-2 mb-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#5b8dee] animate-pulse"></span>
        <span className="text-[10px] font-mono text-muted tracking-wider uppercase">
          Scoring
        </span>
      </div>

      <div className="flex flex-col gap-2 transition-all duration-500">
        <p className="font-mono text-xs text-foreground">{current.name}</p>
        <div className="flex items-center gap-3">
          <div className="flex-1 h-1.5 bg-surface rounded-full overflow-hidden">
            <div
              className="h-full bg-[#5b8dee] rounded-full transition-all duration-700"
              style={{ width: `${current.score}%` }}
            />
          </div>
          <span className="text-[10px] font-mono text-[#5b8dee] w-6 text-right">
            {current.score}
          </span>
        </div>
        <span className="self-start text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#14349D]/20 border border-[#14349D]/30 text-[#5b8dee]">
          {current.fit}
        </span>
      </div>

      <div className="flex justify-between items-center pt-3 mt-2">
        <span className="text-[10px] font-mono text-muted uppercase">
          Prospect visited
        </span>
        <span className="text-[10px] font-mono text-foreground">
          LinkedIn + Website ✓
        </span>
      </div>
    </div>
  );
};

// Card 2 — Copywriting: static copy, only variable slots cycle through real values
const CopyTypewriter = () => {
  const variables = {
    first_name: ["Sarah", "James", "Lena", "Marcus"],
    company: ["Notion", "Stripe", "Linear", "Vercel"],
    trigger: ["hiring 3 AEs", "expanding to EU", "just raised Series B", "rebranding"],
  };
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setIdx((p) => (p + 1) % variables.first_name.length),
      2200,
    );
    return () => clearInterval(t);
  }, []);

  const Var = ({ name }) => (
    <span
      key={`${name}-${idx}`}
      className="text-[#5b8dee] bg-[#14349D]/20 rounded px-0.5 transition-all duration-300"
    >
      {variables[name][idx]}
    </span>
  );

  return (
    <div className="h-48 w-full bg-surface2 p-5 flex flex-col overflow-hidden border border-pillBorder">
      <div className="flex items-center gap-2 mb-3">
        <span className="w-1.5 h-1.5 rounded-full bg-[#5b8dee] animate-pulse"></span>
        <span className="text-[10px] font-mono text-muted tracking-wider uppercase">
          Live Copy
        </span>
      </div>
      <p className="text-xs text-foreground leading-relaxed flex-1">
        Hey <Var name="first_name" />, noticed{" "}
        <Var name="company" /> is{" "}
        <Var name="trigger" /> — thought it might be a good time to chat about adding qualified meetings to the pipeline. Worth a quick call?
      </p>
      <div className="flex gap-2 mt-3 flex-wrap pt-3">
        {["first_name", "company", "trigger"].map((v) => (
          <span
            key={v}
            className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#14349D]/20 border border-[#14349D]/30 text-[#5b8dee]"
          >
            {`{${v}}`}
          </span>
        ))}
      </div>
    </div>
  );
};

// Card 3 — Infrastructure: deliverability monitor cycling through domains
const DeliverabilityMonitor = () => {
  const domains = [
    "outreach-hq.com",
    "get-scalar.com",
    "scalar-mail.com",
    "grow-scalar.com",
  ];
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setActiveIdx((p) => (p + 1) % domains.length),
      1100,
    );
    return () => clearInterval(t);
  }, []);

  return (
    <div className="h-48 w-full bg-surface2 p-5 flex flex-col overflow-hidden border border-pillBorder">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
          <span className="text-[10px] font-mono text-muted tracking-wider uppercase">
            Delivery Monitor
          </span>
        </div>
        <span className="text-[10px] font-mono text-green-400">
          98.4% inbox
        </span>
      </div>

      <div className="flex-1 flex flex-col gap-2">
        {domains.map((domain, i) => (
          <div
            key={domain}
            className={`flex items-center justify-between transition-all duration-400 ${
              i <= activeIdx ? "opacity-100" : "opacity-20"
            }`}
          >
            <span className="text-[10px] font-mono text-muted">{domain}</span>
            <span
              className={`text-[9px] font-mono px-1.5 py-0.5 rounded-full transition-all duration-400 ${
                i <= activeIdx
                  ? "bg-green-950/40 border border-green-900/40 text-green-400"
                  : "bg-surface text-muted"
              }`}
            >
              {i <= activeIdx ? "✓ Primary Inbox" : "— pending"}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between pt-3 mt-1">
        <span className="text-[10px] font-mono text-muted">
          10 domains · 100 inboxes
        </span>
        <span className="text-[10px] font-mono text-[#5b8dee]">
          2,000 / day
        </span>
      </div>
    </div>
  );
};

// --- MAIN COMPONENT ---
const Advantage = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".adv-card", {
        y: 30,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const cards = [
    {
      icon: <Database size={20} className="text-foreground" />,
      title: "Prospects That Fit",
      description:
        "We score every prospect based on your ideal customer profile and make sure they are the right fit before a single message is sent.",
      widget: <ProspectScorer />,
    },
    {
      icon: <PenLine size={20} className="text-foreground" />,
      title: "Copy That Feels Genuine",
      description:
        "We write copy that feels genuine and not like an advertisement. Every Message is deeply personalized with dynamic variables that are proven to increase response rates.",
      widget: <CopyTypewriter />,
    },
    {
      icon: <Server size={20} className="text-foreground" />,
      title: "Infrastructure That Scales",
      description:
        "Our infrastructure is designed so that messages consistently land in main inboxes where they actually get seen. Your domain and inboxes remain untouched.",
      widget: <DeliverabilityMonitor />,
    },
  ];

  return (
    <section
      id="advantage"
      ref={sectionRef}
      className="py-16 md:py-24 px-4 md:px-16 lg:px-96 bg-background relative z-10/50"
    >
      <div>
        <div className="mb-16 md:mb-24 flex flex-col items-start text-left gap-4">
          <h2 className="text-4xl md:text-5xl font-medium tracking-normal text-foreground font-serif leading-tight pb-2">
            Why It Works
          </h2>
          <p className="text-lg text-muted max-w-md font-medium">
            Here's how we stand out and outperform anything your competitors are
            sending.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {cards.map((card) => (
            <div
              key={card.title}
              className="adv-card bg-surface rounded-3xl p-8 md:p-10 flex flex-col"
            >
              <h3 className="font-medium text-xl mb-3 text-foreground flex items-center gap-3 pb-1">
                <span className="w-10 h-10 rounded-full bg-surface2 flex items-center justify-center flex-shrink-0">
                  {card.icon}
                </span>
                {card.title}
              </h3>
              <p className="text-muted mb-8 text-sm leading-relaxed flex-1">
                {card.description}
              </p>
              {card.widget}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Advantage;
