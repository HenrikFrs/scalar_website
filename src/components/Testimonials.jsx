import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Section, SectionHeader } from "./ui";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    highlight:
      "Henrik knows how to build scalable automations — especially when it comes to the interplay between outbound tools and CRM systems.",
    author: "Patrick Perner",
    role: "Co-Founder, Founder Sales",
  },
  {
    highlight:
      "Henrik approached me in a pleasant and professional way, which immediately resonated with me as a marketing-minded entrepreneur. The results speak for themselves, and working together was genuinely enjoyable.",
    author: "Nicolas Borer",
    role: "Managing Partner, Kontaktkompass",
  },
  {
    highlight:
      "Henrik was great - attentive, good clear communications, fast turnaround, high quality.",
    author: "Gordon Grant",
    role: "Co-Founder, Secondcity AI",
  },
];

const TestimonialCard = ({ highlight, author, role }) => (
  <div className="p-6 md:p-8 flex flex-col h-full">
    <p className="type-lead text-body">&ldquo;{highlight}&rdquo;</p>

    <div className="mt-auto pt-6">
      <p className="type-small font-medium text-heading">{author}</p>
      <p className="type-small text-muted">{role}</p>
    </div>
  </div>
);

const Testimonials = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".test-header", {
        y: 30,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });
      gsap.from(".test-grid", {
        y: 30,
        opacity: 0,
        duration: 1.1,
        ease: "expo.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <Section id="testimonials" ref={sectionRef}>
      <SectionHeader
        className="test-header"
        eyebrow="Testimonials"
        title="Our clients get results and"
        accent="enjoy the process"
      />

      <div className="frame-body">
        <div className="test-grid box-grid">
          {testimonials.map((t) => (
            <TestimonialCard key={t.author} {...t} />
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Testimonials;
