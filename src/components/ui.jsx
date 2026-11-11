import React from "react";

// Small secondary label
export const Eyebrow = ({ children, className = "" }) => (
  <span className={`ui-label text-muted ${className}`}>{children}</span>
);

// Section separator: a rule across the column, ending at its vertical
// lines. `full` runs it past them, nearly the full screen width (navbar)
export const SectionBorder = ({ full = false }) =>
  full ? (
    <div className="section-border is-full" aria-hidden="true" />
  ) : (
    <div className="shell" aria-hidden="true">
      <div className="section-border" />
    </div>
  );

// One block of the page: the bordered column holding the content, then a
// single rule that separates it from the next block
export const Section = React.forwardRef(
  ({ id, className = "", children }, ref) => (
    <section id={id} ref={ref} className={className}>
      <div className="shell">
        {/* Extra room above and below, on top of the header and body padding */}
        <div className="frame py-6 md:py-8">{children}</div>
      </div>
      <SectionBorder />
    </section>
  ),
);
Section.displayName = "Section";

// Section header: small label, serif title and an optional lead paragraph,
// centred by default. `action` sits on the right (desktop). `accent` is the
// closing phrase of the title.
export const SectionHeader = ({
  eyebrow,
  title,
  accent,
  description,
  align = "center",
  action,
  className = "",
}) => {
  const centered = align === "center";
  return (
    <div
      className={`frame-header flex flex-col gap-8 md:flex-row md:items-end md:justify-between ${
        centered ? "md:justify-center" : ""
      } ${className}`}
    >
      <div
        className={`flex flex-col gap-6 ${
          centered ? "items-center text-center mx-auto" : "items-start"
        }`}
      >
        {eyebrow && <span className="pill-tag">{eyebrow}</span>}
        <h2 className="type-h2 text-heading max-w-3xl text-balance">
          {title}
          {accent && (
            <>
              {" "}
              <span className="text-highlight">{accent}</span>
            </>
          )}
        </h2>
        {description && (
          <p className="type-body text-body max-w-xl">{description}</p>
        )}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
};
