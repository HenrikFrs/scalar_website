import React from "react";

// Diagrams for the "How it works" steps. Drawn as SVG in the site's own
// language: hairlines, small square dots, the blue and coral accents and
// grey mono labels, with a little motion and as few words as possible.
// Motion classes (viz-*) live in index.css and stop for reduced motion.

const W = 480;
const H = 240;
const CORAL = "#f96d57";

// Grey mono caption, like the eyebrow labels
const Label = ({ x, y, children, anchor = "middle", className = "fill-muted" }) => (
  <text
    x={x}
    y={y}
    textAnchor={anchor}
    className={`font-mono font-bold uppercase ${className}`}
    style={{ fontSize: 10, letterSpacing: "0.08em" }}
  >
    {children}
  </text>
);

const Frame = ({ children, label }) => (
  <svg
    viewBox={`0 0 ${W} ${H}`}
    className="w-full max-w-[540px] h-auto select-none overflow-visible"
    role="img"
    aria-label={label}
  >
    {children}
  </svg>
);

// Stable pseudo-random numbers, so the pictures don't change between renders
const rand = (n) => {
  const x = Math.sin(n * 91.345) * 47453.5453;
  return x - Math.floor(x);
};

// 1. One domain feeds a 5×5 block of inboxes, which send in a steady flow
export const InfraVisual = () => {
  const size = 14;
  const step = 22;
  const gx = 172;
  const gy = 120 - (4 * step + size) / 2; // Grid centred on the domain
  const rows = [0, 1, 2, 3, 4];
  const rowY = (r) => gy + r * step + size / 2;
  const gridRight = gx + 4 * step + size;

  return (
    <Frame label="One domain with 25 inboxes, each sending a steady flow of emails">
      {/* Domain */}
      <rect x="40" y="98" width="44" height="44" className="fill-none stroke-foreground/30" />
      <rect x="58" y="116" width="8" height="8" className="fill-brand" />
      <Label x={62} y={172}>Domain</Label>

      {/* Branches to each row of inboxes */}
      <path
        d={`M84 120H148M148 ${rowY(0)}V${rowY(4)}${rows
          .map((r) => `M148 ${rowY(r)}H${gx - 6}`)
          .join("")}`}
        className="fill-none stroke-foreground/20"
      />

      {/* Inboxes; some are mid-send and glow */}
      {rows.map((r) =>
        rows.map((c) => {
          const i = r * 5 + c;
          const lit = rand(i + 3) > 0.55;
          return (
            <rect
              key={i}
              x={gx + c * step}
              y={gy + r * step}
              width={size}
              height={size}
              className={
                lit
                  ? "fill-brand viz-pulse"
                  : "fill-none stroke-foreground/20"
              }
              style={
                lit
                  ? { animationDelay: `${(-rand(i + 40) * 3).toFixed(2)}s` }
                  : undefined
              }
            />
          );
        }),
      )}
      <Label x={gx + (4 * step + size) / 2} y={gy + 4 * step + size + 28}>
        25 inboxes
      </Label>

      {/* Outgoing mail: a faint track per row with a blue pulse moving out */}
      {rows.map((r) => (
        <g key={r}>
          <path
            d={`M${gridRight + 8} ${rowY(r)}H440`}
            className="fill-none stroke-foreground/10"
          />
          <path
            d={`M${gridRight + 8} ${rowY(r)}H440`}
            className="fill-none stroke-brand viz-flow"
            style={{ animationDelay: `${(-r * 0.55).toFixed(2)}s` }}
          />
        </g>
      ))}
      <Label x={440} y={gy + 4 * step + size + 28} anchor="end">
        Sending
      </Label>
    </Frame>
  );
};

