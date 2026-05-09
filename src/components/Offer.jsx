import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, ArrowUpRight, Shield, Unlock } from "lucide-react";
import { MagneticButton } from "./Header";

gsap.registerPlugin(ScrollTrigger);

const deliverables = [
  "Full sending infrastructure setup (20 domains, 100 inboxes), ready to send",
  "5 hand-crafted email copy sequences tailored to your offer & ICP",
  "List of 12,000 email-verified leads matching your ICP",
  "12,000 leads reached with deeply personalized messages",
  "5 messaging angles tested (real data on how to position your offer)",
];

const Offer = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".offer-element", {
        y: 30,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="offer"
      ref={sectionRef}
      className="w-full bg-background py-24 px-6 border-t border-borderLight"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Section header */}
        <div className="mb-16 flex flex-col items-center text-center gap-4">
          <h2 className="offer-element text-4xl md:text-5xl font-medium tracking-normal text-foreground font-sans leading-tight pb-2">
            60-Day Pilot
          </h2>
          <p className="offer-element text-lg text-muted max-w-md font-medium">
            Get started with a 60-day pilot program to see how we can fill your
            calendar with qualified meetings.
          </p>
        </div>

        {/* Card */}
        <div className="offer-element w-full max-w-5xl bg-surface border border-borderLight rounded-[2rem] p-8 md:p-12 flex flex-col gap-8">
          {/* Guarantee */}
          <div className="flex flex-col sm:flex-row sm:items-start gap-4">
            <span className="flex-shrink-0 w-10 h-10 rounded-full bg-green-950/40 border border-green-900/40 flex items-center justify-center">
              <Shield size={18} className="text-green-400" />
            </span>
            <div className="flex flex-col gap-1">
              <p className="text-xs font-mono uppercase tracking-[0.18em] text-muted">
                The Guarantee
              </p>
              <p className="text-foreground/90 text-base leading-relaxed">
                You only pay per showed-up call{" "}
                <span className="text-muted">
                  + small tech fee that covers the infrastructure.
                </span>
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-borderLight" />

          {/* Deliverables */}
          <div className="flex flex-col gap-4">
            {deliverables.map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-[#14349D]/20 border border-[#14349D]/30 flex items-center justify-center">
                  <Check
                    size={11}
                    className="text-[#5b8dee]"
                    strokeWidth={2.5}
                  />
                </span>
                <p className="text-foreground/90 text-base leading-snug">
                  {item}
                </p>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-borderLight" />

          {/* After 60 days */}
          <div className="bg-surface2 rounded-[1.25rem] p-6 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-background border border-borderLight flex items-center justify-center">
                <Unlock size={15} className="text-muted" />
              </span>
              <p className="text-xs font-mono uppercase tracking-[0.18em] text-muted">
                After 60 Days
              </p>
            </div>
            <p className="text-foreground/80 text-sm leading-relaxed">
              You keep the infrastructure. If you ever want to take it in-house,
              all infrastructure belongs to you.{" "}
              <span className="text-muted">
                No lock-in. Or we keep managing with the same pricing.
              </span>
            </p>
          </div>

          {/* CTA */}
          <MagneticButton
            variant="primary"
            className="w-full justify-center text-base py-4 px-8"
            onClick={() =>
              window.open(
                "https://cal.com/henrik-freisleben-3prokl/ai-cold-outbound",
                "_blank",
              )
            }
          >
            See If You Qualify <ArrowUpRight size={20} className="ml-1" />
          </MagneticButton>
        </div>
      </div>
    </section>
  );
};

export default Offer;
