import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

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
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY <= 0) {
        setScrolled(false);
      } else if (currentY > lastY) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      lastY = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "How It Works", href: "system" },
    { label: "Offer", href: "offer" },
    { label: "Process", href: "process" },
    { label: "FAQ", href: "faq" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[60] w-full flex justify-center pointer-events-none md:bg-transparent bg-black/30 backdrop-blur-md md:[backdrop-filter:none]">
        <nav
          className={`pointer-events-auto relative flex items-center transition-all duration-300 ease-in-out
            ${
              scrolled
                ? "md:mt-5 md:rounded-xl md:bg-black/80 md:backdrop-blur-md md:shadow-lg md:shadow-black/40 md:px-3 md:py-2 md:w-[780px] md:max-w-[calc(100vw-32px)] px-4 py-2 w-full"
                : "px-4 md:px-16 lg:px-96 py-2 md:py-4 w-full"
            }`}
        >
          {/* Logo */}
          <div className="flex-1 flex items-center">
            <a href="/" className="flex items-center gap-2 flex-shrink-0">
              <img
                src={`${import.meta.env.BASE_URL}ScalarAI.png`}
                alt="ScalarAI Logo"
                className="h-11 brightness-0 invert"
              />
              <span className="mt-0.5 text-base font-medium tracking-tight text-white">
                Scalar AI
              </span>
            </a>
          </div>

          {/* Nav links — always absolutely centered */}
          <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {navLinks.map(({ label, href }) => (
              <a
                key={label}
                href={`/#${href}`}
                className="text-sm font-normal text-white transition-colors hover:text-white/70"
              >
                {label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="flex-1 hidden md:flex justify-end">
            <MagneticButton
              variant="dark"
              className="px-5 py-2 text-sm rounded-lg border-white/15"
              onClick={() =>
                window.open(
                  "https://cal.com/henrik-freisleben-3prokl/outbound-system",
                  "_blank",
                )
              }
            >
              Schedule a Call
            </MagneticButton>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden ml-auto p-2 -mr-2 relative z-[70] w-10 h-10 flex flex-col justify-center items-center gap-[6px]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span
              className={`w-6 rounded-full transition-transform duration-300 ${mobileMenuOpen ? "rotate-45 translate-y-[3.5px]" : ""}`}
              style={{
                height: "1px",
                backgroundColor: "#ffffff",
                display: "block",
              }}
            ></span>
            <span
              className={`w-6 rounded-full transition-transform duration-300 ${mobileMenuOpen ? "-rotate-45 -translate-y-[3.5px]" : ""}`}
              style={{
                height: "1px",
                backgroundColor: "#ffffff",
                display: "block",
              }}
            ></span>
          </button>
        </nav>
      </header>

      {/* Mobile Menu Dropdown */}
      <div
        className={`fixed top-0 left-0 right-0 z-40 pt-[72px] bg-background flex flex-col justify-start px-6 pb-8 md:hidden transition-opacity duration-300 ${mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        <div className="flex flex-col gap-4 items-start w-full pt-16 md:pt-6">
          {[
            { label: "How It Works", href: "system" },
            { label: "Offer", href: "offer" },
            { label: "Process", href: "process" },
            { label: "FAQ", href: "faq" },
          ].map(({ label, href }, i) => (
            <a
              key={label}
              href={`#${href}`}
              className={`py-1 text-lg font-medium transition-all duration-300 text-white hover:text-white/70 w-full text-left ${mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{
                transitionDelay: mobileMenuOpen ? `${i * 50}ms` : "0ms",
              }}
              onClick={() => setMobileMenuOpen(false)}
            >
              {label}
            </a>
          ))}
          <div
            className={`mt-2 transition-all duration-300 ${mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ transitionDelay: mobileMenuOpen ? "250ms" : "0ms" }}
          >
            <MagneticButton
              variant="heroPrimary"
              className="text-sm py-2 px-5 rounded-lg"
              onClick={() =>
                window.open(
                  "https://cal.com/henrik-freisleben-3prokl/outbound-system",
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
      className="relative min-h-[100svh] w-full flex flex-col justify-start px-4 md:px-16 lg:px-96 pt-24 md:pb-24 text-white overflow-hidden"
      style={{
        backgroundImage: `url('${import.meta.env.BASE_URL}Frame 18.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="relative z-10 w-full flex flex-col items-center gap-10 pt-6 md:pt-12 text-center">
        {/* Title + Subtitle + CTA group */}
        <div className="flex flex-col items-center gap-6">
          <h1 className="hero-element font-serif text-4xl md:text-6xl tracking-tight leading-[1.05] text-white max-w-4xl">
            AI Outbound Architecture To Access Your Entire Market
          </h1>

          <p className="hero-element font-medium text-base text-muted leading-relaxed max-w-3xl">
            We build and operate an AI outbound system that identifies all of
            your ideal prospects and engages them with personalized outreach at
            scale — you only pay per qualified meeting.
          </p>

          <MagneticButton
            variant="heroPrimary"
            className="hero-element text-sm py-2 px-5 rounded-lg"
            onClick={() =>
              window.open(
                "https://cal.com/henrik-freisleben-3prokl/outbound-system",
                "_blank",
              )
            }
          >
            Book Your Strategy Call
          </MagneticButton>
        </div>

        {/* Video */}
        <div className="hero-element w-full md:w-2/3 overflow-hidden shadow-2xl">
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
