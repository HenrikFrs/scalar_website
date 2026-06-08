import React, { useEffect, useRef } from "react";
import { X, Check, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const rows = [
  {
    agency: "Blasts a generic prospect list and hopes someone bites",
    scalar: "Each prospect qualified by AI before a single email goes out",
  },
  {
    agency:
      "Sends the same template to everyone and calls it 'personalization'",
    scalar:
      "Every email tailored to that specific prospect's business situation",
  },
  {
    agency: "Optimizes for positive replies from anyone",
    scalar: "Optimizes for attended meetings with the right people",
  },
  {
    agency: "Charges a monthly retainer regardless of results",
    scalar: "Pure performance basis - you only pay per call that shows up",
  },
  {
    agency: "Monthly reports you have to trust blindly",
    scalar:
      "Full live access - see every email, reply, and metric in real time",
  },
];

const Comparison = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".comp-header", {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });
      gsap.from(".comp-card", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: ".comp-grid", start: "top 80%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="comparison"
      ref={sectionRef}
      className="py-12 md:py-24 px-4 md:px-16 lg:px-96 bg-background"
    >
      <div>
        <div className="comp-header mb-16 flex flex-col items-start text-left gap-4">
          <div className="flex items-center px-4 py-2" style={{ backgroundColor: "rgba(59,130,246,0.1)", backdropFilter: "blur(8px)", borderRadius: "9999px" }}>
            <span className="text-[9px] md:text-[11px] font-mono uppercase tracking-[0.16em] leading-none translate-y-px" style={{ color: "#3b82f6" }}>
              The Difference
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-medium text-foreground font-serif leading-tight pb-2">
            We Optimize For The Right Results and Only Charge For What We
            Deliver
          </h2>
        </div>

        <div className="comp-grid grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Typical Agency card */}
          <div className="pb-3">
            <div className="px-8 pt-8 pb-2">
              <p className="text-xl font-medium text-muted font-sans mb-3">
                Typical Agency
              </p>
            </div>
            <ul className="flex flex-col">
              {rows.map((row, i) => (
                <li key={i} className="flex items-start gap-4 px-8 py-5">
                  <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center">
                    <X size={10} className="text-white/30" strokeWidth={2.5} />
                  </span>
                  <p className="text-sm text-muted leading-relaxed">
                    {row.agency}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Scalar AI card */}
          <div className="comp-card bg-surface overflow-hidden pb-3 border border-pillBorder">
            <div className="px-8 pt-8 pb-2">
              <div className="flex items-center gap-2 mb-3">
                <img
                  src={`${import.meta.env.BASE_URL}ScalarAI.png`}
                  alt="Scalar AI"
                  className="h-10 brightness-0 invert"
                />
                <p className="text-xl font-medium text-foreground font-sans">
                  Scalar AI
                </p>
              </div>
            </div>
            <ul className="flex flex-col">
              {rows.map((row, i) => (
                <li key={i} className="flex items-start gap-4 px-8 py-5">
                  <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-white/[0.08] border border-white/20 flex items-center justify-center">
                    <Check size={10} className="text-white" strokeWidth={2.5} />
                  </span>
                  <p className="text-sm text-foreground leading-relaxed">
                    {row.scalar}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Comparison;
