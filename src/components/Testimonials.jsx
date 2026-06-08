import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    highlight:
      "He knows how to build scalable automations — especially when it comes to the interplay between outbound tools and CRM systems.",
    quote:
      "We genuinely enjoy working with Henrik (from Scalar). He pays close attention to detail and knows how to build scalable automations — especially when it comes to the interplay between outbound tools and CRM systems. For us and our clients, he delivers high-quality work paired with a professional approach. A clear recommendation for anyone considering working with him.",
    author: "Patrick Perner",
    role: "Co-Founder, Founder Sales",
    image: `${import.meta.env.BASE_URL}patrick.png`,
  },
  {
    highlight:
      "Henrik approached me in a pleasant and professional way, which immediately resonated with me as a marketing-minded entrepreneur. The results speak for themselves, and working together was genuinely enjoyable.",
    quote:
      "Honestly, I was initially quite skeptical whenever someone approaches me with an automation system. But Henrik did it in a very pleasant and professional way, which immediately resonated with me as a marketing-minded entrepreneur. Throughout our collaboration, he was always highly responsive, solution-oriented, and completely reliable in execution and on timelines. The results speak for themselves, and working together was genuinely enjoyable.",
    author: "Nicolas Borer",
    role: "Managing Partner, Kontaktkompass",
    image: null,
  },
  {
    highlight:
      "Henrik was great - attentive, good clear communications, fast turnaround, high quality.",
    quote:
      "Henrik (from Scalar) was great - attentive, good clear communications, fast turnaround, high quality. He is exactly what I'm looking for in an automation developer. We will certainly be working again very soon on our next projects.",
    author: "Gordon Grant",
    role: "Co-Founder, Secondcity AI",
    image: `${import.meta.env.BASE_URL}gordon.png`,
  },
];

const TestimonialCard = ({ highlight, quote, author, role, image }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-lt-surface p-8 md:p-10 flex flex-col border border-lt-pillBorder h-full">
      <p className="text-lt-foreground font-medium text-lg leading-snug mb-4">
        {highlight}
      </p>

      <div
        className="overflow-hidden transition-all duration-500 ease-in-out"
        style={{
          maxHeight: expanded ? "400px" : "0",
          opacity: expanded ? 1 : 0,
        }}
      >
        <p className="text-lt-muted text-sm leading-relaxed mb-4">{quote}</p>
      </div>

      <button
        onClick={() => setExpanded((e) => !e)}
        className="text-xs text-lt-muted/60 hover:text-lt-muted transition-colors duration-150 text-left mb-6 underline underline-offset-2 decoration-dotted w-fit"
      >
        {expanded ? "Read less" : "Read full testimonial"}
      </button>

      <div className="mt-auto flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-lt-surface2 flex-shrink-0 overflow-hidden flex items-center justify-center">
          {image ? (
            <img
              src={image}
              alt={author}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-xs font-medium text-lt-muted font-sans">
              {author
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          )}
        </div>
        <div>
          <p className="font-medium text-lt-foreground font-sans">{author}</p>
          <p className="text-sm text-lt-muted">{role}</p>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".test-header", {
        y: 30, opacity: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });
      gsap.from(".test-card", {
        y: 30, opacity: 0, duration: 0.7, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: ".test-grid", start: "top 80%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="py-20 md:py-32 px-4 md:px-16 lg:px-96 bg-lt-background"
    >
      <div className="test-header mb-20 flex flex-col items-start text-left gap-4">
        <div className="flex items-center px-4 py-1.5 rounded-full border border-lt-pillBorder">
          <span className="text-[11px] font-mono uppercase tracking-[0.16em] text-lt-muted">
            Testimonials
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-medium tracking-normal text-lt-foreground font-serif pb-2">
          Our Clients Don't Just Get Results But Also Enjoy The Process.
        </h2>
      </div>

      <div className="test-grid grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, idx) => (
          <div key={idx} className="test-card">
            <TestimonialCard {...t} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
