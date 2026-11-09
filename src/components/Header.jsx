import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useLocation } from "react-router-dom";
import { openCal } from "../lib/cal";
import HeroContours from "./HeroContours";

export const MagneticButton = ({
  children,
  className = "",
  onClick,
  variant = "primary",
  style,
}) => {
  const variants = {
    primary: "btn-primary",
    secondary: "btn-secondary",
  };

  return (
    <button
      className={`btn ${variants[variant]} ${className}`}
      style={style}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const navLinks = [
  { label: "How it works", href: "system" },
  { label: "Process", href: "process" },
  { label: "FAQ", href: "faq" },
];

const NAV_MIDPOINT = 36; // Half the 73px bar: where it switches over a dark section

export const Navbar = () => {
  const [overDark, setOverDark] = useState(false);
  const { pathname } = useLocation();

  // Measured on every scroll because sections move when FAQ answers or
  // testimonials expand
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const sections = document.querySelectorAll(
        "main .theme-dark, footer.theme-dark",
      );
      setOverDark(
        [...sections].some((section) => {
          const { top, bottom } = section.getBoundingClientRect();
          return top <= NAV_MIDPOINT && bottom > NAV_MIDPOINT;
        }),
      );
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [pathname]);

  const navTheme = overDark ? "theme-dark" : "";

  return (
    <header
      className={`${navTheme} nav-guide fixed top-0 left-0 right-0 z-[60] w-full bg-background transition-colors duration-300`}
    >
      {/* Same box as the page guides, so their lines run through the bar.
          Logo left, links centred on the page, CTA right */}
      <nav className="nav-box relative mx-auto grid grid-cols-[1fr_auto] md:grid-cols-[1fr_auto_1fr] items-center h-[73px] px-4 md:px-10">
        <a href="/" className="flex items-center gap-2 w-fit">
          <img
            src={`${import.meta.env.BASE_URL}logo4-black.svg`}
            alt="Scalar logo"
            className="brand-logo h-5"
          />
          <span className="font-serif font-normal text-[22px] tracking-[-0.02em] translate-y-[2px] text-foreground transition-colors duration-300">
            Scalar
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(({ label, href }) => (
            <a
              key={label}
              href={`/#${href}`}
              className="type-small text-body transition-colors duration-200 hover:text-foreground"
            >
              {label}
            </a>
          ))}
        </div>

        <MagneticButton
          variant="primary"
          className="h-8 px-3.5 text-[13px] md:h-[41px] md:px-5 md:text-[14px] justify-self-end"
          onClick={openCal}
        >
          Schedule a call
        </MagneticButton>
      </nav>
    </header>
  );
};

const WISTIA_MEDIA_ID = "263tbx9r5k"; // Swap in the new VSL's ID when it's ready

// Not rendered right now; kept for the new VSL
const HeroVideo = () => (
  <div className="hero-element mx-auto w-full max-w-[1238px] px-4 pb-16 md:pb-24">
    <div className="mx-auto w-full md:w-[67%] aspect-video overflow-hidden rounded-[10px] md:rounded-[16px] bg-[#0a0a0b] shadow-2xl">
      <script src="https://fast.wistia.com/player.js" async />
      <script
        src={`https://fast.wistia.com/embed/${WISTIA_MEDIA_ID}.js`}
        async
        type="module"
      />
      <style>{`wistia-player[media-id='${WISTIA_MEDIA_ID}']:not(:defined) { background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/${WISTIA_MEDIA_ID}/swatch'); display: block; filter: blur(5px); padding-top: 56.25%; }`}</style>
      <wistia-player media-id={WISTIA_MEDIA_ID} aspect="1.7777777777777777" />
    </div>
  </div>
);

export const Hero = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-element", {
        y: 24,
        opacity: 0,
        duration: 1.1,
        stagger: 0.08,
        ease: "power3.out",
        delay: 0.1,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden min-h-[100svh] flex"
    >
      {/* Very subtle drifting contour lines, behind the content and kept
          between the vertical guide lines */}
      <div className="footer-box absolute inset-y-0 left-0 right-0 mx-auto overflow-hidden pointer-events-none">
        <HeroContours />
      </div>
      {/* Top padding clears the navbar, so the content centers in the space below it */}
      <div className="shell relative z-10 flex flex-col items-center justify-center text-center pt-28 pb-10">
        <span className="hero-element pill-tag mb-5">Performance-based</span>
        <h1 className="type-h1 text-[44px] md:text-[60px] lg:text-[76px] leading-none text-heading">
          <span className="hero-element block text-balance">
            <span className="whitespace-nowrap">Done-for-you</span> outbound.
          </span>
          <span className="hero-element block text-balance">
            Pay per qualified sales call.
          </span>
        </h1>

        <p className="hero-element mt-5 type-lead text-body max-w-lg">
          We handle sending infrastructure, targeting, copy, outreach and
          replies. You focus on closing deals.
        </p>

        <MagneticButton
          variant="primary"
          className="hero-element mt-7"
          onClick={openCal}
        >
          Book your strategy call
        </MagneticButton>
      </div>

      {/* Hidden until the new VSL is recorded. To bring it back, render
          <HeroVideo /> here, make the section flex-col, and restore the shell's
          padding to pt-32 md:pt-40 pb-12 md:pb-16 */}
    </section>
  );
};
