import React from "react";
import { MagneticButton } from "./Header";
import { openCal } from "../lib/cal";

const linkColumns = [
  {
    title: "Explore",
    links: [
      { label: "How it works", href: "/#system" },
      { label: "Process", href: "/#process" },
      { label: "FAQ", href: "/#faq" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Imprint", href: "/imprint" },
      { label: "Privacy Policy", href: "/privacy-policy" },
    ],
  },
  {
    title: "Connect",
    links: [{ label: "LinkedIn", href: "https://www.linkedin.com", external: true }],
  },
];

const Footer = () => (
  // At least one screen tall, so the navbar is over the footer at the page's end
  <footer className="theme-dark relative isolate overflow-hidden bg-background text-body min-h-[100dvh] flex flex-col">
    <div className="page-guides" aria-hidden="true" />
    {/* CTA */}
    <div className="shell">
      <div className="section-y flex flex-col items-start text-left">
        <h2 className="type-h2 text-heading text-balance">
          Get qualified calls on a{" "}
          <span className="whitespace-nowrap">pay-per-call</span>{" "}
          basis.
        </h2>
        <MagneticButton
          variant="primary"
          className="mt-7"
          onClick={openCal}
        >
          Get started
        </MagneticButton>
      </div>
    </div>

    {/* Links; this section takes up the footer's spare height */}
    <div className="section-line flex-1">
      <div className="shell py-12 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col gap-4">
          <a href="/" className="flex items-center gap-2 w-fit">
            <img
              src={`${import.meta.env.BASE_URL}logo2-white-transparent.svg`}
              alt="Scalar logo"
              className="brand-logo h-9 -mx-1"
            />
            <span className="font-brand font-[450] text-[16px] tracking-[-0.02em] text-foreground">
              Scalar
            </span>
          </a>
          <p className="type-body text-body max-w-sm">
            Done-for-you outbound. Pay per qualified sales call.
          </p>
          <p className="ui-label text-muted">
            &copy; {new Date().getFullYear()} Scalar. All rights reserved.
          </p>
        </div>

        <div className="flex flex-wrap gap-x-14 gap-y-8 md:justify-end">
          {linkColumns.map(({ title, links }) => (
            <div key={title} className="flex flex-col gap-2.5">
              <p className="ui-label text-foreground mb-1">{title}</p>
              {links.map(({ label, href, external }) => (
                <a
                  key={label}
                  href={href}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="type-small text-muted hover:text-foreground transition-colors duration-200"
                >
                  {label}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
