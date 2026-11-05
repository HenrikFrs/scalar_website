import React, { useEffect, useRef } from "react";

const CELL = 14; // Grid size in CSS px; smaller is smoother but slower
const LEVELS = [-1.2, -0.6, 0, 0.6, 1.2];
const LINE_COLOR = "#ebebec"; // Only just darker than the page background
const FRAME_MS = 1000 / 30;
const SPEED = 0.35; // Lower is slower; about 1px of drift per second

// A smooth height field that changes slowly over time. Its contour lines are
// what gets drawn, so slow phase changes make the lines drift and reshape.
const height = (x, y, t) => {
  const wx = x + 70 * Math.sin(y * 0.0037 + t * 0.011 + 1.3);
  const wy = y + 70 * Math.sin(x * 0.0029 - t * 0.009 + 4.1);
  return (
    Math.sin(wx * 0.0031 + wy * 0.0017 + t * 0.013) +
    0.7 * Math.sin(wx * -0.0019 + wy * 0.0043 - t * 0.01 + 2.1) +
    0.5 * Math.sin(wx * 0.0052 - wy * 0.0029 + t * 0.008 + 4.7)
  );
};

// Marching squares: traces where the field crosses each level
const traceLevel = (ctx, values, cols, rows, level) => {
  const stride = cols + 1;
  const edge = (from, to) => (level - from) / (to - from);

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const i = row * stride + col;
      const a = values[i];
      const b = values[i + 1];
      const c = values[i + stride + 1];
      const d = values[i + stride];
      const key =
        (a > level ? 8 : 0) |
        (b > level ? 4 : 0) |
        (c > level ? 2 : 0) |
        (d > level ? 1 : 0);
      if (key === 0 || key === 15) continue;

      const x = col * CELL;
      const y = row * CELL;
      const top = () => [x + edge(a, b) * CELL, y];
      const right = () => [x + CELL, y + edge(b, c) * CELL];
      const bottom = () => [x + edge(d, c) * CELL, y + CELL];
      const left = () => [x, y + edge(a, d) * CELL];
      const segment = (from, to) => {
        ctx.moveTo(from[0], from[1]);
        ctx.lineTo(to[0], to[1]);
      };

      switch (key) {
        case 1:
        case 14:
          segment(left(), bottom());
          break;
        case 2:
        case 13:
          segment(bottom(), right());
          break;
        case 3:
        case 12:
          segment(left(), right());
          break;
        case 4:
        case 11:
          segment(top(), right());
          break;
        case 5:
          segment(left(), top());
          segment(bottom(), right());
          break;
        case 6:
        case 9:
          segment(top(), bottom());
          break;
        case 7:
        case 8:
          segment(left(), top());
          break;
        case 10:
          segment(top(), right());
          segment(left(), bottom());
          break;
        default:
          break;
      }
    }
  }
};

// Very subtle drifting contour lines behind the hero
const HeroContours = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const stillOnly = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let cols = 0;
    let rows = 0;
    let values = new Float32Array(0);
    let width = 0;
    let height_ = 0;

    const draw = (t) => {
      for (let row = 0; row <= rows; row++) {
        for (let col = 0; col <= cols; col++) {
          values[row * (cols + 1) + col] = height(
            col * CELL,
            row * CELL,
            t * SPEED,
          );
        }
      }
      ctx.clearRect(0, 0, width, height_);
      ctx.beginPath();
      LEVELS.forEach((level) => traceLevel(ctx, values, cols, rows, level));
      ctx.stroke();
    };

    const elapsed = () => performance.now() / 1000;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height_ = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height_ * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.strokeStyle = LINE_COLOR;
      ctx.lineWidth = 1;
      cols = Math.ceil(width / CELL);
      rows = Math.ceil(height_ / CELL);
      values = new Float32Array((cols + 1) * (rows + 1));
      draw(elapsed());
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    if (stillOnly) return () => resizeObserver.disconnect();

    // Only animate while the hero is on screen and the tab is visible
    let frame = 0;
    let last = 0;
    let onScreen = true;

    const tick = (now) => {
      frame = requestAnimationFrame(tick);
      if (now - last < FRAME_MS) return;
      last = now;
      draw(now / 1000);
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      if (onScreen && !document.hidden) frame = requestAnimationFrame(tick);
    };

    const intersection = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      sync();
    });
    intersection.observe(canvas);
    document.addEventListener("visibilitychange", sync);
    sync();

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersection.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
};

export default HeroContours;
