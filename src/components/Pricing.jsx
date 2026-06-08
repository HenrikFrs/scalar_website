import React, { useRef, useEffect } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import gsap from 'gsap';

const PricingCard = ({ title, price, desc, features, isPopular }) => {
    return (
        <div className={`relative flex flex-col p-8 md:p-10 rounded-3xl border ${isPopular ? 'bg-dark text-white border-dark transform md:-translate-y-4 shadow-xl z-10' : 'bg-white text-dark border-borderLight'} transition-all duration-300 hover:border-dark/30`}>
            {isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-white text-dark border border-dark text-[10px] font-mono font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
                    Recommended
                </div>
            )}

            <div className="mb-8">
                <h3 className={`text-2xl font-bold font-sans tracking-normal mb-2 ${isPopular ? 'text-white' : 'text-dark'}`}>{title}</h3>
                <p className={`text-sm ${isPopular ? 'text-white/70' : 'text-muted'}`}>{desc}</p>
            </div>

            <div className="mb-8 font-sans font-bold text-4xl md:text-5xl tracking-tight">
                {price}
            </div>

            <ul className="flex flex-col gap-4 mb-10 flex-1">
                {features.map((feat, i) => (
                    <li key={i} className={`flex items-start gap-3 text-sm ${isPopular ? 'text-white/80' : 'text-dark/80'}`}>
                        <Check size={18} className={isPopular ? 'text-white/50' : 'text-dark/30'} strokeWidth={2} />
                        <span className="leading-tight">{feat}</span>
                    </li>
                ))}
            </ul>

            <button className={`w-full py-4 rounded-full font-medium transition-transform duration-300 hover:scale-[1.02] flex justify-center items-center gap-2 ${isPopular ? 'bg-white text-dark hover:bg-surface border border-transparent' : 'bg-surface text-dark border border-borderLight hover:border-dark/50'}`}>
                Get in Touch <ArrowRight size={16} />
            </button>
        </div>
    );
};

const Pricing = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        gsap.from('.pricing-card', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 75%',
            }
        });
    }, []);

    return (
        <section id="pricing" ref={containerRef} className="py-20 md:py-32 px-6 md:px-12 lg:px-24 bg-surface selection:bg-dark selection:text-white">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-20 max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-sans tracking-normal font-bold mb-6 text-dark leading-[1.1]">
                        Predictable Investment. <span className="text-muted/80">Measurable Return.</span>
                    </h2>
                    <p className="text-lg text-muted font-medium">
                        No consulting reports, no concepts. Only systems that directly generate revenue.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 lg:gap-8 max-w-6xl mx-auto">
                    <div className="pricing-card">
                        <PricingCard
                            title="Sales System"
                            price="2.5k€"
                            desc="Your first revenue-generating AI system live in 2 weeks."
                            features={[
                                "AI Sales Agent (lead response in seconds)",
                                "Automatic calendar booking",
                                "Follow-up sequences",
                                "2 weeks hypercare"
                            ]}
                            isPopular={false}
                        />
                    </div>
                    <div className="pricing-card">
                        <PricingCard
                            title="Growth Stack"
                            price="8.0k€"
                            desc="Complete lead-to-close stack for maximum growth."
                            features={[
                                "Sales System + Lead Generation",
                                "Personalized outbound channel",
                                "CRM integration",
                                "4 weeks hypercare"
                            ]}
                            isPopular={true}
                        />
                    </div>
                    <div className="pricing-card">
                        <PricingCard
                            title="Full-Stack"
                            price="Custom"
                            desc="The complete revenue operating system for your business."
                            features={[
                                "Sales + Lead Gen + Automations",
                                "Proposal & asset generation",
                                "Intelligent CRM system",
                                "Dedicated Solutions Architect",
                                "Full-service maintenance & 24/7 support"
                            ]}
                            isPopular={false}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Pricing;
