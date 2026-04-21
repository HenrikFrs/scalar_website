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
      q: "How long until we see results?",
      a: "There's a 14-day warmup phase before sending begins. After that, the first positive replies typically come in within the first day of sending. Expect the first booked calls shortly after.",
    },
    {
      q: "How much time does it take on my end?",
      a: "Your involvement is minimal: fill out an onboarding form, confirm the lead list and messaging angles, and reply to interested leads quickly when they come in.",
    },
    {
      q: "How much does this cost?",
      a: "The cost per call varies depending on your target market and deal size. The tech fee scales with sending volume. We'll figure out the exact numbers on the call — there's no one-size-fits-all pricing.",
    },
  ];

  return (
    <section
      id="faq"
      className="py-32 px-6 md:px-12 lg:px-24 bg-background border-t border-borderLight"
    >
      <div className="max-w-4xl mx-auto">
        <div className="mb-16 flex flex-col items-center text-center gap-4">
          <h2 className="text-4xl md:text-6xl font-medium tracking-normal text-foreground font-sans pb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted font-medium max-w-md">
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
