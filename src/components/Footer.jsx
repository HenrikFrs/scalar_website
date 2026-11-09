import React from "react";
import { MagneticButton } from "./Header";
import { openCal } from "../lib/cal";
import HeroContours from "./HeroContours";

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

// Laid out like the reference footer: a centred CTA band, then a lined grid
// (brand left, link columns right). Every band sits inside the page guides.
const Footer = () => (
  // At least one screen tall, so the navbar is over the footer at the page's end
  <footer className="theme-dark section-line relative isolate overflow-hidden bg-background text-body min-h-[100dvh] flex flex-col">
    <div className="page-guides" aria-hidden="true" />

    {/* CTA, over the same drifting contours as the hero (in the dark line
        colour here), kept between the vertical guide lines */}
    <div className="relative">
      <div className="footer-box absolute inset-y-0 left-0 right-0 mx-auto overflow-hidden pointer-events-none">
        <HeroContours />
      </div>
    <div className="shell relative">
      <div className="py-28 md:py-36 flex flex-col items-center text-center">
        <h2 className="type-h1 text-heading text-balance max-w-4xl">
          See if Scalar makes sense for your business.
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

    {/* Brand and links */}
    <div className="section-line flex-1 flex">
      <div className="footer-box mx-auto grid grid-cols-1 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <div className="p-6 md:p-10 border-b md:border-b-0 md:border-r border-borderLight flex flex-col gap-4">
          <a href="/" className="flex items-center gap-2 w-fit">
            <img
              src={`${import.meta.env.BASE_URL}logo4-black.svg`}
              alt="Scalar logo"
              className="brand-logo h-5"
            />
            <span className="font-serif font-normal text-[22px] tracking-[-0.02em] translate-y-[2px] text-foreground">
              Scalar
            </span>
          </a>
          <p className="type-body text-body max-w-md">
            Done-for-you outbound. Pay per qualified sales call.
          </p>
        </div>

        <div className="p-6 md:p-10 flex flex-col gap-16 md:min-h-[376px]">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-10 gap-y-10">
            {linkColumns.map(({ title, links }) => (
              <div key={title} className="flex flex-col">
                <p className="type-body text-heading mb-6">{title}</p>
                <div className="flex flex-col gap-4">
                  {links.map(({ label, href, external }) => (
                    <a
                      key={label}
                      href={href}
                      {...(external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="type-small text-body w-fit transition-[color,transform] duration-200 hover:text-foreground hover:-translate-y-px"
                    >
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="mt-auto text-[12px] leading-[18px] text-body">
            &copy; {new Date().getFullYear()} Scalar. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
