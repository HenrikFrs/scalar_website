import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import { Minus, Plus } from "lucide-react";
import { SectionHeader } from "./ui";

const PANEL_EASE = "0.35s cubic-bezier(0.4, 0, 0.2, 1)";

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  const Icon = isOpen ? Minus : Plus;

  return (
    <div className="overflow-hidden">
      <button
        className="w-full py-6 flex items-center justify-between gap-4 text-left"
        aria-expanded={isOpen}
        onClick={onClick}
      >
        <span className="type-title text-heading">{question}</span>
        <Icon
          size={18}
          strokeWidth={1.5}
          className={`flex-shrink-0 ${isOpen ? "text-brand" : "text-foreground"}`}
          aria-hidden="true"
        />
      </button>

      {/* 0fr to 1fr animates the real content height, so opening matches closing */}
      <div
        className="grid"
        style={{
          gridTemplateRows: isOpen ? "1fr" : "0fr",
          marginTop: isOpen ? "-8px" : "0",
          opacity: isOpen ? 1 : 0,
          transition: `grid-template-rows ${PANEL_EASE}, margin-top ${PANEL_EASE}, opacity ${PANEL_EASE}`,
        }}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="pb-6 max-w-[600px] type-body text-body">{answer}</div>
        </div>
      </div>
    </div>
  );
};

const FAQ = () => {
  const [openIdx, setOpenIdx] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".faq-header", {
        y: 30, opacity: 0, duration: 1.2, ease: "expo.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
      });
      gsap.from(".faq-item", {
        y: 20, opacity: 0, duration: 1, stagger: 0.08, ease: "expo.out",
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
    <section id="faq" ref={sectionRef} className="section-line">
      {/* As on the reference: a wide title column (title on one line), a
          140px gap, then the list */}
      <div className="shell section-y grid grid-cols-1 gap-y-12 min-[810px]:gap-y-16 min-[1200px]:grid-cols-[minmax(0,520px)_minmax(0,1fr)] min-[1200px]:gap-x-[140px]">
        <SectionHeader
          className="faq-header"
          eyebrow="FAQ"
          title="Frequently asked"
          accent="questions"
          description="Everything you need to know to get started."
        />

        <div className="faq-list flex flex-col min-w-0">
          {faqs.map((faq, idx) => (
            <div key={idx} className="faq-item border-b border-borderLight">
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