// 2. Every company in the market, scanned and sorted: blue fits the ICP,
//    coral is on the do-not-contact list, grey is filtered out
export const TargetingVisual = () => {
  const cols = 13;
  const rowsN = 6;
  const x0 = 60;
  const y0 = 44;
  const dx = 30;
  const dy = 26;
  const dots = [];
  for (let r = 0; r < rowsN; r++) {
    for (let c = 0; c < cols; c++) {
      const v = rand(r * cols + c + 7);
      const status = v > 0.72 ? "fit" : v < 0.07 ? "dnc" : "out";
      dots.push({ x: x0 + c * dx, y: y0 + r * dy, status, key: `${r}-${c}` });
    }
  }
  const fieldBottom = y0 + (rowsN - 1) * dy;

  return (
    <Frame label="Every company in the market checked against the ideal customer profile">
      {dots.map(({ x, y, status, key }) => (
        <rect
          key={key}
          x={x - 2}
          y={y - 2}
          width="4"
          height="4"
          className={
            status === "fit"
              ? "fill-brand"
              : status === "dnc"
                ? ""
                : "fill-foreground/20"
          }
          fill={status === "dnc" ? CORAL : undefined}
        />
      ))}

      {/* Scan line sweeping across the field */}
      <g className="viz-scan">
        <rect x={x0 - 20} y={y0 - 16} width="20" height={fieldBottom - y0 + 32} fill="url(#scan-fade)" />
        <path d={`M${x0} ${y0 - 16}V${fieldBottom + 16}`} className="stroke-brand" />
      </g>
      <defs>
        <linearGradient id="scan-fade" x1="0" x2="1">
          <stop offset="0" stopColor="rgb(37 99 235)" stopOpacity="0" />
          <stop offset="1" stopColor="rgb(37 99 235)" stopOpacity="0.18" />
        </linearGradient>
      </defs>

      {/* Legend */}
      <g transform={`translate(${x0 - 2} ${fieldBottom + 40})`}>
        <rect y="-7" width="6" height="6" className="fill-brand" />
        <Label x={14} y={0} anchor="start">Fit</Label>
        <rect x="70" y="-7" width="6" height="6" className="fill-foreground/20" />
        <Label x={84} y={0} anchor="start">No fit</Label>
        <rect x="164" y="-7" width="6" height="6" fill={CORAL} />
        <Label x={178} y={0} anchor="start">Do not contact</Label>
      </g>
    </Frame>
  );
};

// 3. Variants run side by side; the winner scales, the weakest is replaced
const variants = [
  { name: "A", rate: 2.6, state: "testing" },
  { name: "B", rate: 4.1, state: "winner" },
  { name: "C", rate: 0.4, state: "replaced" },
  { name: "D", rate: 1.8, state: "testing" },
];

export const MessagingVisual = () => {
  const trackX = 84;
  const trackW = 290;
  const max = 4.5;
  return (
    <Frame label="Message variants compared by reply rate; the winner scales">
      {variants.map(({ name, rate, state }, i) => {
        const y = 52 + i * 46;
        const w = (rate / max) * trackW;
        const winner = state === "winner";
        const replaced = state === "replaced";
        return (
          <g key={name}>
            <Label
              x={48}
              y={y + 4}
              anchor="start"
              className={winner ? "fill-foreground" : "fill-muted"}
            >
              {name}
            </Label>
            <path d={`M${trackX} ${y}H${trackX + trackW}`} className="stroke-foreground/10" />
            <rect
              x={trackX}
              y={y - 3}
              width={w}
              height="6"
              className={`viz-grow ${
                winner
                  ? "fill-brand"
                  : replaced
                    ? "fill-foreground/10"
                    : "fill-foreground/30"
              }`}
              style={{ animationDelay: `${i * 0.12}s` }}
            />
            <Label
              x={436}
              y={y + 4}
              anchor="end"
              className={winner ? "fill-brand" : "fill-muted"}
            >
              {`${rate.toFixed(1)}%`}
            </Label>
          </g>
        );
      })}
    </Frame>
  );
};

// 4. A reply, answered within minutes, becomes a booked meeting
export const ReplyVisual = () => {
  const y = 112;
  const nodes = [
    { x: 76, label: "Reply" },
    { x: 240, label: "Answer" },
    { x: 404, label: "Meeting" },
  ];
  return (
    <Frame label="A reply answered within six minutes and turned into a booked meeting">
      <path d={`M${nodes[0].x} ${y}H${nodes[2].x}`} className="stroke-foreground/20" />
      {/* A dot travelling along the line */}
      <rect x={nodes[0].x - 2} y={y - 2} width="4" height="4" className="fill-brand viz-travel" />

      {/* Time between reply and answer */}
      <Label x={(nodes[0].x + nodes[1].x) / 2} y={y - 14}>6 min</Label>

      {nodes.map(({ x, label }, i) => {
        const last = i === nodes.length - 1;
        return (
          <g key={label}>
            {last && (
              <rect
                x={x - 22}
                y={y - 22}
                width="44"
                height="44"
                className="fill-none stroke-brand viz-ring"
              />
            )}
            <rect
              x={x - 14}
              y={y - 14}
              width="28"
              height="28"
              className={
                last
                  ? "fill-brand"
                  : "fill-background stroke-foreground/30"
              }
            />
            {last ? (
              <path
                d={`M${x - 6} ${y}l4 4l8 -8`}
                className="fill-none stroke-background"
                strokeWidth="2"
              />
            ) : (
              <rect
                x={x - 3}
                y={y - 3}
                width="6"
                height="6"
                className={i === 1 ? "fill-brand" : "fill-foreground/60"}
              />
            )}
            <Label x={x} y={y + 44} className={last ? "fill-foreground" : "fill-muted"}>
              {label}
            </Label>
          </g>
        );
      })}
    </Frame>
  );
};
