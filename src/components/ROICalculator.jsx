import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TrendingUp, ChevronDown, Info, Plus, Minus } from "lucide-react";
import { MagneticButton } from "./Header";

gsap.registerPlugin(ScrollTrigger);

const Tooltip = ({ text }) => (
  <div className="relative group">
    <Info size={13} className="text-muted/60 cursor-default" />
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
      <div className="bg-surface3 border border-white/[0.10] rounded-2xl px-4 py-3 text-xs text-foreground leading-relaxed">
        {text}
      </div>
    </div>
  </div>
);

const SliderField = ({
  label,
  value,
  display,
  min,
  max,
  step,
  onChange,
  tooltip,
}) => {
  const pct = ((value - min) / (max - min)) * 100;
  const trackStyle = {
    background: `linear-gradient(to right, #FAFAFA ${pct}%, #1a1a1a ${pct}%)`,
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <label className="text-base font-sans text-foreground">{label}</label>
          {tooltip && <Tooltip text={tooltip} />}
        </div>
        <span className="text-sm font-sans text-foreground tabular-nums">
          {display}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="roi-slider w-full h-1.5 rounded-full appearance-none cursor-pointer"
        style={trackStyle}
      />
    </div>
  );
};

// Fully custom dropdown — no native <select>
const DropdownField = ({ label, value, options, onChange, tooltip }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="flex flex-col gap-4" ref={ref}>
      <div className="flex items-center gap-2">
        <label className="text-base font-sans text-foreground">{label}</label>
        {tooltip && <Tooltip text={tooltip} />}
      </div>
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="w-full bg-surface2 rounded-xl px-4 py-3 text-sm font-sans text-foreground text-left flex items-center justify-between"
        >
          <span>{selected?.label}</span>
          <ChevronDown
            size={14}
            className="text-muted flex-shrink-0 transition-transform duration-200"
            style={{ transform: open ? "scaleY(-1)" : "scaleY(1)" }}
          />
        </button>
        {open && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-surface2 rounded-xl overflow-hidden z-20 border border-white/[0.06]">
            {options.map((o) => (
              <button
                key={o.value}
                type="button"
                onClick={() => {
                  onChange(o.value);
                  setOpen(false);
                }}
                className="w-full px-4 py-3 text-sm font-sans text-left text-muted hover:text-foreground hover:bg-white/[0.04] transition-colors duration-150"
              >
                {o.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Fully custom number input with +/- buttons
const NumberField = ({
  label,
  value,
  min,
  max,
  step,
  onChange,
  prefix,
  suffix,
  tooltip,
}) => {
  const handleChange = (raw) => {
    const n = Number(raw);
    if (!isNaN(n)) onChange(Math.min(max, Math.max(min, n)));
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <label className="text-base font-sans text-foreground">{label}</label>
        {tooltip && <Tooltip text={tooltip} />}
      </div>
      <div className="flex items-center bg-surface2 rounded-xl overflow-hidden">
        <div className="flex-1 flex items-center px-4 py-3">
          {prefix && (
            <span className="text-sm font-sans text-muted mr-1">{prefix}</span>
          )}
          <input
            type="text"
            inputMode="numeric"
            value={value.toLocaleString("en-US")}
            onChange={(e) => handleChange(e.target.value.replace(/,/g, ""))}
            className="bg-transparent text-sm font-sans text-foreground focus:outline-none w-full"
          />
          {suffix && (
            <span className="text-sm font-sans text-muted ml-1">{suffix}</span>
          )}
        </div>
        <div className="flex items-center flex-shrink-0">
          <button
            type="button"
            onClick={() => handleChange(value - step)}
            className="px-3 py-3 text-muted hover:text-foreground transition-colors duration-150"
          >
            <Minus size={14} />
          </button>
          <button
            type="button"
            onClick={() => handleChange(value + step)}
            className="pl-3 pr-4 py-3 text-muted hover:text-foreground transition-colors duration-150"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

const OutputRow = ({ label, value, highlight }) => (
  <div
    className={`flex items-center justify-between py-3 px-4 rounded-xl transition-colors duration-200 ${
      highlight
        ? "bg-surface2 border border-white/[0.08]"
        : "border border-transparent"
    }`}
  >
    <span
      className={`text-sm ${highlight ? "text-foreground font-medium" : "text-muted"}`}
    >
      {label}
    </span>
    <span
      className={`font-sans tabular-nums ${highlight ? "text-foreground font-bold text-base" : "text-sm text-foreground/70"}`}
    >
      {value}
    </span>
  </div>
);

const fmt = (n) =>
  n.toLocaleString("en-US", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
const fmtMoney = (n) =>
  "$" + n.toLocaleString("en-US", { maximumFractionDigits: 0 });

const campaignOptions = [
  { value: 150, label: "Top Performing — 1 interested lead / 150 contacts" },
  { value: 325, label: "Average — 1 interested lead / 325 contacts" },
  { value: 500, label: "Conservative — 1 interested lead / 500 contacts" },
];

const ROICalculator = () => {
  const sectionRef = useRef(null);

  const [leadsReached, setLeadsReached] = useState(15000);
  const [msgPerResponse, setMsgPerResponse] = useState(325);
  const [feePerCall, setFeePerCall] = useState(250);
  const [bookingPct, setBookingPct] = useState(25);
  const [showRate, setShowRate] = useState(80);
  const [closeRate, setCloseRate] = useState(20);
  const [ltv, setLtv] = useState(50000);

  const interestedLeads = leadsReached / Math.max(msgPerResponse, 1);
  const bookedCalls = interestedLeads * (bookingPct / 100);
  const adherentCalls = bookedCalls * (showRate / 100);
  const closed = adherentCalls * (closeRate / 100);
  const totalPipeline = closed * ltv;
  const totalFees = adherentCalls * feePerCall;
  const infraCost = Math.ceil(leadsReached / 1000) * 50;
  const totalCost = totalFees + infraCost;
  const roi = totalPipeline - totalCost;
  const roiMultiple =
    totalCost > 0 ? (totalPipeline / totalCost).toFixed(1) : "∞";

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".roi-element", {
        y: 30,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="roi-calculator"
      ref={sectionRef}
      className="w-full bg-background py-16 md:py-24 px-4 md:px-16 lg:px-96 section-border"
    >
      <div className="flex flex-col items-start">
        {/* Header */}
        <div className="roi-element mb-16 flex flex-col items-start text-left gap-4">
          <div className="flex items-center px-4 py-1.5 rounded-full border border-pillBorder">
            <span className="text-[11px] font-sans uppercase tracking-[0.16em] text-muted">
              ROI Calculator
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-medium text-foreground font-serif leading-tight pb-2">
            See it in Numbers
          </h2>
          <p className="text-lg text-muted">
            Plug in your campaign parameters and business economics to project
            your monthly return.
          </p>
        </div>

        {/* Calculator card */}
        <div className="roi-element w-full bg-surface p-8 md:p-10 flex flex-col gap-8 border border-pillBorder">
          <div className="flex flex-col gap-7">
            <SliderField
              label="Leads Reached / Month"
              value={leadsReached}
              display={leadsReached.toLocaleString("en-US")}
              min={5000}
              max={30000}
              step={1000}
              onChange={setLeadsReached}
              tooltip="The total number of prospects your campaign reaches per month via cold email."
            />
            <DropdownField
              label="Campaign Performance"
              value={msgPerResponse}
              options={campaignOptions}
              onChange={setMsgPerResponse}
              tooltip="How many contacts it takes to generate one interested lead. Top performing campaigns see 1 in 150; conservative estimates use 1 in 500. Performance is influenced by various factors like: strength of product-market fit, availability of strong case studies, whether the offer includes specific and measurable claims, whether there is a guarantee or risk reversal in place and many more."
            />
            <SliderField
              label="Fee Per Attended Call"
              value={feePerCall}
              display={`$${feePerCall}`}
              min={150}
              max={350}
              step={10}
              onChange={setFeePerCall}
              tooltip="The fee charged per attended discovery call. The final fee depends on factors like your target audience and what your own deal structure looks like."
            />
            <SliderField
              label="Call Booking Rate"
              value={bookingPct}
              display={`${bookingPct}%`}
              min={0}
              max={100}
              step={1}
              onChange={setBookingPct}
              tooltip="What % of interested leads actually book a discovery call."
            />
            <SliderField
              label="Show Rate"
              value={showRate}
              display={`${showRate}%`}
              min={0}
              max={100}
              step={1}
              onChange={setShowRate}
              tooltip="What % of booked calls actually show up. Our pre-call sequence typically pushes this above 80%."
            />
            <SliderField
              label="Close Rate"
              value={closeRate}
              display={`${closeRate}%`}
              min={0}
              max={100}
              step={1}
              onChange={setCloseRate}
              tooltip="What % of attended calls you close into paying clients."
            />
            <NumberField
              label="Average Client LTV"
              value={ltv}
              min={0}
              max={500000}
              step={500}
              onChange={setLtv}
              prefix="$"
              tooltip="The average total revenue you generate from a single client over the entire time they work with you — including all payments across the engagement. Also factor in referrals: if 1 in 4 clients refers another client, add 25% of your average contract value on top."
            />
          </div>

          {/* Projected outputs */}
          <div className="mt-8 flex flex-col gap-12">
            {/* Funnel metrics row */}
            <div className="grid grid-cols-4 gap-x-8">
              {[
                { label: "Interested Leads", value: fmt(interestedLeads) },
                { label: "Booked Calls", value: fmt(bookedCalls) },
                { label: "Attended Calls", value: fmt(adherentCalls) },
                { label: "Closed Clients", value: fmt(closed) },
              ].map(({ label, value }) => (
                <div key={label} className="flex flex-col gap-1">
                  <span className="text-xs font-sans text-muted">{label}</span>
                  <span className="text-xl font-sans font-light text-foreground tabular-nums leading-none">
                    {value}
                  </span>
                </div>
              ))}
            </div>

            {/* Pipeline sentence + subline */}
            <div className="flex flex-col gap-10">
              <p className="text-4xl md:text-5xl font-sans font-light text-foreground leading-tight">
                Your projected pipeline value is{" "}
                <span className="font-normal">{fmtMoney(totalPipeline)}</span>{" "}
                per month.
              </p>
              <div className="flex items-center justify-between gap-4">
                <p className="text-md font-sans text-muted leading-relaxed">
                  Net ROI after fees:{" "}
                  <span className="text-foreground/70">{fmtMoney(roi)}</span>
                  {" · "}
                  Return multiple:{" "}
                  <span className="text-foreground/70">{roiMultiple}×</span>
                </p>
                <div className="relative group flex-shrink-0">
                  <span className="text-xs font-sans text-muted/60 cursor-default underline underline-offset-2 decoration-dotted">
                    How is this calculated?
                  </span>
                  <div className="absolute bottom-full right-0 mb-2 w-80 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                    <div className="bg-surface3 border border-white/[0.10] rounded-2xl px-4 py-3 text-xs text-foreground leading-relaxed">
                      {leadsReached.toLocaleString()} leads ÷ {msgPerResponse} ={" "}
                      {fmt(interestedLeads)} interested leads → ×{bookingPct}%
                      booking = {fmt(bookedCalls)} booked calls → ×{showRate}%
                      show rate = {fmt(adherentCalls)} attended → ×{closeRate}%
                      close rate = {fmt(closed)} clients × $
                      {ltv.toLocaleString()} LTV = {fmtMoney(totalPipeline)}.
                      Fees: {fmt(adherentCalls)} calls × ${feePerCall} ={" "}
                      {fmtMoney(totalFees)}. Infrastructure: $50 ×{" "}
                      {Math.ceil(leadsReached / 1000)} (per 1,000 contacts) ={" "}
                      {fmtMoney(infraCost)}. Total cost: {fmtMoney(totalCost)}.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-4">
            <MagneticButton
              variant="heroPrimary"
              className="text-sm py-3 px-8"
              onClick={() =>
                window.open(
                  "https://cal.com/henrik-freisleben-3prokl/ai-cold-outbound",
                  "_blank",
                )
              }
            >
              Let's Walk Through The Numbers Together
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ROICalculator;
