import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowLeft, ArrowRight, Check, X } from "lucide-react";

// In-depth copy for each step of the "How it works" section, keyed by the
// step's illustration key
export const details = {
  infrastructure: {
    what: [
      "New branded domains, so cold email never touches your main domain's reputation",
      "Many domains instead of one, so if one domain's reputation takes a hit, the rest keep sending",
      "25 inboxes per domain, so the volume is spread out and no single inbox sends too much",
      "Authentication records set up correctly on Microsoft's enterprise infrastructure, so providers can verify every email really comes from you",
      "A 14-day warmup for every inbox, so each one has a sending history before the first cold email",
      "No more than 3 emails per inbox a day, so every sender looks like a person, not a bulk sender",
      "Daily checks of warmup reputation, bounce rate and reply rate, so we never keep sending from burnt domains",
    ],
    why: [
      "Targeting and messaging don't matter if nobody sees the email. If it never reaches the inbox, the best list and the best copy still get zero replies.",
      "Email providers like Google and Microsoft decide where an email lands based on the sender's reputation. They look at how old the domain is, whether it has a sending history, how many emails go out from the same domain and inbox, and how often recipients report its emails.",
      "Send from a brand-new domain with no history, send too much from one domain or inbox, or get reported too often, and the emails end up in the spam folder. And even with great copy and a strong offer, some people will always report an email from a stranger. Once a domain crosses that line, it's burnt: everything it sends gets filtered out from then on.",
    ],
  },
  targeting: {
    what: [
      "A broad list of every company that could be a fit, pulled from multiple sources, so we cover your entire market",
      "The content of every company's website extracted and analyzed by AI, with a prompt fine-tuned to your ideal customer profile, so anyone who doesn't fit is filtered out before a single email goes out",
      "The right decision-makers' email addresses found and verified, so emails reach real people and bounces stay low",
      "The list split into segments by signals, industry or job title, so every group gets messaging written for them",
    ],
    summary:
      "That way you get the best of both worlds: your whole market to send to, and a list precise enough that no one gets irrelevant outreach.",
    why: [
      "Even the best message does nothing in front of people who don't need what you sell. If they're outside your ideal customer profile, they won't reply, however good the copy is.",
      "Most campaigns get this wrong in one of two ways. The first is relying on LinkedIn or Google filters alone. Job titles, industries and company sizes there are self-reported, so you get a big list full of people who aren't a fit, and most of the outreach is irrelevant to the people who receive it.",
      "The second is the opposite: narrowing the list down with niche signals. The people who are left may be slightly more likely to buy, but the filter also throws out a lot of companies that are ready to buy right now and just don't show that particular signal online. In the end, there's barely anyone left to send to.",
    ],
  },
  messaging: {
    what: [
      "Your offer positioned for cold prospects, so it's clear, specific and easy to say yes to",
      "Every message personalized to the prospect's business, so your offer reads as if it was made for exactly their situation",
      "Multiple variants for each segment from day one, all running at the same time, so we find what works as fast as possible",
      "Winners scaled once a test reaches statistical significance and losers replaced with new angles, so results keep improving instead of wearing out",
      "What you learn on your sales calls goes back into the targeting and messaging, turning the system into a flywheel optimized for *clients signed*, not calls booked",
    ],
    why: [
      "Once an email reaches the inbox of the right person, the message decides whether they reply. But which angle works for a cold audience can't be known in advance. It has to be found through testing.",
      "Most campaigns test one message at a time. Each test needs enough emails sent to give a clear answer, so finding a message that works can take months, and the campaign underperforms the whole time.",
      "And people only buy when an offer feels made for their exact situation. The same email sent to a thousand people can never feel that way.",
    ],
  },
  reply: {
    what: [
      "Every reply is read and answered by a real person, never an auto-responder",
      "Interested prospects get an answer fast, while your offer is still fresh",
      "Every interested prospect is followed up until there's a clear yes or no",
      "Calls are booked straight into your calendar, with reminders beforehand so people show up",
    ],
    why: [
      "Interest fades fast. Someone who reads your email in the morning has often forgotten it by the afternoon.",
      "Yet the average business takes 47 hours to get back to a prospect. By then, the answer is little more than another cold email, and the chance of a reply is just as slim.",
      "Then there's the follow-up. Most businesses follow up once, if at all, and then give up, even though most calls are only booked after several follow-ups.",
      "That's why reply handling matters so much: someone needs to be on the inbox at all times, ready to answer the moment a prospect replies, and to keep following up until there's a clear yes or no.",
    ],
  },
};

