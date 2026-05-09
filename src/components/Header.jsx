import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowRight, Menu, X, ArrowUpRight } from "lucide-react";

export const MagneticButton = ({
  children,
  className = "",
  onClick,
  variant = "primary",
}) => {
  const buttonRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const xTo = gsap.quickTo(button, "x", { duration: 1, ease: "power3.out" });
    const yTo = gsap.quickTo(button, "y", { duration: 1, ease: "power3.out" });

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = button.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      xTo(x * 0.2);
      yTo(y * 0.2);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    button.addEventListener("mousemove", handleMouseMove);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const baseClasses =
    "relative overflow-hidden rounded-full font-medium text-sm transition-transform duration-300 hover:scale-[1.03] transition-magnetic flex items-center justify-center gap-2 px-6 py-3 cursor-pointer border";
  const variants = {
    primary: "bg-accent text-background border-accent",
    secondary:
      "bg-background text-foreground border-borderLight hover:border-foreground/30",
    ghost: "bg-transparent text-foreground border-transparent hover:bg-surface",
    heroPrimary: "bg-white text-background border-white",
    heroSecondary:
      "bg-white/10 text-white border-white/20 backdrop-blur-md hover:bg-white/20",
  };

  return (
    <button
      ref={buttonRef}
      className={`${baseClasses} ${variants[variant]} ${className} group`}
      onClick={onClick}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {variant === "primary" && (
        <span className="absolute inset-0 bg-[#e5e5e5] transform scale-y-0 origin-bottom transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-y-100 z-0"></span>
      )}
      {variant === "secondary" && (
        <span className="absolute inset-0 bg-surface transform scale-y-0 origin-bottom transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-y-100 z-0"></span>
      )}
      {variant === "heroPrimary" && (
        <span className="absolute inset-0 bg-[#e5e5e5] transform scale-y-0 origin-bottom transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-y-100 z-0"></span>
      )}
      {variant === "heroSecondary" && (
        <span className="absolute inset-0 bg-white/20 transform scale-y-0 origin-bottom transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-y-100 z-0"></span>
      )}
    </button>
  );
};

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);

      // Adjust threshold for when we are actually past the dark hero
      setPastHero(currentScrollY > window.innerHeight - 80);

      if (mobileMenuOpen) return; // don't hide if menu open

      // Only hide the navbar if scrolled past 400px down
      if (currentScrollY > lastScrollY.current && currentScrollY > 400) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initialize
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[60] w-full transition-all duration-500 ${hidden && !mobileMenuOpen ? "-translate-y-full" : "translate-y-0"} ${scrolled || mobileMenuOpen ? "bg-background/40 backdrop-blur-md border-b border-white/5 shadow-lg" : "bg-transparent border-transparent"}`}
      >
        <div className="flex justify-center w-full">
          <nav
            className={`flex items-center justify-between w-full max-w-6xl px-6 md:px-0 py-4 transition-transform duration-500 ${!scrolled && !mobileMenuOpen ? "translate-y-2" : "translate-y-0"}`}
          >
            <a href="/" className="flex items-center gap-3">
              <img
                src={`${import.meta.env.BASE_URL}ScalarAI.png`}
                alt="ScalarAI Logo"
                className={`h-10 md:h-11 transition-all duration-300 brightness-0 invert`}
              />
              <span
                className={`text-xl md:text-[1.35rem] font-regular tracking-tight font-sans transition-colors duration-300 text-white`}
              >
                Scalar
              </span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
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
                  className={`text-sm font-medium transition-colors hover:-translate-y-[1px] inline-block transform text-white/90 hover:text-white`}
                >
                  {label}
                </a>
              ))}
            </div>

            <div className="hidden md:block">
              <MagneticButton
                variant={pastHero ? "primary" : "heroPrimary"}
                className="px-5 py-2.5 text-xs"
                onClick={() =>
                  window.open(
                    "https://cal.com/henrik-freisleben-3prokl/ai-cold-outbound",
                    "_blank",
                  )
                }
              >
                See If You Qualify <ArrowUpRight size={20} className="ml-1" />
              </MagneticButton>
            </div>

            <button
              className="md:hidden p-2 -mr-2 transition-colors relative z-50 w-10 h-10 flex flex-col justify-center items-center gap-1.5"
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
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      <div
        className={`fixed top-0 left-0 right-0 z-40 pt-[72px] bg-background/40 backdrop-blur-md border-b border-white/5 shadow-2xl flex flex-col justify-start px-6 pb-8 transition-all duration-500 origin-top md:hidden ${mobileMenuOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0 pointer-events-none"}`}
      >
        <div className="flex flex-col gap-4 items-center w-full pt-6">
          {[
            { label: "Results", href: "results" },
            { label: "Features", href: "advantage" },
            { label: "Offer", href: "offer" },
            { label: "Testimonials", href: "testimonials" },
            { label: "FAQ", href: "faq" },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={`#${href}`}
              className={`text-lg font-medium py-2 transition-colors text-white hover:text-white/70 w-full text-center`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {label}
            </a>
          ))}
          <div className={`mt-2 w-full pt-4 border-t border-white/5`}>
            <MagneticButton
              variant="heroPrimary"
              className="w-full justify-center text-sm py-3.5"
              onClick={() =>
                window.open(
                  "https://cal.com/henrik-freisleben-3prokl/ai-cold-outbound",
                  "_blank",
                )
              }
            >
              See If You Qualify <ArrowUpRight size={18} className="ml-1" />
            </MagneticButton>
          </div>
        </div>
      </div>
    </>
  );
};

