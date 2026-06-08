import React, { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { MagneticButton } from "./Header";

const Footer = () => {
  const footerRef = useRef(null);

  return (
    <footer
      ref={footerRef}
      className="relative text-white pt-24 pb-16 overflow-hidden bg-background"
    >
      <div className="relative z-10 px-4 md:px-16 lg:px-96">
        {/* CTA card */}
        <div
          className="mb-24 overflow-hidden flex flex-col items-center text-center gap-8 py-20 px-8"
          style={{
            backgroundImage: `url(${import.meta.env.BASE_URL}bg3.png)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h2 className="text-3xl md:text-5xl font-medium tracking-normal font-serif text-foreground max-w-2xl leading-tight">
            Ready to book qualified calls on a performance basis?
          </h2>
          <MagneticButton
            variant="heroPrimary"
            className="text-base py-4 px-8"
            onClick={() =>
              window.open(
                "https://cal.com/henrik-freisleben-3prokl/ai-cold-outbound",
                "_blank",
              )
            }
          >
            Get Qualified Calls
          </MagneticButton>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-borderLight pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <img
              src={`${import.meta.env.BASE_URL}ScalarAI.png`}
              alt="ScalarAI Logo"
              className="h-10 brightness-0 invert"
            />
            <span className="text-xl tracking-tight font-sans text-foreground">
              Scalar AI
            </span>
          </div>

          <div className="flex flex-col items-center md:items-end gap-2 text-xs font-mono text-muted">
            <div className="flex gap-6 mb-1">
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
            <p>&copy; {new Date().getFullYear()} Scalar AI.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
