import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import { ChevronDown } from "lucide-react";

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div
      className="overflow-hidden rounded-xl"
      style={{
        backgroundColor: isOpen ? "transparent" : "#111111",
        transition: "background-color 0.25s ease",
      }}
    >
      <button
        className="w-full px-5 py-3 flex items-center justify-between text-left group"
        onClick={onClick}
      >
        <span
          className={`text-base md:text-lg font-medium font-sans pr-6 transition-colors ${isOpen ? "text-foreground" : "text-foreground/80 group-hover:text-foreground"}`}
        >
          {question}
        </span>
        <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
          <ChevronDown
            size={20}
            className="text-muted group-hover:text-foreground transition-colors"
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
        <div className="px-5 pb-4 text-base font-medium text-muted leading-relaxed">{answer}</div>
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
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
      });
      gsap.from(".faq-item", {
        y: 20, opacity: 0, duration: 0.6, stagger: 0.08, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
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
    {
      q: "What counts as a qualified call?",
      a: "You're in full control of who you speak with. If an interested prospect replies but doesn't match your ICP, you simply choose not to book a call with them — and you won't be charged. You only pay for calls you decide to take.",
    },
  ];

  return (
    <section id="faq" ref={sectionRef} className="py-12 md:py-24 px-4 md:px-16 lg:px-96 bg-background">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-16 items-start">
        <div className="faq-header md:col-span-2 flex flex-col items-start text-left gap-6 md:sticky md:top-32">
          <span className="text-[9px] md:text-[11px] font-mono font-semibold uppercase tracking-[0.16em] leading-none px-3 py-2 rounded-full bg-[#3799f7]/25 backdrop-blur-sm text-[#89c4ff]" >
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl font-medium tracking-normal text-foreground font-serif">
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
