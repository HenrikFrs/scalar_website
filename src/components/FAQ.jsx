import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-borderLight">
      <button
        className="w-full py-6 flex items-center justify-between text-left group"
        onClick={onClick}
      >
        <span
          className={`text-lg md:text-xl font-medium font-sans pr-8 transition-colors ${isOpen ? "text-foreground font-medium" : "text-foreground/80 group-hover:text-foreground"}`}
        >
          {question}
        </span>
        <div
          className={`flex-shrink-0 w-6 h-6 flex items-center justify-center transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
        >
          <ChevronDown
            size={20}
            className="text-muted group-hover:text-foreground transition-colors"
          />
        </div>
      </button>

      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: isOpen ? "500px" : "0", opacity: isOpen ? 1 : 0 }}
      >
        <div className="pb-8 text-muted leading-relaxed">{answer}</div>
      </div>
    </div>
  );
};

const FAQ = () => {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: "Wie schnell sehe ich erste Ergebnisse?",
      a: "Die meisten Kunden sehen erste messbare Ergebnisse innerhalb von 2–4 Wochen nach dem Kickoff. Komplexere Stacks wie Lead Generation oder Proposal-Automatisierung brauchen etwas mehr Vorlaufzeit.",
    },
    {
      q: "Was passiert im Strategiegespräch?",
      a: "Das Strategiegespräch dauert ca. 30 Minuten und ist völlig unverbindlich. Wir schauen uns gemeinsam Ihr Geschäftsmodell, Ihre aktuelle Vertriebssituation und Ihre Prozesse an — und zeigen Ihnen konkret, welche KI-Systeme bei Ihnen den größten Hebel für Wachstum haben. Kein Pitch, keine Verkaufspräsentation. Sie gehen raus mit einem klaren Bild, was möglich ist.",
    },
    {
      q: "Funktioniert das mit unserem bestehenden Tool-Stack?",
      a: "In der Regel ja. Unsere Systeme integrieren sich über APIs in die Tools, die Sie bereits nutzen — darunter gängige CRMs wie HubSpot oder Pipedrive, Kalender-Tools, E-Mail-Systeme und Outreach-Plattformen. Im Strategiegespräch klären wir, was bei Ihnen im Einsatz ist und wie die Integration aussieht.",
    },
    {
      q: "Wer wartet die Systeme nach dem Rollout?",
      a: "Wir. APIs ändern sich, Plattformen entwickeln sich weiter — ein System, das heute läuft, muss aktiv betreut werden. Deshalb bieten wir Maintenance-Packages an, bei denen wir Ihre Systeme kontinuierlich überwachen, bei Änderungen proaktiv eingreifen und bei Bedarf weiterentwickeln.",
    },
  ];

  return (
    <section
      id="faq"
      className="py-32 px-6 md:px-12 lg:px-24 bg-background border-t border-borderLight"
    >
      <div className="max-w-4xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl md:text-6xl font-medium tracking-normal text-foreground font-sans mb-4 pb-2">
            Häufige Fragen
          </h2>
          <p className="text-lg text-muted font-medium">
            Klare Antworten auf die wichtigsten Fragen.
          </p>
        </div>

        <div className="border-t border-borderLight flex flex-col">
          {faqs.map((faq, idx) => (
            <FAQItem
              key={idx}
              question={faq.q}
              answer={faq.a}
              isOpen={openIdx === idx}
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
