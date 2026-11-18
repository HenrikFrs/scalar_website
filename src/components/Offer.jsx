import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, Info } from "lucide-react";
import { EMAILS_PER_LEAD, getInfra } from "../lib/infra";
import { Section, SectionHeader } from "./ui";

gsap.registerPlugin(ScrollTrigger);

const fmtCount = (n) => n.toLocaleString("en-US");

// A column of checked points under a small label
const Group = ({ label, items }) => (
  <div className="flex flex-col gap-5 p-6 md:p-8">
    <span className="ui-label text-muted">{label}</span>
    <ul className="flex flex-col gap-3.5">
      {items.map((item, i) => (
        <li key={i} className="type-body text-body flex gap-3">
          <Check
            size={16}
            strokeWidth={1.75}
            className="mt-1 flex-shrink-0 text-brand"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

const fmtMoney = (n) =>
  "$" + n.toLocaleString("en-US", { maximumFractionDigits: 0 });

const Offer = ({ messagesSent, feePerCall }) => {
  const sectionRef = useRef(null);
  const contacts = messagesSent / EMAILS_PER_LEAD;
  const { domains, inboxes, monthlyCost: techCost } = getInfra(contacts);

  // Sized to the volume set in the ROI calculator
  const included = [
    <>
      <span className="text-heading">
        {fmtCount(domains)} domains, {fmtCount(inboxes)} inboxes and{" "}
        {fmtCount(contacts)} verified, ICP-fit contacts
      </span>{" "}
      a month
    </>,
    "We handle everything: infrastructure, list building, messaging and reply handling",
    "You only show up to the calls",
  ];

  const terms = [
    <>
      You pay{" "}
      <span className="text-heading">{fmtMoney(feePerCall)}</span> per
      attended call
    </>,
    <>
      Beyond that, you only cover the tech:{" "}
      <span className="text-heading">{fmtMoney(techCost)}</span> a month for
      domains, inboxes and contact data
    </>,
    "Month to month, so no lock-in, and you own everything",
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".offer-element", {
        y: 30,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
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
    <Section id="offer" ref={sectionRef} className="text-body">
      <SectionHeader
        className="offer-element"
        eyebrow="Offer"
        title="One offer,"
        accent="no retainer"
        description="We do all the work up front. You pay when a call actually happens."
      />

      <div className="frame-body">
        <div className="offer-element flex items-center justify-center text-center gap-2.5 mb-4">
          <Info size={15} className="flex-shrink-0 text-brand" />
          <p className="type-small text-heading">
            All numbers below are based on your settings in the ROI
            calculator above.
          </p>
        </div>
        <div className="offer-element border border-borderLight w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-borderLight">
            <Group label="What you get" items={included} />
            <Group label="How it works" items={terms} />
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Offer;
