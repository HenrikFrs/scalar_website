// Social banners drawn with the hero's own grid and type. Open in the dev
// server; not part of the site build.
//   /banner.html              LinkedIn company page, 1128x191
//   /banner.html?v=personal   LinkedIn personal profile, 1584x396
//   /banner.html?v=youtube    YouTube channel art, 2560x1440
// Both LinkedIn banners are beige: logo top, one-line title middle, and on
// the personal one a CTA at the bottom; add &theme=dark or
// &theme=light to override any variant's theme.
import { createRoot } from "react-dom/client";
import "./index.css";
import HeroGrid from "./components/HeroGrid.jsx";

const VARIANTS = {
  // Same look as the personal banner, without the CTA. Rows of dots already
  // sit near both edges at this height, so the grid needs no shift.
  company: { width: 1128, height: 191, pitch: 84, dotSize: 4, guide: "rgb(222 216 205)", bg: "247 244 238", title: 40, padRight: 56, padBottom: 28, theme: "light",
    // Taller than the personal fade, since the title fills more of this short banner
    mask: "radial-gradient(ellipse 56% 62% at 64% 50%, transparent 58%, #000 100%)",
    brand: { logo: 24, wordmark: 20 }, oneLine: "Performance-based B2B meeting engine." },
  // LinkedIn shows this one at about half size, so everything is drawn larger
  personal: { width: 1584, height: 396, pitch: 108, dotSize: 5, gridShift: 54, guide: "rgb(222 216 205)", bg: "247 244 238", title: 56, padRight: 96, theme: "light",
    // The grid is moved up half a cell (drawn a cell taller, so its centre
    // rises by half) so rows of dots run along the top and bottom edges.
    // The fade is centred on the title and clears the logo and CTA too.
    mask: "radial-gradient(ellipse 56% 46% at 64% 50%, transparent 55%, #000 100%)",
    brand: { logo: 34, wordmark: 30 }, oneLine: "Performance-based B2B meeting engine.", cta: { text: "DM me “REV” to learn more", height: 54, font: 20 } },
  // Only the centre 1546x423 shows on every device, so the brand sits there
  youtube: { width: 2560, height: 1440, pitch: 128, dotSize: 6, logo: 36, wordmark: 46, title: 80, youtube: true },
};
const params = new URLSearchParams(location.search);
const v = VARIANTS[params.get("v")] ?? VARIANTS.company;
document.documentElement.dataset.theme = params.get("theme") ?? v.theme ?? "dark";

// The site's fade, moved right so the clear area sits behind the title
const MASK = "radial-gradient(ellipse 42% 80% at 80% 50%, transparent 40%, #000 100%)";
// Centred and squat, so it clears the YouTube safe strip
const YT_MASK = "radial-gradient(ellipse 34% 20% at 50% 50%, transparent 50%, #000 100%)";

// Logo and wordmark as in the navbar, at a given size
const Brand = ({ logo, wordmark, style }) => (
  <div className="flex items-center" style={{ gap: logo * 0.33, ...style }}>
    <img src="/logo18-white.svg" alt="Scalar logo" className="brand-logo" style={{ height: logo }} />
    <span
      className="font-brand font-normal leading-none tracking-[-0.02em] text-foreground"
      style={{ fontSize: wordmark, transform: `translateY(${wordmark * 0.05}px)` }}
    >
      Scalar
    </span>
  </div>
);

const Headline = () => (
  <h1 className="type-h1 leading-none text-heading" style={{ fontSize: v.title }}>
    <span className="block">
      <span className="whitespace-nowrap">Done-for-you</span> pipeline.
    </span>
    <span className="block text-highlight" style={{ marginTop: v.title * 0.1 }}>
      Pay per qualified sales call.
    </span>
  </h1>
);

// The site's primary pill, scaled up like the rest of the banner
const Cta = ({ style }) => (
  <div
    className="btn btn-primary"
    style={{
      height: v.cta.height,
      paddingInline: v.cta.height * 0.5,
      fontSize: v.cta.font,
      lineHeight: 1,
      ...style,
    }}
  >
    {v.cta.text}
  </div>
);

// LinkedIn banners: logo at the top, title in the middle, CTA (if any) at the bottom,
// all on the right, with equal space above, between and below them.
const StackedContent = () => (
  <div
    className="relative z-10 h-full flex flex-col items-end justify-evenly text-right"
    // padBottom lifts the stack so the title sits a little above the bottom
    style={{ paddingRight: v.padRight, paddingBottom: v.padBottom }}
  >
    <Brand logo={v.brand.logo} wordmark={v.brand.wordmark}  />
    <h1 className="type-h1 leading-none text-heading whitespace-nowrap" style={{ fontSize: v.title }}>
      {v.oneLine}
    </h1>
    {v.cta && <Cta />}
  </div>
);

const LinkedInContent = () => (
  <div
    className="relative z-10 h-full flex flex-col items-end justify-center text-right"
    style={{ paddingRight: v.padRight }}
  >
    <Headline />
  </div>
);

// Logo and wordmark as in the navbar, stacked above the site's headline
const YouTubeContent = () => (
  <div className="relative z-10 h-full flex flex-col items-center justify-center text-center">
    <Brand logo={v.logo} wordmark={v.wordmark} style={{ marginBottom: v.title * 0.55 }} />
    <h1 className="type-h1 leading-none text-heading" style={{ fontSize: v.title }}>
      <span className="block">
        <span className="whitespace-nowrap">Done-for-you</span> pipeline.
      </span>
      <span className="block text-highlight" style={{ marginTop: v.title * 0.1 }}>
        Pay per qualified sales call.
      </span>
    </h1>
  </div>
);

const mask = v.mask ?? (v.youtube ? YT_MASK : MASK);

const Banner = () => (
  <div
    className="bg-background bg-noise relative overflow-hidden"
    // bg tints the page colour, e.g. a warm off-white instead of pure white
    style={{ width: v.width, height: v.height, ...(v.bg && { "--background": v.bg }) }}
  >
    {/* The fade sits on a wrapper so it stays put when the grid is shifted */}
    <div
      className="absolute inset-0"
      // guide darkens the grid lines, which are very pale on white
      style={{ WebkitMaskImage: mask, maskImage: mask, ...(v.guide && { "--guide": v.guide }) }}
    >
      <HeroGrid
        pitch={v.pitch}
        dotSize={v.dotSize}
        // The wrapper does the fading, so the grid's own fade is switched off
        style={{
          WebkitMaskImage: "none",
          maskImage: "none",
          ...(v.gridShift && { top: -v.gridShift * 2 }),
        }}
      />
    </div>
    {v.youtube ? <YouTubeContent /> : v.oneLine ? <StackedContent /> : <LinkedInContent />}
  </div>
);

document.body.style.margin = "0";
createRoot(document.getElementById("root")).render(<Banner />);
