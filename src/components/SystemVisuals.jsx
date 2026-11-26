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
const targetingLegend = { fit: "Fit", out: "No fit", dnc: "Do not contact" };

export const TargetingVisual = ({
  legend = targetingLegend,
  label = "Every company in the market checked against the ideal customer profile",
}) => {
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
    <Frame label={label}>
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

      {/* Legend; each entry starts after the previous label (8 units
          per mono capital, which keeps the English legend where it was) */}
      <g transform={`translate(${x0 - 2} ${fieldBottom + 40})`}>
        {[
          { text: legend.fit, className: "fill-brand" },
          { text: legend.out, className: "fill-foreground/20" },
          { text: legend.dnc, fill: CORAL },
        ].reduce(
          (acc, item) => {
            const x = acc.x;
            acc.items.push(
              <g key={item.text}>
                <rect x={x} y="-7" width="6" height="6" className={item.className} fill={item.fill} />
                <Label x={x + 14} y={0} anchor="start">{item.text}</Label>
              </g>,
            );
            acc.x = x + 14 + item.text.length * 8 + 32;
            return acc;
          },
          { x: 0, items: [] },
        ).items}
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

export const MessagingVisual = ({
  data = variants,
  max = 4.5,
  label = "Message variants compared by reply rate; the winner scales",
}) => {
  const trackX = 84;
  const trackW = 290;
  return (
    <Frame label={label}>
      {data.map(({ name, rate, state }, i) => {
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
export const ReplyVisual = ({
  names = ["Reply", "Answer", "Meeting"],
  time = "6 min",
  label = "A reply answered within six minutes and turned into a booked meeting",
}) => {
  const y = 112;
  const nodes = [76, 240, 404].map((x, i) => ({ x, label: names[i] }));
  return (
    <Frame label={label}>
      <path d={`M${nodes[0].x} ${y}H${nodes[2].x}`} className="stroke-foreground/20" />
      {/* A dot travelling along the line */}
      <rect x={nodes[0].x - 2} y={y - 2} width="4" height="4" className="fill-brand viz-travel" />

      {/* Time between reply and answer */}
      {time && (
        <Label x={(nodes[0].x + nodes[1].x) / 2} y={y - 14}>{time}</Label>
      )}

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

// 5. LinkedIn: a profile card whose key parts light up in turn, with visits
//    flowing in from the left
export const ProfileVisual = ({
  parts = ["Headline", "About", "Proof"],
  visits = "Profile visits",
  label = "A LinkedIn profile whose headline, about section and proof are tuned for the ideal customer",
}) => {
  const cx = 150; // card left
  const cw = 200; // card width
  const rowsY = [118, 152, 186];
  return (
    <Frame label={label}>
      {/* Visits flowing into the profile */}
      {[96, 120, 144].map((y, i) => (
        <g key={y}>
          <path d={`M40 ${y}H${cx - 8}`} className="fill-none stroke-foreground/10" />
          <path
            d={`M40 ${y}H${cx - 8}`}
            className="fill-none stroke-brand viz-flow"
            style={{ animationDelay: `${(-i * 0.8).toFixed(2)}s` }}
          />
        </g>
      ))}
      <Label x={40} y={176} anchor="start">{visits}</Label>

      {/* Card with banner and avatar */}
      <rect x={cx} y="24" width={cw} height="192" className="fill-background stroke-foreground/30" />
      <rect x={cx} y="24" width={cw} height="40" className="fill-foreground/5" />
      <rect x={cx + 16} y="44" width="36" height="36" className="fill-background stroke-foreground/30" />
      <rect x={cx + 30} y="58" width="8" height="8" className="fill-brand" />
      <rect x={cx + 64} y="72" width="70" height="4" className="fill-foreground/30" />
      <rect x={cx + 64} y="82" width="44" height="4" className="fill-foreground/15" />

      {/* Headline, about and proof: each lights up in turn */}
      {rowsY.map((y, i) => (
        <g key={y}>
          <rect
            x={cx + 16}
            y={y - 6}
            width={[150, 120, 96][i]}
            height="5"
            className="fill-brand viz-pulse"
            style={{ animationDelay: `${(-i * 1).toFixed(2)}s` }}
          />
          <rect x={cx + 16} y={y + 4} width={[110, 156, 130][i]} height="4" className="fill-foreground/15" />
          <path d={`M${cx + cw} ${y}H${cx + cw + 20}`} className="stroke-foreground/20" />
          <Label x={cx + cw + 28} y={y + 4} anchor="start">{parts[i]}</Label>
        </g>
      ))}
    </Frame>
  );
};
