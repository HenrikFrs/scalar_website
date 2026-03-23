import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Philosophy = () => {
    const sectionRef = useRef(null);
    const textRef1 = useRef(null);
    const textRef2 = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {

            const lines1 = textRef1.current.querySelectorAll('.reveal-line');
            const lines2 = textRef2.current.querySelectorAll('.reveal-line');

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%',
                }
            });

            tl.from(lines1, {
                y: 40,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power3.out'
            })
                .from(lines2, {
                    y: 40,
                    opacity: 0,
                    duration: 1.2,
                    stagger: 0.15,
                    ease: 'power3.out'
                }, "-=0.2");

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-40 px-6 md:px-12 lg:px-24 bg-white border-t border-borderLight overflow-hidden flex justify-center w-full">
            <div className="max-w-5xl w-full">
                <div className="flex flex-col gap-12 md:gap-24 items-center">

                    <div ref={textRef1} className="w-full text-left max-w-2xl self-start">
                        <p className="text-muted text-xl md:text-2xl font-sans font-medium tracking-wide leading-relaxed overflow-hidden">
                            <span className="reveal-line block">Viele Agenturen verkaufen Beratung,</span>
                            <span className="reveal-line block mt-1 text-dark/70">Konzepte und Analyse-Reports.</span>
                        </p>
                    </div>

                    <div ref={textRef2} className="w-full text-right max-w-4xl self-end">
                        <h2 className="text-4xl md:text-6xl lg:text-[5rem] text-dark tracking-tight leading-[1.05] overflow-hidden">
                            <span className="reveal-line block font-sans font-medium mb-2 text-white pb-1">Wir liefern Systeme,</span>
                            <span className="reveal-line block font-sans font-medium text-white/50 pb-2">die direkt Umsatz generieren.</span>
                        </h2>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Philosophy;
