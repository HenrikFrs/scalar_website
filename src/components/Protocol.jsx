import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Users, KeyRound, Wrench, ShieldCheck } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Protocol = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animation removed per user request
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const steps = [
    {
      num: "01",
      title: "Strategy Call",
      desc: "Together we analyze your business and identify where AI systems can create the biggest lever for growth — clearly, concretely, without detours.",
      icon: Users,
      color: "text-blue-400",
      bg: "bg-surface2",
    },
    {
      num: "02",
      title: "Kickoff & Onboarding",
      desc: "Structured exchange of required credentials (API keys, access) and definition of exact specifications for the integration.",
      icon: KeyRound,
      color: "text-green-400",
      bg: "bg-surface2",
    },
    {
      num: "03",
      title: "Implementation",
      desc: "Development and build-out of the infrastructure. Custom agents and workflows are programmed according to the defined parameters.",
      icon: Wrench,
      color: "text-purple-400",
      bg: "bg-surface2",
    },
    {
      num: "04",
      title: "Testing & Rollout",
      desc: "Intensive QA phase before going live. We validate every data point before the system is handed over to your production environment.",
      icon: ShieldCheck,
      color: "text-pink-400",
      bg: "bg-surface2",
    },
  ];

  return (
    <section
      id="process"
      className="bg-background py-32 px-6 md:px-12 lg:px-24 border-t border-borderLight"
      ref={containerRef}
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-20 text-center">
          <h2 className="text-5xl md:text-6xl font-medium font-sans tracking-normal text-foreground mb-6 pb-2">
            How we <span className="text-muted">work</span>
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto leading-relaxed">
            Transparent, structured, and without unnecessary friction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mt-16">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="prozess-card bg-surface p-8 md:p-12 rounded-[2rem] border border-borderLight flex flex-col items-start gap-8 relative overflow-hidden group hover:border-foreground/20 transition-colors shadow-sm"
            >
              <div
                className={`flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center transition-colors duration-500 ${step.bg}`}
              >
                <step.icon
                  size={28}
                  className="text-foreground transition-colors duration-500"
                  strokeWidth={1.5}
                />
              </div>

              <div className="flex-1">
                <div className="font-mono text-[10px] text-muted mb-4 tracking-widest border border-borderLight bg-surface2 px-2 py-1 rounded-sm w-max uppercase">
                  Phase {step.num}
                </div>
                <h3 className="font-medium text-2xl text-foreground mb-4">
                  {step.title}
                </h3>
                <p className="text-base text-muted leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Protocol;
