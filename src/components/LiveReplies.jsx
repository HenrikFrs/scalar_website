import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Section, SectionHeader } from "./ui";

gsap.registerPlugin(ScrollTrigger);

// Positive replies from Smartlead, quoted as written with the greeting,
// signature and quoted thread removed. German replies appear in English.
// When `text` is a list, it's a thread: each entry is the next reply from
// the same person. Names stay off the page until each sender has agreed
// to be named. Order is strongest first, about three client replies per
// Scalar one.
const replies = [
  { status: "Meeting booked", date: "Oct 22", role: "Law firm", text: ["This sounds like a promising platform that could help our business, and the team is very interested in learning more. Would you share a few time slots that work for you early next week?", "Monday 10am PT works for us.", "Just accepted. Looking forward to it!"] },
  { status: "Meeting request", date: "Oct 31", role: "CRO, robotics startup", text: "Intriguing email, Henrik. Good pitch. Happy to hear more. Let's talk Monday." },
  { status: "Meeting request", date: "Aug 5", role: "Founder, CFO services firm", text: "Thanks for reaching out! Very interested in learning more... how does later in August look for you?" },
  { status: "Meeting request", date: "Oct 7", role: "Consumer protection attorney", text: ["Thanks for the offer, John. Would be happy to check it out. Do you have a demo link?", "I can do 10/13 at 3pm -- does that work? If so, please send an invite."] },
  { status: "Interested", date: "Nov 2", role: "Strategy partner, agency", text: "Of all the funnel emails I get every day, yours was the most credible and the most likeable." },
  { status: "Interested", date: "Nov 5", role: "Founder, solar company", text: "We are in the beginning stages of a fundraising round, and it may be a very good time to have a conversation and see if there is a match." },
  { status: "Meeting request", date: "Oct 8", role: "Founding attorney & CEO, Texas law firm", text: ["I will give you a try.", "Monday at 5:30 p.m. works for me."] },
  { status: "Interested", date: "Nov 11", role: "COO, robotics manufacturer", text: "Thanks Henrik. Impressive outreach email. We could consider an outbound program where we pay per qualified meeting attended. Please connect with Ron who leads Sales and BD for us to understand more." },
  { status: "Meeting request", date: "Aug 20", role: "CEO & Founder, accounting firm", text: "I'm open to a conversation. Can we use this link to find a time?" },
  { status: "Meeting request", date: "Sep 22", role: "COO, Houston law firm", text: ["Do you have any Texas law firms using this tool?", "How long does the demo take?", "Sure. I can look at it this Friday."] },
  { status: "Interested", date: "Nov 2", role: "Co-Founder & CEO, influencer agency", text: "Your timing is perfect, we're currently talking to other providers. So your offer sounds very interesting to us." },
  { status: "Interested", date: "Sep 18", role: "Lender, SBA and commercial loans", text: "Yes, this is definitely interesting to me. We are actually in the process of building out a much more aggressive direct-to-borrower marketing program, so the timing is good." },
  { status: "Meeting request", date: "Aug 13", role: "Managing Principal, accounting firm", text: ["We do have an interest in speaking. Perhaps sometime later next week.", "Thurs, Aug 20: 1:30 ET"] },
  { status: "Meeting request", date: "Oct 26", role: "Trial attorney, law firm", text: ["I do not use AI at the moment due to the horror stories and hallucinations I've heard from AI.", "Lets try to schedule a call next monday after 1 pm CT."] },
  { status: "Meeting request", date: "Oct 22", role: "Pharma distributor", text: "Your offer sounds interesting, do you have time for a quick call tomorrow?" },
  { status: "Meeting request", date: "Oct 22", role: "Attorney, investment law firm", text: "Let's have a call to talk through the process, understanding and costs. You can schedule a call via the following link." },
  { status: "Interested", date: "Nov 4", role: "Serial founder", text: "Interesting concept. I am not sure this situation is a fit for your thesis. But, I do have something I think could be. I am open to a conversation if you are." },
  { status: "Interested", date: "Nov 11", role: "VP Sales, healthcare SaaS", text: "Sure - I am always interested in more leads! Let's talk!" },
  { status: "Meeting request", date: "Nov 3", role: "Managing attorney, international law firm", text: ["Yes, thank you.", "Thanks John. I can see it.", "I could do 1 pm on Tuesday?"] },
  { status: "Meeting request", date: "Oct 30", role: "President, industrial manufacturer", text: ["Please provide details on the current portfolio companies.", "Interesting. … I am at the ADIPEC show next week and will be available the week of the 16th."] },
  { status: "Meeting request", date: "Aug 13", role: "Accounting firm", text: "Sure - what is your availability next week?" },
  { status: "Meeting request", date: "Nov 5", role: "CEO, TV group", text: "Sounds exciting. … Shall we do a video call next week?" },
  { status: "Meeting request", date: "Oct 21", role: "CEO and capital lead, agricultural producer", text: ["Thanks for reaching out. I'm copying [our head of capital], who handles conversations related to outside capital. [They] can take it from here.", "If that fits the type of companies you typically partner with, I'm happy to set up a brief intro call."] },
  { status: "Meeting request", date: "Nov 2", role: "CEO, eyewear group", text: "Yes, that could be interesting, happy to discuss. Does Wednesday or Thursday work for you?" },
  { status: "Meeting request", date: "Nov 13", role: "CEO, consumer hardware brand", text: "Lets set up a time for next week Wednesday." },
  { status: "Meeting request", date: "Sep 17", role: "Attorney, Wisconsin law firm", text: ["I am reviewing various AI options for the firm. Will take a look at the portal and let you know.", "I've connected with Zach and in process of scheduling a call next week for a demo."] },
  { status: "Meeting request", date: "Oct 1", role: "Managing Director, design studio", text: "That sounds interesting and I'd like to learn more about your approach. … Feel free to pick a slot in my calendar." },
  { status: "Info request", date: "Oct 19", role: "Attorney, Tennessee/Arkansas law firm", text: "Yes please send over a brief video" },
  { status: "Interested", date: "Nov 6", role: "COO, global recycling company", text: "Thanks for reaching out and for the introduction. I'm curious how you typically value businesses like ours, especially those with an established global footprint. … Happy to learn more about what you're doing." },
  { status: "Meeting request", date: "Aug 20", role: "Owner, heating consultancy", text: "The idea sounds really exciting, can we discuss it on Teams? E.g. Monday 24.08 at 5:30pm?" },
  { status: "Info request", date: "Oct 23", role: "CEO, multi-office law firm", text: "Yes, video please." },
  { status: "Interested", date: "Oct 19", role: "President, food manufacturer", text: "I'd be interested in learning more about your model and what a potential partnership could look like for us." },
  { status: "Meeting booked", date: "Nov 6", role: "Founder, agency marketplace", text: "Happy to try the free month. 👉 Book a meeting" },
  { status: "Info request", date: "Oct 24", role: "Attorney, law firm", text: "Yes please." },
  { status: "Info request", date: "Aug 7", role: "CPA and CFP, tax practice", text: "Sure, happy to look at specifics." },
  { status: "Info request", date: "Aug 20", role: "Founder, finance firm for online businesses", text: "Sounds potentially interesting - please share" },
  { status: "Info request", date: "Aug 21", role: "President & CEO, management firm", text: "Sure, please share the details. Thanks." },
  { status: "Interested", date: "Oct 26", role: "Attorney and bar association board member", text: "I'm primarily a transactional attorney … However, I know several attorneys through the [bar association] who handle litigation and could potentially benefit from a platform like StrongSuit." },
  { status: "Info request", date: "Oct 5", role: "Law firm owner", text: "We might be interested in this. Can you send me over some more information?" },
  { status: "Info request", date: "Oct 14", role: "Attorney, Indiana law firm", text: "Ok send me more info" },
  { status: "Interested", date: "Jul 9", role: "Managing Director, CAD/CAM software", text: "Yes of course we're interested. 😊" },
  { status: "Interested", date: "Oct 23", role: "Head of Research, digital asset firm", text: "We'd love to try it to see whether it adds value to our sales efforts. Should we sign up through the website?" },
  { status: "Interested", date: "Nov 3", role: "CPA, accounting firm for auto repair shops", text: "Not sure what you are proposing but happy to chat." },
  { status: "Info request", date: "Sep 17", role: "Founder, CPA firm", text: "Whats the ideal firm size that you work with? Thanks" },
  { status: "Info request", date: "Oct 29", role: "CEO, landscaping company", text: "Quick question: do you exclusively do majority investments or are you open to minor investments? Thanks." },
  { status: "Interested", date: "Oct 29", role: "Co-Founder, construction company", text: "I do not think we are a good candidate. If you are in San Francisco, give me a call and I would be happy to meet you." },
];

