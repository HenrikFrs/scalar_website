import React, { useEffect, useRef, useState } from "react";

// Hero background modelled on primora.xyz: a grid of square cells whose lines
// stop just short of each intersection, a 2px dot in every gap that slowly
// swaps between two colours, and a radial fade that clears the middle for
// the headline. It is drawn at real pixel size so the cells keep their size however
// tall the hero is.
const PITCH = 88; // Cell size in px (the reference uses 71)
const GAP = PITCH * 0.09375; // Space between a line end and the intersection, scaled with the cell like the reference (6.656 / 71)
const LINE = "#242126";
const DOT_A = "#2563EB"; // Brand blue
const DOT_B = "#F96D57"; // Coral

// Stable pseudo-random numbers, so dot timings don't change between renders
const rand = (n) => {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

const HeroGrid = ({ className = "" }) => {
  const ref = useRef(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ w: Math.round(width), h: Math.round(height) });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const { w, h } = size;
  let lines = "";
  const dots = [];

  if (w && h) {
    // One intersection sits exactly in the middle, like the reference
    const cx = w / 2;
    const cy = h / 2;
    const x0 = cx - Math.ceil(cx / PITCH + 1) * PITCH;
    const y0 = cy - Math.ceil(cy / PITCH + 1) * PITCH;
    const len = PITCH - GAP * 2;

    let i = 0;
    for (let x = x0; x <= w + PITCH; x += PITCH) {
      for (let y = y0; y <= h + PITCH; y += PITCH) {
        lines += `M${x} ${y + GAP}v${len}M${x + GAP} ${y}h${len}`;
        if (x > 0 && x < w && y > 0 && y < h) {
          dots.push({
            x,
            y,
            alt: i % 2 === 1,
            duration: (2.5 + rand(i + 1) * 3).toFixed(1),
            delay: (-rand(i + 101) * 3.5).toFixed(1),
          });
          i++;
        }
      }
    }
  }

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`hero-grid absolute inset-0 pointer-events-none ${className}`}
    >
      {w > 0 && (
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none">
          <path d={lines} stroke={LINE} strokeWidth="0.8" />
          {dots.map((d) => (
            <rect
              key={`${d.x}-${d.y}`}
              className={d.alt ? "hero-dot-b" : "hero-dot-a"}
              x={d.x - 1}
              y={d.y - 1}
              width="2"
              height="2"
              fill={d.alt ? DOT_B : DOT_A}
              style={{
                animationDuration: `${d.duration}s`,
                animationDelay: `${d.delay}s`,
              }}
            />
          ))}
        </svg>
      )}
    </div>
  );
};

export default HeroGrid;
