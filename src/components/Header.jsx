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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "How it works", href: "system" },
    { label: "Process", href: "process" },
    { label: "FAQ", href: "faq" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[60] w-full flex justify-center items-stretch pointer-events-none bg-black md:border-b md:border-borderLight">
        <nav className="pointer-events-auto relative flex items-center px-4 md:px-16 lg:px-96 py-2 w-full">
          {/* Logo */}
          <div className="flex-1 flex items-center">
            <a href="/" className="flex items-center gap-2 flex-shrink-0">
              <img
                src={`${import.meta.env.BASE_URL}ScalarAI.png`}
                alt="ScalarAI Logo"
                className="h-11 brightness-0 invert"
              />
              <span className="mt-0.5 text-base font-medium tracking-tight text-white">
                Scalar
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
              variant="ghost"
              className="px-5 py-2.5 text-sm text-white border-transparent hover:border-transparent"
              style={{ backgroundColor: "#1C1E1F" }}
              onClick={() =>
                window.open(
                  "https://cal.com/henrik-freisleben-3prokl/outbound-system",
                  "_blank",
                )
              }
            >
              Schedule a call
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
        className={`fixed top-[60px] left-0 right-0 z-40 bg-background overflow-hidden md:hidden border-b border-borderLight transition-[max-height] duration-300 ease-in-out ${mobileMenuOpen ? "max-h-[420px] pointer-events-auto" : "max-h-0 pointer-events-none"}`}
      >
        <div className="flex flex-col justify-start px-6 pb-8">
          <div className="flex flex-col gap-4 items-start w-full pt-16 md:pt-6">
            {[
              { label: "How it works", href: "system" },
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
                className="text-sm py-2.5 px-5"
                onClick={() =>
                  window.open(
                    "https://cal.com/henrik-freisleben-3prokl/outbound-system",
                    "_blank",
                  )
                }
              >
                Schedule a call
              </MagneticButton>
            </div>
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
      className="relative min-h-[100svh] w-full flex flex-col justify-center px-4 md:px-16 lg:px-96 pt-24 pb-32 text-white overflow-hidden"
      style={{
        backgroundImage: `url('${import.meta.env.BASE_URL}Frame 18.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="relative z-10 w-full flex flex-col items-center gap-10 pt-6 md:pt-12 text-center">
        {/* Title + Subtitle + CTA group */}
        <div className="flex flex-col items-center gap-8">
          <h1 className="hero-element font-serif text-4xl md:text-7xl tracking-tight leading-[1.05] text-white max-w-4xl">
            Done-for-you outbound. Pay per qualified sales call.
          </h1>

          <p className="hero-element font-medium text-base text-muted leading-relaxed max-w-3xl">
            We identify all of your ideal prospects, engage them with
            personalized outreach, and book qualified meetings directly into
            your calendar. You only pay per qualified call that is attended.
          </p>

          <MagneticButton
            variant="heroPrimary"
            className="hero-element text-sm py-2.5 px-5"
            onClick={() =>
              window.open(
                "https://cal.com/henrik-freisleben-3prokl/outbound-system",
                "_blank",
              )
            }
          >
            Book your strategy call
          </MagneticButton>
        </div>
      </div>
    </section>
  );
};
