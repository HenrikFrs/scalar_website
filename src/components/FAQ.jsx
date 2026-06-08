import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import { ChevronDown } from "lucide-react";

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div
      className="overflow-hidden"
      style={{
        backgroundColor: isOpen ? "transparent" : "#F2F2F2",
        border: isOpen ? "1px solid transparent" : "1px solid rgba(0,0,0,0.28)",
        transition: "background-color 0.25s ease, border-color 0.25s ease",
      }}
    >
      <button
        className="w-full px-5 py-3 flex items-center justify-between text-left group"
        onClick={onClick}
      >
        <span
          className={`text-base md:text-lg font-medium font-sans pr-6 transition-colors ${isOpen ? "text-lt-foreground" : "text-lt-foreground/80 group-hover:text-lt-foreground"}`}
        >
          {question}
        </span>
        <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
          <ChevronDown
            size={20}
            className="text-lt-muted group-hover:text-lt-foreground transition-colors"
            style={{
              transform: isOpen ? "scaleY(-1)" : "scaleY(1)",
              transition: "transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
          />
        </div>
      </button>

      <div
        className="overflow-hidden"
        style={{
          maxHeight: isOpen ? "500px" : "0",
          opacity: isOpen ? 1 : 0,
          transition: "max-height 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.2s ease",
        }}
      >
        <div className="px-5 pb-4 text-lt-muted leading-relaxed">{answer}</div>
      </div>
    </div>
  );
};

const FAQ = () => {
  const [openIdx, setOpenIdx] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".faq-header", {
        y: 30, opacity: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });
      gsap.from(".faq-item", {
        y: 20, opacity: 0, duration: 0.6, stagger: 0.08, ease: "power3.out",
        scrollTrigger: { trigger: ".faq-list", start: "top 80%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const faqs = [
    {
      q: "How long until I see results?",
      a: "There's a 14-day warmup phase before sending begins. After that, the first positive replies typically come in within the first day of sending. Expect the first booked calls shortly after.",
    },
    {
      q: "How much work does it take on my end?",
      a: "Your involvement is minimal: fill out an onboarding form, confirm the lead list and messaging angles, and reply to interested leads quickly when they come in.",
    },
    {
      q: "How much does this cost?",
      a: "The cost per call varies depending on your target market and deal structure. The tech fee scales with sending volume. We'll figure out the exact numbers on the call — there's no one-size-fits-all pricing.",
    },
    {
      q: "Will this burn my main domain?",
      a: "No. We set up completely new branded domains and inboxes under your name that are solely dedicated to sending. They run completely independent of your main infrastructure — your primary domain is never touched.",
    },
    {
      q: "Can I see everything live?",
      a: "Yes. You get complete access to the sending tool and can see everything in real time — every email sent, every reply, and every campaign metric. Full transparency, no black box.",
    },
    {
      q: "Can I approve the copy before it goes out?",
      a: "Yes. You approve every variant before it ships. Nothing goes live without your sign-off.",
    },
    {
      q: "What do I actually own at the end of this?",
      a: "Everything. You own all of the contact data we built for you, all of the copy we wrote, and all of the infrastructure — including the domains, inboxes, sending tool, and calendar booking system. There's no lock-in. If you ever want to take it in-house or work with someone else, it's all yours.",
    },
  ];

  return (
    <section id="faq" ref={sectionRef} className="py-20 md:py-32 px-4 md:px-16 lg:px-96 bg-lt-background">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-16 items-start">
        <div className="faq-header md:col-span-2 flex flex-col items-start text-left gap-4 md:sticky md:top-32">
          <div className="flex items-center px-4 py-1.5 rounded-full border border-lt-pillBorder">
            <span className="text-[11px] font-mono uppercase tracking-[0.16em] text-lt-muted">
              FAQ
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-medium tracking-normal text-lt-foreground font-serif">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="faq-list md:col-span-3 flex flex-col gap-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="faq-item">
              <FAQItem
                question={faq.q}
                answer={faq.a}
                isOpen={openIdx === idx}
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
