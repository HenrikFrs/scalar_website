import React from "react";

// Small secondary label
export const Eyebrow = ({ children, className = "" }) => (
  <span className={`ui-label text-muted ${className}`}>{children}</span>
);

// Section header: small label, serif title and an optional lead paragraph.
// `accent` is the closing phrase of the title.
export const SectionHeader = ({
  eyebrow,
  title,
  accent,
  description,
  align = "left",
  className = "",
}) => (
  <div
    className={`flex flex-col gap-3 ${
      align === "center" ? "items-center text-center" : "items-start text-left"
    } ${className}`}
  >
    {eyebrow && <span className="pill-tag">{eyebrow}</span>}
    <h2 className="type-h2 text-heading max-w-3xl text-balance">
      {title}
      {accent && (
        <>
          {" "}
          {accent}
        </>
      )}
    </h2>
    {description && (
      <p className="type-body text-body max-w-xl">
        {description}
      </p>
    )}
  </div>
);