const Block = ({ label, children }) => (
  <div className="flex flex-col gap-4">
    <span className="ui-label text-muted">{label}</span>
    {children}
  </div>
);

const defaultLabels = {
  why: "Why it matters",
  how: "How we solve it",
  close: "Close",
};

// Large pop-up with the in-depth explanation of one step. Prev/next move
// through the steps without closing it. `content` and `labels` let another
// page (the German LinkedIn one) reuse it with its own copy
const SystemDetail = ({
  steps,
  index,
  onClose,
  onNavigate,
  content = details,
  labels = defaultLabels,
}) => {
  const overlayRef = useRef(null);
  const panelRef = useRef(null);
  const scrollRef = useRef(null);
  const step = steps[index];
  const detail = content[step.illustration];
  const prev = steps[index - 1];
  const next = steps[index + 1];

  // Open animation, page scroll lock, and Escape / arrow keys
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.from(panelRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.5,
        ease: "power3.out",
      });
    });
    window.lenis?.stop();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    return () => {
      ctx.revert();
      window.lenis?.start();
      document.body.style.overflow = overflow;
    };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && next) onNavigate(index + 1);
      if (e.key === "ArrowLeft" && prev) onNavigate(index - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, next, prev, onClose, onNavigate]);

  // Back to the top when switching steps
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [index]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="system-detail-title"
        tabIndex={-1}
        className="relative w-full max-w-3xl max-h-[88dvh] flex flex-col bg-background border border-borderLight shadow-2xl focus:outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-6 p-6 md:p-10 pb-6 md:pb-8 border-b border-borderLight">
          <div className="flex flex-col gap-4">
            <span className="pill-tag w-fit">{step.category}</span>
            <h3 id="system-detail-title" className="type-h3 text-heading">
              {step.label}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={labels.close}
            className="flex-shrink-0 p-2 -m-2 text-muted hover:text-heading transition-colors duration-200"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        <div
          ref={scrollRef}
          data-lenis-prevent
          className="overflow-y-auto overscroll-contain p-6 md:p-10 flex flex-col gap-10"
        >
          <Block label={labels.why}>
            {detail.why.map((p) => (
              <p key={p} className="type-body text-body">
                {p}
              </p>
            ))}
          </Block>

          <Block label={labels.how}>
            <ul className="flex flex-col gap-3">
              {detail.what.map((item, i) => (
                <li key={i} className="type-body text-body flex gap-3">
                  <Check
                    size={16}
                    strokeWidth={1.75}
                    className="mt-1 flex-shrink-0 text-brand"
                  />
                  {item}
                </li>
              ))}
            </ul>
            {detail.summary && (
              <p className="type-body text-heading">{detail.summary}</p>
            )}
          </Block>

        </div>

        <div className="flex items-center justify-between gap-4 px-6 md:px-10 py-4 border-t border-borderLight">
          {prev ? (
            <button
              type="button"
              onClick={() => onNavigate(index - 1)}
              className="ui-label text-muted hover:text-heading transition-colors duration-200 flex items-center gap-2"
            >
              <ArrowLeft size={14} strokeWidth={1.5} />
              {prev.category}
            </button>
          ) : (
            <span />
          )}
          {next && (
            <button
              type="button"
              onClick={() => onNavigate(index + 1)}
              className="ui-label text-muted hover:text-heading transition-colors duration-200 flex items-center gap-2"
            >
              {next.category}
              <ArrowRight size={14} strokeWidth={1.5} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SystemDetail;
