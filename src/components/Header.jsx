import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useLocation } from "react-router-dom";
import { openCal } from "../lib/cal";
import HeroGrid from "./HeroGrid";
import { SectionBorder } from "./ui";

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
      className={`${navTheme} fixed top-0 left-0 right-0 z-[60] w-full bg-background bg-noise transition-colors duration-300`}
    >
      {/* Same column as the sections, so its edges run through the bar.
          Logo left, links centred on the page, CTA right */}
      <nav className="nav-box relative mx-auto">
        <div className="md:frame grid grid-cols-[1fr_auto] md:grid-cols-[1fr_auto_1fr] items-center h-[66px] md:h-[73px] px-4 md:px-10">
        <a href="/" className="flex items-center gap-2 w-fit">
          <img
            src={`${import.meta.env.BASE_URL}logo18-white.svg`}
            alt="Scalar logo"
            className="brand-logo h-6"
          />
          <span className="font-brand font-normal text-[20px] leading-none tracking-[-0.02em] translate-y-px text-foreground transition-colors duration-300">
            Scalar
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(({ label, href }) => (
            <a
              key={label}
              href={`/#${href}`}
              className="type-small text-body transition-colors duration-200 hover:text-brand"
            >
              {label}
            </a>
          ))}
        </div>

        <MagneticButton
          variant="primary"
          className="h-9 px-[15px] text-[13.5px] md:h-[41px] md:px-5 md:text-[14px] justify-self-end"
          onClick={openCal}
        >
          Schedule a call
        </MagneticButton>
        </div>
      </nav>
      {/* Bottom edge: runs past the column, nearly the full screen width */}
      <div className="absolute inset-x-0 bottom-0">
        <SectionBorder full />
      </div>
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
    <section ref={containerRef} className="pt-[66px] md:pt-[73px]">
      {/* Fills the screen below the navbar: a bordered block with the dot
          grid behind the centred content */}
      <div className="shell">
        <div className="frame relative overflow-hidden min-h-[calc(100svh-66px)] md:min-h-[calc(100svh-73px)] flex">
          <HeroGrid />
          <div className="relative z-10 w-full flex flex-col items-center justify-center text-center px-[var(--ci)] py-20">
            <span className="hero-element pill-tag mb-6">Performance-based</span>
            <h1 className="type-h1 text-[44px] md:text-[60px] lg:text-[76px] leading-none text-heading">
              <span className="hero-element block text-balance">
                <span className="whitespace-nowrap">Done-for-you</span> outbound.
              </span>
              <span className="hero-element block text-balance text-highlight">
                Pay per qualified sales call.
              </span>
            </h1>

            <p className="hero-element mt-6 type-lead text-body max-w-lg">
              We handle sending infrastructure, targeting, copy, outreach and
              replies. You focus on closing deals.
            </p>

            <MagneticButton
              variant="primary"
              className="hero-element mt-8"
              onClick={openCal}
            >
              Book your strategy call
            </MagneticButton>
          </div>
        </div>
      </div>
      <SectionBorder />

      {/* Hidden until the new VSL is recorded. To bring it back, render
          <HeroVideo /> here, make the section flex-col, and restore the shell's
          padding to pt-32 md:pt-40 pb-12 md:pb-16 */}
    </section>
  );
};
