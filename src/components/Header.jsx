import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { BGPattern } from "./ui/bg-pattern";

export const MagneticButton = ({
  children,
  className = "",
  onClick,
  variant = "primary",
  style,
}) => {
  const baseClasses =
    "font-medium text-sm transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer border";
  const variants = {
    primary:
      "bg-accent text-background border-accent hover:bg-accent/80 hover:border-accent/80",
    secondary:
      "bg-background text-foreground border-borderLight hover:bg-surface hover:border-foreground/30",
    ghost: "bg-transparent text-foreground border-transparent hover:bg-surface",
    heroPrimary:
      "bg-[#FAFAFA] text-black border-[#FAFAFA] hover:bg-[#FAFAFA]/85 hover:border-[#FAFAFA]/85",
    heroSecondary:
      "bg-white/5 text-white border-transparent backdrop-blur-md hover:bg-white/10 hover:border-transparent",
    dark: "bg-black text-white border-black hover:bg-black/80 hover:border-black/80",
    light: "text-black border-transparent hover:border-transparent",
    navCta:
      "bg-transparent text-foreground border-transparent hover:text-[#FAFAFA]/85",
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${className}`}
      style={style}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export const Navbar = () => {
  const [pastHero, setPastHero] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setPastHero(window.scrollY > window.innerHeight - 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[60] w-full backdrop-blur-xl bg-background/60">
        <nav className="flex items-center w-full px-6 md:px-12 py-2 md:py-2">
          <a href="/" className="flex items-center gap-3 flex-shrink-0">
            <img
              src={`${import.meta.env.BASE_URL}ScalarAI.png`}
              alt="ScalarAI Logo"
              className="h-10 brightness-0 invert"
            />
            <span className="hidden md:inline text-xl md:text-lg font-regular tracking-tight font-sans text-white">
              Scalar AI
            </span>
          </a>

          <div className="hidden md:flex items-center gap-5 ml-auto">
            {[
              { label: "Results", href: "results" },
              { label: "Features", href: "advantage" },
              { label: "Offer", href: "offer" },
              { label: "Testimonials", href: "testimonials" },
              { label: "FAQ", href: "faq" },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={`/#${href}`}
                className="text-sm font-medium transition-colors hover:-translate-y-[1px] inline-block transform text-muted hover:text-foreground"
              >
                {label}
              </a>
            ))}
            <div className="w-px h-4 bg-white/10" />
            <MagneticButton
              variant="navCta"
              className="px-0 py-3 text-sm"
              onClick={() =>
                window.open(
                  "https://cal.com/henrik-freisleben-3prokl/ai-cold-outbound",
                  "_blank",
                )
              }
            >
              Schedule a Call
            </MagneticButton>
          </div>

          <button
            className="md:hidden ml-auto p-2 -mr-2 transition-colors relative z-50 w-10 h-10 flex flex-col justify-center items-center gap-1.5"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span
              className={`w-6 h-[2px] rounded-full transition-all duration-300 bg-white ${mobileMenuOpen ? "rotate-45 translate-y-[4px]" : ""}`}
            ></span>
            <span
              className={`w-6 h-[2px] rounded-full transition-all duration-300 bg-white ${mobileMenuOpen ? "-rotate-45 -translate-y-[4px]" : ""}`}
            ></span>
          </button>
        </nav>
      </header>

      {/* Mobile Menu Dropdown */}
      <div
        className={`fixed top-0 left-0 right-0 z-40 pt-[72px] bg-background flex flex-col justify-start px-6 pb-8 md:hidden transition-opacity duration-300 ${mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        <div className="flex flex-col gap-4 items-center w-full pt-6">
          {[
            { label: "Results", href: "results" },
            { label: "Features", href: "advantage" },
            { label: "Offer", href: "offer" },
            { label: "Testimonials", href: "testimonials" },
            { label: "FAQ", href: "faq" },
          ].map(({ label, href }, i) => (
            <a
              key={label}
              href={`#${href}`}
              className={`text-lg font-medium py-2 transition-all duration-300 text-white hover:text-white/60 w-full text-center ${mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{
                transitionDelay: mobileMenuOpen ? `${i * 50}ms` : "0ms",
              }}
              onClick={() => setMobileMenuOpen(false)}
            >
              {label}
            </a>
          ))}
          <div
            className={`mt-2 w-full transition-all duration-300 ${mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ transitionDelay: mobileMenuOpen ? "250ms" : "0ms" }}
          >
            <MagneticButton
              variant="heroPrimary"
              className="w-full justify-center text-sm py-3.5 px-6"
              onClick={() =>
                window.open(
                  "https://cal.com/henrik-freisleben-3prokl/ai-cold-outbound",
                  "_blank",
                )
              }
            >
              Schedule a Call
            </MagneticButton>
          </div>
        </div>
      </div>
    </>
  );
};

