import React from "react";
import { MagneticButton } from "./Header";
import { openCal } from "../lib/cal";
import HeroGrid from "./HeroGrid";
import { Section } from "./ui";

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
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com", external: true },
    ],
  },
];

const navLinks = linkColumns.find((c) => c.title === "Explore").links;
const legalLinks = linkColumns.find((c) => c.title === "Legal").links;
const connectLinks = linkColumns.find((c) => c.title === "Connect").links;

const FooterLink = ({ label, href, external }) => (
  <a
    href={href}
    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    className="type-small text-muted w-fit transition-[color,transform] duration-200 hover:text-foreground hover:-translate-y-px"
  >
    {label}
  </a>
);

// Laid out like the reference: the CTA as an outlined card over the dot
// grid inside the page column, then the footer as an outlined box (brand
// and links on top, social at the bottom) and a legal row beneath it
const Footer = () => (
  <footer className="theme-dark text-body">
    <Section>
      <div className="p-4">
        <div className="relative overflow-hidden rounded-[16px] border border-borderLight">
          <HeroGrid />
          <div className="relative px-[var(--ci)] py-24 md:py-32 flex flex-col items-center text-center">
            <h2 className="type-h1 text-heading text-balance max-w-4xl">
              See if Scalar makes sense for{" "}
              <span className="text-highlight">your business.</span>
            </h2>
            <p className="mt-5 type-body text-body max-w-xl">
              You only pay for the qualified calls you decide to take.
            </p>
            <MagneticButton variant="primary" className="mt-9" onClick={openCal}>
              Get started
            </MagneticButton>
          </div>
        </div>
      </div>
    </Section>

    {/* Brand, links and legal row, inside the page column like the
        sections, with the same inset as the CTA card */}
    <div className="shell">
    <div className="frame p-4">
      <div className="rounded-[8px] border border-borderLight p-4 md:p-8 flex flex-col gap-10 md:min-h-[280px] justify-between">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          <div className="flex flex-col gap-6 md:w-80">
            <a href="/" className="flex items-center gap-2 w-fit">
              <img
                src={`${import.meta.env.BASE_URL}logo18-white.svg`}
                alt="Scalar logo"
                className="brand-logo h-6"
              />
              <span className="font-brand font-normal text-[20px] leading-none tracking-[-0.02em] translate-y-px text-foreground">
                Scalar
              </span>
            </a>
            <p className="type-body text-body">
              Done-for-you outbound. Pay per qualified sales call.
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-4 gap-y-2">
            {navLinks.map((link) => (
              <FooterLink key={link.label} {...link} />
            ))}
          </nav>
        </div>

        <div className="flex flex-wrap gap-6">
          {connectLinks.map((link) => (
            <FooterLink key={link.label} {...link} />
          ))}
        </div>
      </div>

      <div className="flex flex-col-reverse md:flex-row md:items-center justify-between gap-4 px-4 md:px-8 pt-6 pb-2">
        <p className="type-small text-muted">
          &copy; {new Date().getFullYear()} Scalar. All rights reserved.
        </p>
        <div className="flex gap-6">
          {legalLinks.map((link) => (
            <FooterLink key={link.label} {...link} />
          ))}
        </div>
      </div>
    </div>
    </div>
  </footer>
);

export default Footer;