export const Hero = () => {
  const containerRef = useRef(null);
  const bgBlueRef = useRef(null);
  const bgWhiteRef = useRef(null);

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

      // Subtle grid animation
      gsap.to(".hero-grid", {
        backgroundPosition: "50px 50px",
        duration: 20,
        repeat: -1,
        ease: "none",
      });

      // Background Scroll Animation
      const scrollTl = gsap.timeline({
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
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center md:justify-end text-center px-6 py-24 md:pb-20 text-white bg-black overflow-hidden"
    >
      {/* Background Layers Container */}
      <div className="absolute inset-x-0 bottom-[-20vh] h-[90vh] pointer-events-none z-0 flex items-end justify-center">
        <div className="absolute w-[150vw] sm:w-[120vw] h-[100vh] rounded-[100%] bg-[#14349D] blur-[100px] opacity-30 translate-y-[15vh]"></div>
        <div
          ref={bgBlueRef}
          className="absolute w-[120vw] sm:w-[100vw] h-[65vh] rounded-[100%] bg-[#14349D] blur-[90px] opacity-80 translate-y-[15vh]"
        ></div>
        <div
          ref={bgWhiteRef}
          className="absolute w-[100vw] sm:w-[100vw] h-[65vh] rounded-[100%] bg-[rgba(200,230,255,1)] blur-[80px] opacity-0 translate-y-[35vh]"
        ></div>
      </div>

      {/* Background Grid */}
      <div
        className="hero-grid absolute inset-0 z-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      ></div>

      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center gap-6">
        {/* Headline near top */}
        <h1 className="pt-10 hero-element text-4xl sm:text-5xl md:text-6xl lg:text-[4.75rem] font-regular tracking-wide leading-[1.05] text-white">
          Book 10+ Qualified Meetings Per Month - Don't Pay Until They Show Up
        </h1>

        {/* Sub-headline */}
        <p className="hero-element text-lg md:text-xl text-white/70 max-w-2xl leading-relaxed">
          We send deeply personalized outbound messages to prospects matching
          your ideal customer profile - and we only charge for the meetings that
          actually show up.
        </p>

        {/* Wistia Video */}
        <div className="hero-element w-full max-w-4xl mt-4 rounded-[1.5rem] overflow-hidden shadow-2xl">
          {/* @ts-ignore — wistia-player is a custom element */}
          <wistia-player
            media-id="0hefil3c8d"
            aspect="1.7777777777777777"
          ></wistia-player>
        </div>

        {/* CTA below video */}
        <MagneticButton
          variant="heroPrimary"
          className="hero-element text-base py-4 px-20 w-full sm:w-auto justify-center"
          onClick={() =>
            window.open(
              "https://cal.com/henrik-freisleben-3prokl/ai-cold-outbound",
              "_blank",
            )
          }
        >
          See If You Qualify <ArrowUpRight size={20} className="ml-1" />
        </MagneticButton>
      </div>
    </section>
  );
};
