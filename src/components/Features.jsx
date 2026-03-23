import React, { useState, useEffect, useRef } from "react";
import { Network, Activity, Presentation } from "lucide-react";
import gsap from "gsap";

// --- SHUFFLER (Automatisierte Workflows) ---
const Shuffler = () => {
  const [cards, setCards] = useState([
    {
      id: 1,
      title: "Lead antwortet in 90 Sek.",
      color: "bg-surface text-foreground",
    },
    {
      id: 2,
      title: "Termin automatisch gebucht",
      color: "bg-surface2 text-foreground",
    },
    {
      id: 3,
      title: "Follow-up gesendet",
      color: "bg-foreground text-background",
    },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCards((prev) => {
        const newCards = [...prev];
        const last = newCards.pop();
        newCards.unshift(last);
        return newCards;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-48 w-full flex items-center justify-center">
      {cards.map((card, idx) => {
        const isTop = idx === 0;
        const scale = 1 - idx * 0.05;
        const translateY = idx * -12;
        const opacity = 1 - idx * 0.2;
        const zIndex = 30 - idx * 10;

        return (
          <div
            key={card.id}
            className={`absolute w-4/5 h-20 rounded-xl border ${card.color === "bg-foreground text-background" ? "border-foreground" : "border-borderLight"} shadow-sm flex items-center px-4 font-mono text-xs transition-spring ${card.color}`}
            style={{
              transform: `translateY(${translateY}px) scale(${scale})`,
              opacity,
              zIndex,
            }}
          >
            <div
              className={`w-1.5 h-1.5 rounded-full mr-3 ${isTop ? (card.color === "bg-foreground text-background" ? "bg-surface animate-pulse" : "bg-foreground animate-pulse") : "bg-muted/50"}`}
            ></div>
            {card.title}
          </div>
        );
      })}
    </div>
  );
};

// --- TYPEWRITER (KI-gestützte Kundengewinnung) ---
const Typewriter = () => {
  const messages = [
    "Generiere personalisierte Outreach-Sequenz...",
    "Skaliere UGC-Kampagne auf Zielsegment...",
    "Identifiziere High-Intent Prospects...",
    "Erstelle Outbound-Kampagne für Q2...",
    "Analysiere Conversion-Daten in Echtzeit...",
  ];

  const [text, setText] = useState("");
  const [msgIdx, setMsgIdx] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let timeout;
    const currentMsg = messages[msgIdx];

    if (isTyping) {
      if (text.length < currentMsg.length) {
        timeout = setTimeout(
          () => {
            setText(currentMsg.slice(0, text.length + 1));
          },
          40 + Math.random() * 40,
        );
      } else {
        timeout = setTimeout(() => setIsTyping(false), 2000);
      }
    } else {
      if (text.length > 0) {
        timeout = setTimeout(() => {
          setText(text.slice(0, -1));
        }, 15);
      } else {
        setMsgIdx((prev) => (prev + 1) % messages.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [text, isTyping, msgIdx, messages]);

  return (
    <div className="h-48 w-full bg-surface2 rounded-xl flex flex-col p-4 relative overflow-hidden border border-borderLight shadow-inner">
      <div className="flex items-center gap-2 mb-3">
        <span className="w-1.5 h-1.5 rounded-full bg-foreground animate-pulse"></span>
        <span className="text-[10px] font-mono text-muted tracking-wider uppercase">
          Live Outreach
        </span>
      </div>
      <div className="font-mono text-xs text-foreground leading-relaxed">
        <span className="text-muted mr-2">{">"}</span>
        {text}
        <span className="inline-block w-1.5 h-3 bg-foreground ml-1 animate-pulse"></span>
      </div>
    </div>
  );
};

// --- SCHEDULER (KI- und Automatisierungsberatung) ---
const ChartAnimation = () => {
  return (
    <div className="h-48 w-full bg-surface rounded-xl border border-borderLight p-5 relative overflow-hidden flex flex-col justify-end gap-2">
      <div className="absolute top-4 left-4 text-[10px] font-mono text-muted uppercase">
        Umsatz-Impact
      </div>

      {/* Abstract minimal bar chart */}
      <div className="flex items-end justify-between w-full h-24 gap-2 mt-auto">
        <div className="w-full bg-surface2 rounded-t-sm h-[30%] relative overflow-hidden">
          <div
            className="absolute bottom-0 left-0 w-full h-full bg-foreground/10 origin-bottom"
            style={{ animation: "growBar 4s ease-out infinite alternate" }}
          ></div>
        </div>
        <div className="w-full bg-surface2 rounded-t-sm h-[45%] relative overflow-hidden">
          <div
            className="absolute bottom-0 left-0 w-full h-full bg-foreground/20 origin-bottom"
            style={{ animation: "growBar 4s ease-out infinite alternate 0.5s" }}
          ></div>
        </div>
        <div className="w-full bg-surface2 rounded-t-sm h-[20%] relative overflow-hidden">
          <div
            className="absolute bottom-0 left-0 w-full h-full bg-foreground/10 origin-bottom"
            style={{ animation: "growBar 4s ease-out infinite alternate 1s" }}
          ></div>
        </div>
        <div className="w-full bg-surface2 rounded-t-sm h-[60%] relative overflow-hidden">
          <div
            className="absolute bottom-0 left-0 w-full h-full bg-foreground/40 origin-bottom"
            style={{ animation: "growBar 4s ease-out infinite alternate 1.5s" }}
          ></div>
        </div>
        <div className="w-full bg-foreground rounded-t-sm h-[85%] relative overflow-hidden">
          <div
            className="absolute bottom-0 left-0 w-full h-full bg-background/20 origin-bottom"
            style={{ animation: "growBar 4s ease-out infinite alternate 2s" }}
          ></div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-2 border-t border-borderLight pt-2">
        <div className="text-[10px] font-mono text-muted">UMSATZ-POTENZIAL</div>
        <div className="text-[10px] font-mono font-bold text-foreground">
          +340%
        </div>
      </div>

      <style>{`
        @keyframes growBar {
          0% { transform: scaleY(0.1); }
          100% { transform: scaleY(1); }
        }
      `}</style>
    </div>
  );
};

// --- EXPORTED FEATURES COMPONENT ---
const Features = () => {
  return (
    <section
      id="features"
      className="py-24 px-6 md:px-12 lg:px-24 bg-background relative z-10 border-t border-borderLight/50"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-6xl font-medium tracking-normal text-foreground font-sans mb-4 leading-tight pb-2">
              Worauf wir <br />
              <span className="text-muted/80">spezialisiert sind</span>
            </h2>
          </div>
          <p className="text-lg text-muted max-w-md font-medium">
            Scalar AI baut KI- und Automatisierungssysteme für Lead-Generierung,
            Sales und operative Prozesse.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-surface rounded-3xl p-8 md:p-10 flex flex-col border border-borderLight hover:border-foreground/20 transition-colors">
            <h3 className="font-medium text-xl mb-3 text-foreground flex items-center gap-3 pb-1">
              <span className="w-10 h-10 rounded-full bg-surface2 flex items-center justify-center flex-shrink-0">
                <Network size={20} className="text-foreground" />
              </span>
              Sales-Systeme
            </h3>
            <p className="text-muted mb-8 text-sm leading-relaxed flex-1">
              KI-Agenten antworten Leads in Sekunden, buchen automatisch Termine
              in Ihren Kalender und fassen konsequent nach.
            </p>
            <Shuffler />
          </div>

          <div className="bg-surface rounded-3xl p-8 md:p-10 flex flex-col border border-borderLight hover:border-foreground/20 transition-colors">
            <h3 className="font-medium text-xl mb-3 text-foreground flex items-center gap-3 pb-1">
              <span className="w-10 h-10 rounded-full bg-surface2 flex items-center justify-center flex-shrink-0">
                <Activity size={20} className="text-foreground" />
              </span>
              Lead-Gen-Systeme
            </h3>
            <p className="text-muted mb-8 text-sm leading-relaxed flex-1">
              Personalisierter Outbound und skalierbare Ads/UGC-Systeme, die
              Ihnen täglich neue, qualifizierte Leads liefern.
            </p>
            <Typewriter />
          </div>

          <div className="bg-surface rounded-3xl p-8 md:p-10 flex flex-col border border-borderLight hover:border-foreground/20 transition-colors">
            <h3 className="font-medium text-xl mb-3 text-foreground flex items-center gap-3 pb-1">
              <span className="w-10 h-10 rounded-full bg-surface2 flex items-center justify-center flex-shrink-0">
                <Presentation size={20} className="text-foreground" />
              </span>
              Backend-Systeme
            </h3>
            <p className="text-muted mb-8 text-sm leading-relaxed flex-1">
              Maßgeschneiderte automatisierte Systeme für mehr Output und
              weniger Overhead.
            </p>
            <ChartAnimation />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
