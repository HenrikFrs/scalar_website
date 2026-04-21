import React, { useState, useEffect, useRef } from "react";
import { Database, PenLine, MessageCircleReply } from "lucide-react";
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
    const t = setInterval(() => setIdx((p) => (p + 1) % prospects.length), 2800);
    return () => clearInterval(t);
  }, []);

  const current = prospects[idx];

  return (
    <div className="h-48 w-full bg-surface2 rounded-xl border border-borderLight p-5 flex flex-col justify-between overflow-hidden relative">
      <div className="flex items-center gap-2 mb-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#5b8dee] animate-pulse"></span>
        <span className="text-[10px] font-mono text-muted tracking-wider uppercase">AI Scoring</span>
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
          <span className="text-[10px] font-mono text-[#5b8dee] w-6 text-right">{current.score}</span>
        </div>
        <span className="self-start text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#14349D]/20 border border-[#14349D]/30 text-[#5b8dee]">
          {current.fit}
        </span>
      </div>

      <div className="flex justify-between items-center border-t border-borderLight pt-3 mt-2">
        <span className="text-[10px] font-mono text-muted uppercase">Prospect visited</span>
        <span className="text-[10px] font-mono text-foreground">LinkedIn + Website ✓</span>
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

  const fullText = "Hey {first_name}, saw that {company} recently expanded into {market} — we help teams like yours book {value_prop} consistently.";
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    let timeout;
    if (typing) {
      if (displayed.length < fullText.length) {
        timeout = setTimeout(() => setDisplayed(fullText.slice(0, displayed.length + 1)), 35 + Math.random() * 30);
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
      /^\{[^}]+\}$/.test(part)
        ? <span key={i} className="text-[#5b8dee] bg-[#14349D]/20 rounded px-0.5">{part}</span>
        : <span key={i}>{part}</span>
    );
  };

  return (
    <div className="h-48 w-full bg-surface2 rounded-xl border border-borderLight p-5 flex flex-col overflow-hidden">
      <div className="flex items-center gap-2 mb-3">
        <span className="w-1.5 h-1.5 rounded-full bg-foreground animate-pulse"></span>
        <span className="text-[10px] font-mono text-muted tracking-wider uppercase">Live Copy</span>
      </div>
      <p className="font-mono text-xs text-foreground leading-relaxed flex-1">
        <span className="text-muted mr-1">›</span>
        {renderHighlighted()}
        <span className="inline-block w-1.5 h-3 bg-foreground ml-0.5 animate-pulse align-middle"></span>
      </p>
      <div className="flex gap-2 mt-3 flex-wrap">
        {["{first_name}", "{company}", "{market}", "{value_prop}"].map((v) => (
          <span key={v} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#14349D]/20 border border-[#14349D]/30 text-[#5b8dee]">{v}</span>
        ))}
      </div>
    </div>
  );
};

// Card 3 — Reply handling: simulated reply → AI response flow
const ReplyFlow = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const steps = [0, 1, 2, 3];
    let i = 0;
    const advance = () => {
      i = (i + 1) % steps.length;
      setStep(i);
    };
    const t = setInterval(advance, 1800);
    return () => clearInterval(t);
  }, []);

  const messages = [
    { label: "Prospect", text: "Hey, this looks interesting. What does pricing look like?", active: step >= 0 },
    { label: "AI Analysis", text: "Detected intent: interested. Generating contextual reply...", active: step >= 1, mono: true, accent: true },
    { label: "Draft ready", text: "Hi — happy to walk you through it. Are you free for a quick call this week?", active: step >= 2 },
    { label: "Notified", text: "🔔 You've been notified. Review & send in 1 click.", active: step >= 3, mono: true },
  ];

  return (
    <div className="h-48 w-full bg-surface2 rounded-xl border border-borderLight p-4 flex flex-col gap-2 overflow-hidden">
      <div className="flex items-center gap-2 mb-1">
        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
        <span className="text-[10px] font-mono text-muted tracking-wider uppercase">Reply System</span>
      </div>
      {messages.map((m, i) => (
        <div
          key={i}
          className={`transition-all duration-500 ${m.active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"}`}
        >
          <p className={`text-[10px] leading-snug ${m.mono ? "font-mono" : ""} ${m.accent ? "text-[#5b8dee]" : "text-foreground/80"}`}>
            <span className="text-muted mr-1">{m.label}:</span>{m.text}
          </p>
        </div>
      ))}
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
        "Our AI visits the website and LinkedIn of every prospect to score them based on your ideal customer profile and make sure they are the right fit before a single message is sent.",
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
      icon: <MessageCircleReply size={20} className="text-foreground" />,
      title: "Reply Handling & Follow-Ups",
      description:
        "Our reply-to-call system notifies you on every interested reply and generates an AI response based on your offer, your tone, and the conversation context — bridging the gap between interest and booked call.",
      widget: <ReplyFlow />,
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
            Here's how we leverage AI to stand out and outperform everything your competitors are sending.
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
