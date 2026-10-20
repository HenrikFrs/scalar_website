import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import gsap from "gsap";
import {
  CalendarClock,
  KeyRound,
  Minus,
  PhoneCall,
  Plus,
  Rocket,
} from "lucide-react";
import {
  ACTIVE_DOMAIN_MONTHLY_COST,
  BACKUP_DOMAIN_MONTHLY_COST,
  DATA_MONTHLY_COST,
  getInfra,
} from "../lib/infra";

// Private page for closing calls. Not linked anywhere and not indexed.
//
// Everything is set through the URL before the call, so nothing on screen
// gives away other pricing options:
//   ?fee=350              per qualified meeting (default $350)
//   &model=setup          one-time setup fee instead of a monthly tech fee
//   &setup=1500           the setup fee (required with model=setup)
//   &leads=20000          starting lead volume (editable on screen)
//   &for=Halden+Logistics shows "Prepared for ..."
//
// Alt+Shift+C copies the order text for the Stripe terms checkbox.

const LEADS_STEP = 1000;
const LEADS_MAX = 1000000;
const DEFAULT_LEADS = 20000;
const DEFAULT_MEETING_FEE = 350;

// Billed per active and backup domain in Stripe, so round the unit prices the
// same way
const roundCents = (n) => Math.round(n * 100) / 100;
const ACTIVE_DOMAIN_UNIT_PRICE = roundCents(ACTIVE_DOMAIN_MONTHLY_COST);
const BACKUP_DOMAIN_UNIT_PRICE = roundCents(BACKUP_DOMAIN_MONTHLY_COST);

const terms = [
  { icon: PhoneCall, text: "Only pay for qualified meetings that show up" },
  { icon: CalendarClock, text: "2 month minimum, no lock-in after that" },
  {
    icon: KeyRound,
    text: "You own everything: domains, inboxes, sequencer, copy and data",
  },
  { icon: Rocket, text: "Campaigns live within 14 days" },
];

const parseAmount = (raw) => {
  if (raw === null || raw === "") return null;
  const n = Number(raw);
  return isNaN(n) || n < 0 ? null : n;
};

const fmtMoney = (n, decimals = 0) =>
  n === null
    ? "—"
    : "$" +
      n.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });

const Stat = ({ label, value }) => (
  <div className="deal-item flex flex-col gap-2">
    <span className="text-xs font-sans text-muted">{label}</span>
    <span className="font-serif text-3xl md:text-4xl text-foreground leading-none tabular-nums">
      {value}
    </span>
  </div>
);

