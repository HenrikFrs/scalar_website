import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";
import { MagneticButton } from "./Header";

const Footer = () => {
  const footerRef = useRef(null);
  const bgBlueLeftRef = useRef(null);
  const bgWhiteRef = useRef(null);
  const bgBlueRightRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%", // Starts animating when footer is 20% into the viewport
          end: "bottom bottom", // Ends exactly when scrolled to max bottom
          scrub: 1,
        },
      });

      // The wide blue halo left fades in and moves slightly up
      tl.fromTo(
        bgBlueLeftRef.current,
        {
          opacity: 0,
          y: "10vh",
        },
        {
          opacity: 0.7,
          y: "0vh",
          ease: "none",
        },
        0,
      );

      // The bright white/cyan core at the bottom fades in intensely
      tl.fromTo(
        bgWhiteRef.current,
        {
          opacity: 0,
          y: "15vh",
        },
        {
          opacity: 0.9,
          y: "0vh",
          ease: "none",
        },
        0,
      );

      // The secondary blue glow right fades in and moves in from the edge
      tl.fromTo(
        bgBlueRightRef.current,
        {
          opacity: 0,
          x: "5vw",
        },
        {
          opacity: 0.6,
          x: "0vw",
          ease: "none",
        },
        0,
      );

      // The CTA card floats lightly
      tl.fromTo(
        contentRef.current,
        {
          y: "5vh",
        },
        {
          y: "0vh",
          ease: "none",
        },
        0,
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  // Outer container is purely black
  return (
    <footer
      ref={footerRef}
      className="relative bg-black text-foreground pt-24 pb-32 overflow-hidden border-t border-white/5"
    >
      {/* Background Layers Container (1:1 with Target Image) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Left: Massive ambient blue glow resting in the bottom left corner, stretched higher */}
        <div
          ref={bgBlueLeftRef}
          className="absolute w-[100vw] sm:w-[100vw] h-[80vh] rounded-[100%] bg-[#14349D] blur-[140px] opacity-0 -bottom-[40vh]"
        ></div>

        {/* Left Core: The bright "weiß unten" glow, shorter and very blurry for smooth transition */}
        <div
          ref={bgWhiteRef}
          className="absolute w-[70vw] sm:w-[90vw] h-[10vh] rounded-[100%] bg-[rgba(200,230,255,1)] blur-[120px] opacity-0 -bottom-[20vh]"
        ></div>
      </div>

      <div
        ref={contentRef}
        className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 lg:px-24"
      >
        {/* Massive Footer CTA */}
        <div className="relative overflow-hidden rounded-[3rem] p-12 md:p-24 mb-20 border border-white/10 flex flex-col items-center text-center gap-8 bg-white/5 backdrop-blur-2xl shadow-2xl">
          <div className="relative z-10 flex flex-col items-center">
            <h2 className="text-4xl md:text-6xl font-medium tracking-normal mb-4 font-sans text-white pb-2">
              10+ qualified sales calls.
              <br />
              <span className="text-white/60">In the next 60 days.</span>
            </h2>
            <p className="text-white/70 text-lg md:text-xl font-medium max-w-lg">
              Two weeks of warmup. Then interested replies start coming in.
            </p>
          </div>

          <div className="relative z-10 w-full sm:w-auto mt-2">
            <MagneticButton
              variant="heroPrimary"
              className="w-full sm:w-auto text-base py-4 px-8 shadow-xl"
              onClick={() =>
                window.open(
                  "https://cal.com/henrik-freisleben-3prokl/ai-cold-outbound",
                  "_blank",
                )
              }
            >
              Claim Your Spot <ArrowUpRight size={22} className="ml-1" />
            </MagneticButton>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 border-t border-white/10 pt-8">
          {/* Left: Brand Identity */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-2">
              <img
                src={`${import.meta.env.BASE_URL}ScalarAI.png`}
                alt="ScalarAI Logo"
                className="h-10 brightness-0 invert"
              />
              <span className="text-xl font-medium tracking-tight font-sans text-white">
                Scalar AI
              </span>
            </div>
            <p className="text-white/40 text-sm font-medium">
              More revenue through automation and AI
            </p>
          </div>

          {/* Right: Legal Links & Copyright */}
          <div className="flex flex-col items-center md:items-end gap-2 text-xs font-mono text-white/40 mt-4 md:mt-0">
            <div className="flex gap-6 mb-2">
              <Link
                to="/impressum"
                className="hover:text-white transition-colors"
              >
                Imprint
              </Link>
              <Link
                to="/datenschutz"
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
            </div>
            <p>&copy; {new Date().getFullYear()} Scalar AI.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