// Cards shown before "Show all", per column count (four rows of cards)
const ROWS_COLLAPSED = 4;

// Column count follows the breakpoints: 1 on phones, 2 on tablets, 3 on desktop
const useColumns = () => {
  const get = () =>
    typeof window === "undefined"
      ? 3
      : window.matchMedia("(min-width: 1024px)").matches
        ? 3
        : window.matchMedia("(min-width: 640px)").matches
          ? 2
          : 1;
  const [cols, setCols] = useState(get);
  useEffect(() => {
    const queries = ["(min-width: 1024px)", "(min-width: 640px)"].map((q) =>
      window.matchMedia(q),
    );
    const update = () => setCols(get());
    queries.forEach((q) => q.addEventListener("change", update));
    return () => queries.forEach((q) => q.removeEventListener("change", update));
  }, []);
  return cols;
};

const ReplyCard = ({ status, date, role, text }) => (
  <figure className="border border-borderLight bg-background p-5 md:p-6 flex flex-col gap-4">
    <div className="flex items-center justify-between gap-4">
      <span className="inline-flex items-center gap-2 font-mono uppercase text-[11px] leading-none tracking-[0.08em] text-heading">
        <span className="w-1.5 h-1.5 bg-brand" aria-hidden="true" />
        {status}
      </span>
      <span className="font-mono text-[11px] leading-none text-muted">{date}</span>
    </div>
    {Array.isArray(text) ? (
      // A thread: each later message is a follow-up from the same person
      <ol className="flex flex-col gap-3">
        {text.map((message, i) => (
          <li
            key={i}
            className={i > 0 ? "border-l border-borderMid pl-4 flex flex-col gap-1.5" : ""}
          >
            {i > 0 && (
              <span className="font-mono text-[10px] leading-none uppercase tracking-[0.08em] text-muted">
                Follow-up
              </span>
            )}
            <blockquote className="type-body text-heading">{message}</blockquote>
          </li>
        ))}
      </ol>
    ) : (
      <blockquote className="type-body text-heading">{text}</blockquote>
    )}
    <figcaption className="type-small text-muted pt-1">{role}</figcaption>
  </figure>
);

