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
import { SectionHeader } from "./ui";

gsap.registerPlugin(ScrollTrigger);

const Tooltip = ({ text }) => (
  <div className="relative group">
    <Info size={13} className="text-muted/60 cursor-default" />
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
      <div className="bg-surface3 border border-borderLight shadow-xl px-4 py-3 type-small text-heading">
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
    background: `linear-gradient(to right, rgb(var(--brand)) ${pct}%, rgb(var(--border-mid)) ${pct}%)`,
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <label className="type-small font-medium text-heading">{label}</label>
          {tooltip && <Tooltip text={tooltip} />}
        </div>
        <span className="font-mono text-xs text-muted tabular-nums text-right">
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
        className="roi-slider w-full h-0.5 appearance-none cursor-pointer"
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
        <label className="type-small font-medium text-heading">{label}</label>
        {tooltip && <Tooltip text={tooltip} />}
      </div>
      <div className="flex items-center bg-surface border border-borderLight overflow-hidden focus-within:border-brand/50 transition-colors duration-300">
        <div className="flex-1 flex items-center px-4 py-3">
          {prefix && (
            <span className="font-mono text-sm text-muted mr-1">{prefix}</span>
          )}
          <input
            type="text"
            inputMode="numeric"
            value={value.toLocaleString("en-US")}
            onChange={(e) => handleChange(e.target.value.replace(/,/g, ""))}
            className="bg-transparent font-mono text-sm text-heading focus:outline-none w-full"
          />
          {suffix && (
            <span className="font-mono text-sm text-muted ml-1">{suffix}</span>
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

// Contacts per interested lead, upper bound of each tier (lower is better)
const performanceTiers = [
  { max: 600, label: "Strong" },
  { max: 900, label: "Average" },
  { max: Infinity, label: "Below average" },
];
const getPerformanceTier = (leadsPerReply) =>
  performanceTiers.find(({ max }) => leadsPerReply <= max).label;

const BreakdownSection = ({ title, children }) => (
  <div className="flex flex-col gap-1.5">
    <p className="ui-label text-green mb-0.5">
      {title}
    </p>
    {children}
  </div>
);

const BreakdownRow = ({ label, detail, value, strong = false }) => (
  <div
    className={`flex items-baseline justify-between gap-4 ${
      strong ? "border-t border-borderMid pt-1.5 mt-0.5" : ""
    }`}
  >
    <span className={strong ? "text-heading font-medium" : "text-muted"}>
      {label}
      {detail && <span className="text-muted/60"> {detail}</span>}
    </span>
    <span
      className={`tabular-nums flex-shrink-0 ${
        strong ? "text-heading font-medium" : "text-body"
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
  const [msgPerResponse, setMsgPerResponse] = useState(750);
  const [feePerCall, setFeePerCall] = useState(350);
  const [bookingPct, setBookingPct] = useState(50);
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
    <section
      id="roi-calculator"
      ref={sectionRef}
      className="section-line text-body"
    >
      <div className="shell section-y">
        <SectionHeader
            align="center"
          className="roi-element w-full mb-12"
          eyebrow="ROI"
          title="See it in"
          accent="numbers"
          description="Plug in your campaign parameters and business economics to project the long-term profit from one month of campaigns."
        />

        <div className="roi-element bg-surface border border-borderLight w-full grid grid-cols-1 lg:grid-cols-2">
          <div className="flex flex-col gap-7 p-6 md:p-8 lg:border-r border-borderLight">
            <SliderField
              label="Messages Sent"
              value={messagesSent}
              display={`${Math.round(
                messagesSent / SENDING_DAYS,
              ).toLocaleString("en-US")} / day · ${messagesSent.toLocaleString("en-US")} / month`}
              min={10000}
              max={106000}
              step={2000}
              onChange={setMessagesSent}
              tooltip={`The total number of cold emails your campaign sends. Each lead gets ${EMAILS_PER_LEAD} messages, so this reaches ${leadsReached.toLocaleString("en-US")} leads per month.`}
            />
            <SliderField
              label="Campaign Performance"
              value={msgPerResponse}
              display={`${getPerformanceTier(msgPerResponse)} · 1 lead / ${msgPerResponse.toLocaleString("en-US")} contacts`}
              min={100}
              max={1500}
              step={50}
              onChange={setMsgPerResponse}
              tooltip="How many contacts it takes to generate one interested lead. Strong campaigns see 1 in 600 or better; average campaigns see around 1 in 750; below-average campaigns see 1 in 950 or more. Performance is influenced by various factors like: strength of product-market fit, availability of strong case studies, whether the offer includes specific and measurable claims, whether there is a guarantee or risk reversal in place and many more."
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

          <div className="border-t lg:border-t-0 border-borderLight flex flex-col">
            <div className="grid grid-cols-2 border-b border-borderLight">
              {[
                { label: "Interested Leads", value: fmt(interestedLeads) },
                { label: "Booked Calls", value: fmt(bookedCalls) },
                { label: "Attended Calls", value: fmt(adherentCalls) },
                { label: "Closed Clients", value: fmt(closed) },
              ].map(({ label, value }, i) => (
                <div
                  key={label}
                  className={`flex flex-col gap-1 p-6 md:p-8 border-borderLight ${
                    i % 2 === 0 ? "border-r" : ""
                  } ${i < 2 ? "border-b" : ""}`}
                >
                  <span className="ui-label text-muted">{label}</span>
                  <span className="type-stat text-heading tabular-nums mt-2">
                    {value}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-col flex-1 justify-center gap-6 p-6 md:p-8">
              <p className="type-stat text-heading">
                Every dollar returns{" "}
                <span className="text-brand">{roiMultiple}×</span>
              </p>
              <div className="flex flex-col items-start gap-5">
                <p className="type-body text-body">
                  Each month you invest{" "}
                  <span className="text-heading">{fmtMoney(totalCost)}</span>{" "}
                  ({fmtMoney(totalFees)} in call fees + {fmtMoney(infraCost)} in
                  tech), you win clients worth{" "}
                  <span className="text-heading">
                    {fmtMoney(totalPipeline)}
                  </span>{" "}
                  over their lifetime.
                </p>
                <div className="relative group flex-shrink-0">
                  <span className="ui-label text-muted cursor-default underline underline-offset-4 decoration-dotted hover:text-brand transition-colors duration-300">
                    How is this calculated?
                  </span>
                  <div className="absolute bottom-full left-0 mb-2 w-[22rem] max-w-[calc(100vw-4.5rem)] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                    <div className="bg-surface3 border border-borderLight shadow-xl px-4 py-4 text-xs leading-relaxed flex flex-col gap-4">
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

                      <p className="text-[11px] text-body leading-relaxed border-t border-borderMid pt-3">
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
