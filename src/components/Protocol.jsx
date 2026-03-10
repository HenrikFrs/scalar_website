import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, KeyRound, Wrench, ShieldCheck } from 'lucide-react';

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
            title: "Meeting & Identifizierung",
            desc: "Gemeinsame Analyse Ihrer Prozesse, um die effektivsten und rentabelsten Use Cases für den Einsatz von KI und Automatisierung zu ermitteln.",
            icon: Users,
            color: "text-blue-400",
            bg: "bg-surface2"
        },
        {
            num: "02",
            title: "Kickoff & Onboarding",
            desc: "Strukturierter Austausch notwendiger Zugänge (API Keys, Credentials) und Definition der exakten Spezifikationen für die Integration.",
            icon: KeyRound,
            color: "text-green-400",
            bg: "bg-surface2"
        },
        {
            num: "03",
            title: "Implementierung",
            desc: "Entwicklung und Aufbau der Infrastruktur. Maßgeschneiderte Agenten und Workflows werden nach den definierten Parametern programmiert.",
            icon: Wrench,
            color: "text-purple-400",
            bg: "bg-surface2"
        },
        {
            num: "04",
            title: "Testing & Rollout",
            desc: "Intensive QA-Phase vor der Live-Schaltung. Wir validieren jeden Datenpunkt, bevor das System final in Ihre Betriebsumgebung übergeben wird.",
            icon: ShieldCheck,
            color: "text-pink-400",
            bg: "bg-surface2"
        }
    ];

    return (
        <section id="prozess" className="bg-background py-32 px-6 md:px-12 lg:px-24 border-t border-borderLight" ref={containerRef}>
            <div className="max-w-6xl mx-auto">
                <div className="mb-20 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-foreground/10 bg-surface2 mb-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-foreground animate-pulse"></span>
                        <span className="text-[10px] font-mono font-medium text-muted tracking-wide uppercase">Der Prozess</span>
                    </div>
                    <h2 className="text-5xl md:text-6xl font-medium font-sans tracking-tight text-foreground mb-6 pb-2">
                        Von der Analyse zur <span className="text-muted">Autonomie.</span>
                    </h2>
                    <p className="text-lg text-muted max-w-2xl mx-auto leading-relaxed">
                        Ein stringentes Protokoll, das Reibungsverluste eliminiert und eine fehlerfreie Integration garantiert.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mt-16">
                    {steps.map((step, idx) => (
                        <div
                            key={idx}
                            className="prozess-card bg-surface p-8 md:p-12 rounded-[2rem] border border-borderLight flex flex-col items-start gap-8 relative overflow-hidden group hover:border-foreground/20 transition-colors shadow-sm"
                        >
                            <div className={`flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center transition-colors duration-500 ${step.bg}`}>
                                <step.icon size={28} className="text-foreground transition-colors duration-500" strokeWidth={1.5} />
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
