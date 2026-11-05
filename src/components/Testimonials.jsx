import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeader } from "./ui";

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

const Avatar = ({ author, image }) => (
  <div className="w-14 h-14 border border-borderLight flex-shrink-0 overflow-hidden flex items-center justify-center">

    {image ? (
      <img
        src={image}
        alt={author}
        className="w-full h-full object-cover grayscale"
      />
    ) : (
      <span className="font-serif text-sm text-green">
        {author
          .split(" ")
          .map((n) => n[0])
          .join("")}
      </span>
    )}
  </div>
);

const TestimonialCard = ({ highlight, quote, author, role, image }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="p-6 md:p-8 flex flex-col h-full">
      <Avatar author={author} image={image} />

      <p className="type-lead text-body mt-6 mb-4">
        &ldquo;{highlight}&rdquo;
      </p>

      <div
        className="overflow-hidden transition-all duration-700 ease-soft"
        style={{
          maxHeight: expanded ? "400px" : "0",
          opacity: expanded ? 1 : 0,
        }}
      >
        <p className="type-small text-muted mb-4">{quote}</p>
      </div>

      <button
        onClick={() => setExpanded((e) => !e)}
        className="type-small text-muted underline underline-offset-4 hover:text-foreground transition-colors duration-200 text-left w-fit"
      >
        {expanded ? "Read less" : "Read full testimonial"}
      </button>

      <div className="mt-auto pt-6">
        <p className="type-small font-medium text-heading">{author}</p>
        <p className="type-small text-muted">{role}</p>
      </div>
    </div>
  );
};

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
    <section id="testimonials" ref={sectionRef} className="section-line">
      <div className="shell section-y">
        <SectionHeader
          className="test-header mb-12"
          eyebrow="Testimonials"
          title="Our clients get results and"
          accent="enjoy the process."
        />

        <div className="test-grid box-grid">
          {testimonials.map((t) => (
            <TestimonialCard key={t.author} {...t} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
