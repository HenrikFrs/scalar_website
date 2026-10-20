import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Info, Plus, Minus } from "lucide-react";
import {
  ACTIVE_DOMAIN_MONTHLY_COST,
  BACKUP_DOMAIN_MONTHLY_COST,
  BACKUP_DOMAIN_RATIO,
  DOMAIN_PRICE,
  DOMAIN_ROTATION_MONTHS,
  EMAILS_PER_DOMAIN,
  EMAILS_PER_INBOX_PER_DAY,
  EMAILS_PER_LEAD,
  INBOXES_PER_DOMAIN,
  INBOX_COST_PER_DOMAIN,
  SENDING_DAYS,
  DATA_MONTHLY_COST,
  getInfra,
} from "../lib/infra";

gsap.registerPlugin(ScrollTrigger);

const Tooltip = ({ text }) => (
  <div className="relative group">
    <Info size={13} className="text-muted/60 cursor-default" />
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
      <div className="bg-surface3 border border-white/[0.10] px-4 py-3 text-xs text-foreground leading-relaxed">
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
      <div className="flex items-center bg-surface2 overflow-hidden">
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

const fmt = (n) =>
  n.toLocaleString("en-US", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
const fmtMoney = (n) =>
  "$" + n.toLocaleString("en-US", { maximumFractionDigits: 0 });

// Leads per positive reply, upper bound of each tier (lower is better)
const performanceTiers = [
  { max: 500, label: "Top-performing" },
  { max: 850, label: "Strong" },
  { max: 1150, label: "Average" },
  { max: 1500, label: "Below average" },
  { max: Infinity, label: "Conservative" },
];
const getPerformanceTier = (leadsPerReply) =>
  performanceTiers.find(({ max }) => leadsPerReply <= max).label;

const BreakdownSection = ({ title, children }) => (
  <div className="flex flex-col gap-1.5">
    <p className="text-[10px] uppercase tracking-[0.14em] text-muted/60 mb-0.5">
      {title}
    </p>
    {children}
  </div>
);

const BreakdownRow = ({ label, detail, value, strong = false }) => (
  <div
    className={`flex items-baseline justify-between gap-4 ${
      strong ? "border-t border-white/[0.08] pt-1.5 mt-0.5" : ""
    }`}
  >
    <span className={strong ? "text-foreground font-medium" : "text-muted"}>
      {label}
      {detail && <span className="text-muted/60"> {detail}</span>}
    </span>
    <span
      className={`tabular-nums flex-shrink-0 ${
        strong ? "text-foreground font-medium" : "text-foreground/80"
      }`}
    >
      {value}
    </span>
  </div>
);

const ROICalculator = () => {
  const sectionRef = useRef(null);

  const [messagesSent, setMessagesSent] = useState(22000);
  const leadsReached = messagesSent / EMAILS_PER_LEAD;
  const [msgPerResponse, setMsgPerResponse] = useState(1000);
  const [feePerCall, setFeePerCall] = useState(350);
  const [bookingPct, setBookingPct] = useState(60);
  const [showRate, setShowRate] = useState(85);
  const [closeRate, setCloseRate] = useState(25);
  const [ltv, setLtv] = useState(50000);

  const interestedLeads = leadsReached / Math.max(msgPerResponse, 1);
  const bookedCalls = interestedLeads * (bookingPct / 100);
  const adherentCalls = bookedCalls * (showRate / 100);
  const closed = adherentCalls * (closeRate / 100);
  const totalPipeline = closed * ltv;
  const totalFees = adherentCalls * feePerCall;
  const {
    emailsSent,
    activeDomains,
    backupDomains,
    monthlyCost: infraCost,
  } = getInfra(leadsReached);
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
    <section
      id="roi-calculator"
      ref={sectionRef}
      className="w-full bg-background py-12 md:py-24 px-4 md:px-16 lg:px-96 section-border"
    >
      <div className="flex flex-col items-start">
        <div className="roi-element mb-16 w-full flex flex-col items-center text-center gap-6">
          <span className="text-[9px] md:text-[11px] font-sans font-semibold tracking-[0.16em] leading-none px-3 py-2 bg-[#3799f7]/25 backdrop-blur-sm text-[#89c4ff]">
            ROI Calculator
          </span>
          <h2 className="text-[33px] md:text-[42px] font-medium text-foreground font-serif leading-tight max-w-2xl">
            See it in numbers
          </h2>
          <p className="text-base font-medium text-muted leading-relaxed max-w-2xl">
            Plug in your campaign parameters and business economics to project
            the long-term profit from one month of campaigns.
          </p>
        </div>

        <div className="roi-element w-full bg-surface border border-borderLight p-8 md:p-10 flex flex-col gap-8">
          <div className="flex flex-col gap-7">
            <SliderField
              label="Messages Sent"
              value={messagesSent}
              display={`${messagesSent.toLocaleString("en-US")} / month · ${Math.round(
                messagesSent / SENDING_DAYS,
              ).toLocaleString("en-US")} / day`}
              min={10000}
              max={50000}
              step={2000}
              onChange={setMessagesSent}
              tooltip={`The total number of cold emails your campaign sends. Each lead gets ${EMAILS_PER_LEAD} messages, so this reaches ${leadsReached.toLocaleString("en-US")} leads per month.`}
            />
            <SliderField
              label="Campaign Performance"
              value={msgPerResponse}
              display={`${getPerformanceTier(msgPerResponse)} · 1 reply / ${msgPerResponse.toLocaleString("en-US")} leads`}
              min={250}
              max={2000}
              step={50}
              onChange={setMsgPerResponse}
              tooltip="How many leads it takes to generate one positive reply. Top-performing campaigns see 1 in 500 or better; average campaigns see around 1 in 1,000; conservative estimates use 1 in 1,500 or more. Performance is influenced by various factors like: strength of product-market fit, availability of strong case studies, whether the offer includes specific and measurable claims, whether there is a guarantee or risk reversal in place and many more."
            />
            <SliderField
              label="Fee Per Attended Call"
              value={feePerCall}
              display={`$${feePerCall}`}
              min={250}
              max={500}
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
              tooltip="The average total gross profit you generate from a single client over the entire time they work with you — including all payments across the engagement. Also factor in referrals: if 1 in 4 clients refers another client, add 25% of your average contract value on top."
            />
          </div>

          <div className="mt-8 flex flex-col gap-12">
            <div className="grid grid-cols-4 gap-x-8">
              {[
                { label: "Interested Leads", value: fmt(interestedLeads) },
                { label: "Booked Calls", value: fmt(bookedCalls) },
                { label: "Attended Calls", value: fmt(adherentCalls) },
                { label: "Closed Clients", value: fmt(closed) },
              ].map(({ label, value }) => (
                <div key={label} className="flex flex-col gap-1">
                  <span className="text-xs font-sans text-muted">{label}</span>
                  <span className="text-xl font-sans font-normal text-foreground tabular-nums leading-none">
                    {value}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-10">
              <p className="text-2xl md:text-3xl font-sans font-normal text-foreground leading-tight">
                Every dollar returns{" "}
                <span className="font-normal">{roiMultiple}×</span>
              </p>
              <div className="flex items-center justify-between gap-4">
                <p className="text-base font-semibold font-sans text-muted leading-relaxed">
                  Each month you invest{" "}
                  <span className="text-foreground/70">{fmtMoney(totalCost)}</span>{" "}
                  ({fmtMoney(totalFees)} in call fees + {fmtMoney(infraCost)} in
                  tech), you win clients worth{" "}
                  <span className="text-foreground/70">
                    {fmtMoney(totalPipeline)}
                  </span>{" "}
                  over their lifetime.
                </p>
                <div className="relative group flex-shrink-0">
                  <span className="text-xs font-sans text-muted/60 cursor-default underline underline-offset-2 decoration-dotted">
                    How is this calculated?
                  </span>
                  <div className="absolute bottom-full right-0 mb-2 w-[22rem] max-w-[calc(100vw-2rem)] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                    <div className="bg-surface3 border border-white/[0.10] px-4 py-4 text-xs leading-relaxed flex flex-col gap-4">
                      <BreakdownSection title="Pipeline">
                        <BreakdownRow
                          label="Messages sent"
                          value={messagesSent.toLocaleString("en-US")}
                        />
                        <BreakdownRow
                          label="Leads reached"
                          detail={`÷ ${EMAILS_PER_LEAD} per lead`}
                          value={leadsReached.toLocaleString("en-US")}
                        />
                        <BreakdownRow
                          label="Interested leads"
                          detail={`1 per ${msgPerResponse.toLocaleString("en-US")}`}
                          value={fmt(interestedLeads)}
                        />
                        <BreakdownRow
                          label="Booked calls"
                          detail={`× ${bookingPct}%`}
                          value={fmt(bookedCalls)}
                        />
                        <BreakdownRow
                          label="Attended calls"
                          detail={`× ${showRate}%`}
                          value={fmt(adherentCalls)}
                        />
                        <BreakdownRow
                          label="Closed clients"
                          detail={`× ${closeRate}%`}
                          value={fmt(closed)}
                        />
                        <BreakdownRow
                          label="Long-term revenue"
                          detail={`× ${fmtMoney(ltv)} LTV`}
                          value={fmtMoney(totalPipeline)}
                          strong
                        />
                      </BreakdownSection>

                      <BreakdownSection title="Costs">
                        <BreakdownRow
                          label="Call fees"
                          detail={`${fmt(adherentCalls)} × $${feePerCall}`}
                          value={fmtMoney(totalFees)}
                        />
                        <BreakdownRow
                          label="Active domains"
                          detail={`${activeDomains} × $${ACTIVE_DOMAIN_MONTHLY_COST.toFixed(2)}`}
                          value={fmtMoney(activeDomains * ACTIVE_DOMAIN_MONTHLY_COST)}
                        />
                        <BreakdownRow
                          label="Backup domains"
                          detail={`${backupDomains} × $${BACKUP_DOMAIN_MONTHLY_COST.toFixed(2)}`}
                          value={fmtMoney(backupDomains * BACKUP_DOMAIN_MONTHLY_COST)}
                        />
                        <BreakdownRow
                          label="Contact data"
                          value={fmtMoney(DATA_MONTHLY_COST)}
                        />
                        <BreakdownRow
                          label="Total cost"
                          value={fmtMoney(totalCost)}
                          strong
                        />
                      </BreakdownSection>

                      <BreakdownSection title="Result">
                        <BreakdownRow
                          label="Long-term profit"
                          value={fmtMoney(roi)}
                          strong
                        />
                        <BreakdownRow
                          label="Return multiple"
                          value={`${roiMultiple}×`}
                        />
                      </BreakdownSection>

                      <p className="text-[11px] text-muted/70 leading-relaxed border-t border-white/[0.08] pt-3">
                        Each domain has {INBOXES_PER_DOMAIN} inboxes sending{" "}
                        {EMAILS_PER_INBOX_PER_DAY} emails/day over{" "}
                        {SENDING_DAYS} days ={" "}
                        {EMAILS_PER_DOMAIN.toLocaleString("en-US")} emails/month,
                        so {emailsSent.toLocaleString("en-US")} emails need{" "}
                        {activeDomains} active domains, plus{" "}
                        {Math.round(BACKUP_DOMAIN_RATIO * 100)}% as backups. A
                        domain costs ${INBOX_COST_PER_DOMAIN} for inboxes + $
                        {DOMAIN_PRICE} ÷ {DOMAIN_ROTATION_MONTHS} months
                        (rotation).
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ROICalculator;
