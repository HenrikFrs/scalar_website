import React, { useRef } from "react";
import { Linkedin } from "lucide-react";
import { MagneticButton } from "./Header";

const Footer = () => {
  const footerRef = useRef(null);

  return (
    <footer
      ref={footerRef}
      className="relative text-white pt-12 pb-16 overflow-hidden bg-background"
    >
      <div className="relative z-10 px-4 md:px-16 lg:px-96">
        {/* CTA card */}
        <div
          className="mb-12 overflow-hidden rounded-xl border border-pillBorder flex flex-col items-start text-left gap-8 py-16 px-12 relative"
          style={{
            backgroundImage: `url('${import.meta.env.BASE_URL}Frame 18.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center bottom",
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
          <h2 className="relative z-10 text-3xl md:text-4xl font-medium tracking-normal font-serif text-foreground max-w-3xl leading-tight">
            Get qualified calls on a pay-per-call basis.
          </h2>
          <MagneticButton
            variant="heroPrimary"
            className="relative z-10 text-sm py-2 px-5 rounded-lg"
            onClick={() =>
              window.open(
                "https://cal.com/henrik-freisleben-3prokl/outbound-system",
                "_blank",
              )
            }
          >
            Get Started
          </MagneticButton>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between md:items-stretch gap-6">
          {/* Left col */}
          <div className="flex flex-col justify-between">
            <div className="flex flex-col items-start gap-6">
              <div className="flex items-center gap-2">
                <img
                  src={`${import.meta.env.BASE_URL}ScalarAI.png`}
                  alt="ScalarAI Logo"
                  className="h-10 brightness-0 invert"
                />
                <span className="text-lg tracking-tight font-medium text-foreground">
                  Scalar AI
                </span>
              </div>
              {/* Mobile-only links */}
              <div className="flex flex-col gap-3 text-xs font-mono text-muted md:hidden">
                <a
                  href="/imprint"
                  className="hover:text-foreground transition-colors"
                >
                  Imprint
                </a>
                <a
                  href="/privacy-policy"
                  className="hover:text-foreground transition-colors"
                >
                  Privacy Policy
                </a>
              </div>
            </div>
            {/* Mobile: copyright + LinkedIn on same row */}
            <div className="flex items-center justify-between mt-6 md:mt-24">
              <p className="text-xs font-mono text-muted">
                &copy; {new Date().getFullYear()} Scalar AI.
              </p>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-foreground transition-colors md:hidden"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Right col — desktop only */}
          <div className="hidden md:flex flex-col justify-between items-end">
            <div className="flex gap-6 text-xs font-mono text-muted">
              <a
                href="/imprint"
                className="hover:text-foreground transition-colors"
              >
                Imprint
              </a>
              <a
                href="/privacy-policy"
                className="hover:text-foreground transition-colors"
              >
                Privacy Policy
              </a>
            </div>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-foreground transition-colors"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
