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
      q: "How quickly will I see first results?",
      a: "Most clients see first measurable results within 2–4 weeks after kickoff. More complex stacks like lead generation or proposal automation require a bit more lead time.",
    },
    {
      q: "What happens during the strategy call?",
      a: "The strategy call takes about 30 minutes and is completely non-binding. We take a joint look at your business model, your current sales situation, and your processes — and show you concretely which AI systems will create the biggest lever for growth in your case. No pitch, no sales presentation. You leave with a clear picture of what's possible.",
    },
    {
      q: "Does this work with our existing tool stack?",
      a: "Generally, yes. Our systems integrate via APIs into the tools you already use — including common CRMs like HubSpot or Pipedrive, calendar tools, email systems, and outreach platforms. During the strategy call we'll clarify what you're currently running and how the integration will look.",
    },
    {
      q: "Who maintains the systems after rollout?",
      a: "We do. APIs change, platforms evolve — a system that works today needs active maintenance. That's why we offer maintenance packages where we continuously monitor your systems, proactively intervene when things change, and further develop them as needed.",
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
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted font-medium">
            Clear answers to the most important questions.
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