const LiveReplies = () => {
  const sectionRef = useRef(null);
  const wallRef = useRef(null);
  const cols = useColumns();
  const [expanded, setExpanded] = useState(false);
  const shownBefore = useRef(0);

  const visible = expanded ? replies : replies.slice(0, cols * ROWS_COLLAPSED);

  // Deal the cards out across the row, left to right, so the strongest
  // replies sit at the top of every column
  const columns = Array.from({ length: cols }, () => []);
  visible.forEach((reply, i) => columns[i % cols].push({ ...reply, i }));

  // Header and first cards rise in when the section scrolls into view
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".lr-header", {
        y: 30,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
      });
      gsap.from(".reply-card", {
        y: 30,
        opacity: 0,
        duration: 1.1,
        ease: "expo.out",
        stagger: 0.06,
        scrollTrigger: { trigger: wallRef.current, start: "top 85%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Cards revealed by "Show all" rise in after the ones already there, and
  // the sections below get their scroll positions recalculated
  useLayoutEffect(() => {
    const cards = wallRef.current?.querySelectorAll(".reply-card[data-i]");
    if (!cards) return;
    const fresh = [...cards].filter((c) => Number(c.dataset.i) >= shownBefore.current);
    if (expanded && shownBefore.current > 0 && fresh.length) {
      fresh.sort((a, b) => a.dataset.i - b.dataset.i);
      gsap.fromTo(
        fresh,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "expo.out", stagger: 0.04, clearProps: "transform,opacity" },
      );
    }
    shownBefore.current = cards.length;
    ScrollTrigger.refresh();
  }, [expanded, cols]);

  const collapse = () => {
    setExpanded(false);
    // Keep the reader where they were: back to the top of the wall
    const top = wallRef.current.getBoundingClientRect().top + window.scrollY - 120;
    if (window.lenis) window.lenis.scrollTo(top, { immediate: true });
    else window.scrollTo({ top });
  };

  return (
    <Section id="replies" ref={sectionRef}>
      <SectionHeader
        className="lr-header"
        eyebrow="Live Replies"
        title="What prospects write back"
        accent="to our emails"
        description="Positive replies from campaigns we run for clients and for ourselves. Quoted as written, with names and signatures removed."
      />
      <div className="frame-body">
        <div ref={wallRef} className="flex gap-4 items-start">
          {columns.map((col, c) => (
            <div key={c} className="flex-1 min-w-0 flex flex-col gap-4">
              {col.map(({ i, ...reply }) => (
                <div key={i} data-i={i} className="reply-card">
                  <ReplyCard {...reply} />
                </div>
              ))}
            </div>
          ))}
        </div>

        {replies.length > cols * ROWS_COLLAPSED && (
          <div className="flex justify-center mt-8">
            <button
              type="button"
              className="btn btn-secondary"
              aria-expanded={expanded}
              onClick={expanded ? collapse : () => setExpanded(true)}
            >
              {expanded ? "Show fewer replies" : `Show all ${replies.length} replies`}
            </button>
          </div>
        )}
      </div>
    </Section>
  );
};

export default LiveReplies;