export const Hero = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-element", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.1,
      });

      // Background Scroll Animation
      /* const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Middle layer moves down slightly and fades
      scrollTl.to(
        bgBlueRef.current,
        {
          y: "15vh",
          opacity: 0.4,
          ease: "none",
        },
        0,
      );

      // Top brightest layer moves rapidly UP and fades IN strongly (creates the intense white core)
      // It is scaled and shaped so the bottom never lifts off revealing blue underneath
      scrollTl.to(
        bgWhiteRef.current,
        {
          y: "10vh",
          scale: 1.5,
          opacity: 0.9,
          ease: "none",
        },
        0,
      ); */
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100dvh] w-full flex flex-col items-center justify-start px-4 md:px-16 lg:px-96 pt-20 md:pt-32 pb-16 md:pb-24 text-white overflow-hidden"
    >
      <BGPattern variant="grid" mask="fade-edges" size={72} fill="#2a2a2a" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle 1300px at 50% -400px, rgba(29,78,216,0.45) 0%, transparent 70%)",
          filter: "blur(100px)",
          zIndex: 1,
        }}
      />
      <div className="relative z-10 w-full flex flex-col items-center gap-8">
        <div className="w-full max-w-5xl flex flex-col items-center text-center gap-8">
          <div
            className="hero-element flex items-center px-4 py-1.5 rounded-full border"
            style={{
              borderColor: "rgba(255,255,255,0.1)",
              backgroundColor: "rgba(255,255,255,0.03)",
              backdropFilter: "blur(8px)",
            }}
          >
            <span className="text-[11px] font-mono uppercase tracking-[0.16em] text-white">
              Pure Performance Basis
            </span>
          </div>

          <h1
            className="hero-element text-4xl md:text-7xl tracking-tight leading-[1.05] text-white"
            style={{ fontFamily: "'Hedvig Letters Serif', serif" }}
          >
            10 to 30+ qualified sales calls per month - pay per attended call
          </h1>

          <p
            className="hero-element text-lg leading-relaxed max-w-3xl"
            style={{ color: "#5C5C5C" }}
          >
            We identify your ideal prospects and reach out with deeply
            personalized emails through AI. You just focus on closing interested
            leads.
          </p>

          <MagneticButton
            variant="heroPrimary"
            className="hero-element text-sm py-3 px-8"
            onClick={() =>
              window.open(
                "https://cal.com/henrik-freisleben-3prokl/ai-cold-outbound",
                "_blank",
              )
            }
          >
            Book Your Strategy Call
          </MagneticButton>
        </div>

        {/* Video */}
        <div className="hero-element w-full max-w-4xl overflow-hidden shadow-2xl mt-5">
          {/* @ts-ignore — wistia-player is a custom element */}
          <wistia-player
            media-id="263tbx9r5k"
            aspect="1.7777777777777777"
          ></wistia-player>
        </div>
      </div>
    </section>
  );
};