const DealBuilder = () => {
  const pageRef = useRef(null);
  const [params] = useSearchParams();

  const isSetup = params.get("model") === "setup";
  const meetingFee = parseAmount(params.get("fee")) ?? DEFAULT_MEETING_FEE;
  const setupFee = parseAmount(params.get("setup"));
  const client = params.get("for");

  const [leads, setLeads] = useState(
    () => parseAmount(params.get("leads")) ?? DEFAULT_LEADS,
  );
  const [copied, setCopied] = useState(false);

  const setClampedLeads = (n) =>
    setLeads(Math.min(LEADS_MAX, Math.max(0, n)));

  const { activeDomains, backupDomains, domains, inboxes } = getInfra(leads);
  const techFee =
    activeDomains * ACTIVE_DOMAIN_UNIT_PRICE +
    backupDomains * BACKUP_DOMAIN_UNIT_PRICE +
    DATA_MONTHLY_COST;

  const orderText = [
    "By paying, you agree to the Terms of Service and this order:",
    `${leads.toLocaleString("en-US")} leads reached per month.`,
    isSetup
      ? `One-time setup fee of ${fmtMoney(setupFee, 2)}.`
      : `Monthly tech fee of ${fmtMoney(techFee, 2)} covering ${domains} domains, ${inboxes.toLocaleString("en-US")} inboxes and contact data at cost.`,
    `${fmtMoney(meetingFee, 2)} per qualified meeting that shows up.`,
    "2 month minimum, no lock-in after that.",
  ].join(" ");

  // Keep the page out of search results
  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => meta.remove();
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (e.altKey && e.shiftKey && e.code === "KeyC") {
        e.preventDefault();
        navigator.clipboard.writeText(orderText).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        });
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [orderText]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".deal-element", {
        y: 30,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
      });
      gsap.from(".deal-item", {
        y: 12,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        delay: 0.3,
        ease: "power3.out",
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={pageRef}
      className="min-h-screen bg-background text-foreground py-8 md:py-10 px-4 md:px-8"
    >
      <div className="max-w-3xl mx-auto flex flex-col gap-8">
        <div className="deal-element flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img
              src={`${import.meta.env.BASE_URL}ScalarAI.png`}
              alt="ScalarAI Logo"
              className="h-11 brightness-0 invert"
            />
            <span className="mt-0.5 text-base font-medium tracking-tight text-white">
              Scalar
            </span>
          </div>
          {client && (
            <span className="text-sm font-sans text-muted text-right">
              Prepared for <span className="text-foreground">{client}</span>
            </span>
          )}
        </div>

        <div className="deal-element flex flex-col items-center text-center gap-6">
          <span className="text-[9px] md:text-[11px] font-sans font-semibold tracking-[0.16em] leading-none px-3 py-2 bg-[#3799f7]/25 backdrop-blur-sm text-[#89c4ff]">
            The Offer
          </span>
          <h1 className="text-[33px] md:text-[42px] font-medium text-foreground font-serif leading-tight">
            Your outbound system
          </h1>
        </div>

        <div className="deal-element bg-surface border border-borderLight divide-y divide-borderLight">
          {/* Volume */}
          <div className="px-8 py-7 flex flex-col gap-4">
            <span className="font-mono text-xs text-pillAccentText">
              [Monthly volume]
            </span>
            <div className="flex items-center gap-4">
              <input
                type="text"
                inputMode="numeric"
                aria-label="Leads reached per month"
                value={leads.toLocaleString("en-US")}
                onChange={(e) => {
                  const n = Number(e.target.value.replace(/,/g, ""));
                  if (!isNaN(n)) setClampedLeads(n);
                }}
                className="bg-transparent font-serif text-5xl md:text-6xl text-foreground leading-none tabular-nums focus:outline-none w-full min-w-0"
              />
              <div className="flex items-center flex-shrink-0 border border-borderLight">
                <button
                  type="button"
                  aria-label="Decrease leads"
                  onClick={() => setClampedLeads(leads - LEADS_STEP)}
                  className="p-3 text-muted hover:text-foreground transition-colors duration-150"
                >
                  <Minus size={16} />
                </button>
                <button
                  type="button"
                  aria-label="Increase leads"
                  onClick={() => setClampedLeads(leads + LEADS_STEP)}
                  className="p-3 text-muted hover:text-foreground transition-colors duration-150 border-l border-borderLight"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
            <p className="text-base font-medium text-muted">
              leads reached every month, fixed
            </p>
          </div>

          {/* Infrastructure */}
          <div className="px-8 py-7 flex flex-col gap-6">
            <span className="font-mono text-xs text-pillAccentText">
              [Infrastructure]
            </span>
            <div className="grid grid-cols-3 gap-6">
              <Stat label="Sending domains" value={activeDomains} />
              <Stat label="Backup domains" value={backupDomains} />
              <Stat label="Inboxes" value={inboxes.toLocaleString("en-US")} />
            </div>
          </div>

          {/* Pricing */}
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-borderLight">
            <div className="deal-item px-8 py-7 flex flex-col gap-3">
              <span className="font-mono text-xs text-pillAccentText">
                {isSetup ? "[Setup fee]" : "[Tech fee]"}
              </span>
              <span className="font-serif text-4xl md:text-5xl text-foreground leading-none tabular-nums">
                {isSetup ? fmtMoney(setupFee) : fmtMoney(techFee, 2)}
              </span>
              <span className="text-sm font-medium text-muted">
                {isSetup ? "one-time" : "per month, at cost, no markup"}
              </span>
            </div>
            <div className="deal-item px-8 py-7 flex flex-col gap-3">
              <span className="font-mono text-xs text-pillAccentText">
                [Per meeting]
              </span>
              <span className="font-serif text-4xl md:text-5xl text-foreground leading-none tabular-nums">
                {fmtMoney(meetingFee)}
              </span>
              <span className="text-sm font-medium text-muted">
                per qualified meeting that shows up
              </span>
            </div>
          </div>

          {/* Terms */}
          <div className="grid grid-cols-1 md:grid-cols-2">
            {terms.map(({ icon: Icon, text }, i) => (
              <div
                key={text}
                className={`deal-item px-8 py-5 flex items-center gap-4 border-borderLight ${
                  i > 0 ? "border-t" : ""
                } ${i === 1 ? "md:border-t-0" : ""} ${
                  i % 2 === 1 ? "md:border-l" : ""
                }`}
              >
                <Icon size={18} className="text-pillAccentText flex-shrink-0" />
                <p className="text-base font-medium text-foreground leading-snug">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tiny confirmation for the copy shortcut, meaningless to a viewer */}
      <span
        aria-hidden="true"
        className={`fixed bottom-3 right-3 w-1.5 h-1.5 rounded-full bg-emerald-400 transition-opacity duration-300 ${
          copied ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
};

export default DealBuilder;
