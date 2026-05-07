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
    <div className="h-48 w-full bg-surface2 rounded-xl border border-borderLight p-5 flex flex-col justify-between overflow-hidden relative">
      <div className="flex items-center gap-2 mb-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#5b8dee] animate-pulse"></span>
        <span className="text-[10px] font-mono text-muted tracking-wider uppercase">
          AI Scoring
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

      <div className="flex justify-between items-center border-t border-borderLight pt-3 mt-2">
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

// Card 2 — Copywriting: typewriter with variable highlights
const CopyTypewriter = () => {
  const lines = [
    { text: "Hey {first_name}, saw that {company} recently ", variable: false },
    { text: "expanded into {market}", variable: true },
    { text: " — we help teams like yours book", variable: false },
    { text: " {value_prop}", variable: true },
    { text: " consistently.", variable: false },
  ];

  const fullText =
    "Hey {first_name}, saw that {company} recently expanded into {market} — we help teams like yours book {value_prop} consistently.";
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    let timeout;
    if (typing) {
      if (displayed.length < fullText.length) {
        timeout = setTimeout(
          () => setDisplayed(fullText.slice(0, displayed.length + 1)),
          35 + Math.random() * 30,
        );
      } else {
        timeout = setTimeout(() => setTyping(false), 2500);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 12);
      } else {
        setTyping(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing]);

  // Highlight variables in the displayed text
  const renderHighlighted = () => {
    const parts = displayed.split(/(\{[^}]+\})/g);
    return parts.map((part, i) =>
      /^\{[^}]+\}$/.test(part) ? (
        <span key={i} className="text-[#5b8dee] bg-[#14349D]/20 rounded px-0.5">
          {part}
        </span>
      ) : (
        <span key={i}>{part}</span>
      ),
    );
  };

  return (
    <div className="h-48 w-full bg-surface2 rounded-xl border border-borderLight p-5 flex flex-col overflow-hidden">
      <div className="flex items-center gap-2 mb-3">
        <span className="w-1.5 h-1.5 rounded-full bg-foreground animate-pulse"></span>
        <span className="text-[10px] font-mono text-muted tracking-wider uppercase">
          Live Copy
        </span>
      </div>
      <p className="font-mono text-xs text-foreground leading-relaxed flex-1">
        <span className="text-muted mr-1">›</span>
        {renderHighlighted()}
        <span className="inline-block w-1.5 h-3 bg-foreground ml-0.5 animate-pulse align-middle"></span>
      </p>
      <div className="flex gap-2 mt-3 flex-wrap">
        {["{first_name}", "{company}", "{market}", "{value_prop}"].map((v) => (
          <span
            key={v}
            className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#14349D]/20 border border-[#14349D]/30 text-[#5b8dee]"
          >
            {v}
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
    <div className="h-48 w-full bg-surface2 rounded-xl border border-borderLight p-5 flex flex-col overflow-hidden">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
          <span className="text-[10px] font-mono text-muted tracking-wider uppercase">
            Delivery Monitor
          </span>
        </div>
        <span className="text-[10px] font-mono text-green-400">98.4% inbox</span>
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
                  : "bg-surface border border-borderLight text-muted"
              }`}
            >
              {i <= activeIdx ? "✓ Primary Inbox" : "— pending"}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-borderLight pt-3 mt-1">
        <span className="text-[10px] font-mono text-muted">
          10 domains · 100 inboxes
        </span>
        <span className="text-[10px] font-mono text-[#5b8dee]">2,000 / day</span>
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
      title: "List Building",
      description:
        "Our system scores every prospect based on your ideal customer profile and make sure they are the right fit before a single message is sent.",
      widget: <ProspectScorer />,
    },
    {
      icon: <PenLine size={20} className="text-foreground" />,
      title: "Copywriting",
      description:
        "We use AI-filled variables in our copy that make the messaging feel personal and natural, while keeping the core components static so we can test, iterate, and improve results over time.",
      widget: <CopyTypewriter />,
    },
    {
      icon: <Server size={20} className="text-foreground" />,
      title: "Infrastructure that Scales",
      description:
        "Our infrastructure is designed to handle high volumes of messages that consistently land in the main inbox so you can scale your outreach without compromising performance.",
      widget: <DeliverabilityMonitor />,
    },
  ];

  return (
    <section
      id="advantage"
      ref={sectionRef}
      className="py-24 px-6 md:px-12 lg:px-24 bg-background relative z-10 border-t border-borderLight/50"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-6xl font-medium tracking-normal text-foreground font-sans mb-4 leading-tight pb-2">
              Our Advantage
            </h2>
          </div>
          <p className="text-lg text-muted max-w-md font-medium">
            Here's how we stand out and outperform anything your competitors are
            sending.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {cards.map((card) => (
            <div
              key={card.title}
              className="adv-card bg-surface rounded-3xl p-8 md:p-10 flex flex-col border border-borderLight hover:border-foreground/20 transition-colors"
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
