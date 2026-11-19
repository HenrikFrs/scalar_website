// Social banners drawn with the hero's own grid and type. Open in the dev
// server; not part of the site build.
//   /banner.html              LinkedIn company page, 1128x191
//   /banner.html?v=personal   LinkedIn personal profile, 1584x396
//   /banner.html?v=youtube    YouTube channel art, 2560x1440
import { createRoot } from "react-dom/client";
import "./index.css";
import HeroGrid from "./components/HeroGrid.jsx";

const VARIANTS = {
  company: { width: 1128, height: 191, pitch: 76, dotSize: 3.5, title: 42, padRight: 56 },
  // LinkedIn shows this one at about half size, so everything is drawn larger
  personal: { width: 1584, height: 396, pitch: 92, dotSize: 4.5, title: 72, padRight: 96 },
  // Only the centre 1546x423 shows on every device, so the brand sits there
  youtube: { width: 2560, height: 1440, pitch: 128, dotSize: 6, logo: 36, wordmark: 46, title: 80, youtube: true },
};
const v = VARIANTS[new URLSearchParams(location.search).get("v")] ?? VARIANTS.company;

// The site's fade, moved right so the clear area sits behind the title
const MASK = "radial-gradient(ellipse 42% 80% at 80% 50%, transparent 40%, #000 100%)";
// Centred and squat, so it clears the YouTube safe strip
const YT_MASK = "radial-gradient(ellipse 34% 20% at 50% 50%, transparent 50%, #000 100%)";

const LinkedInContent = () => (
  <div
    className="relative z-10 h-full flex flex-col items-end justify-center text-right"
    style={{ paddingRight: v.padRight }}
  >
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

// Logo and wordmark as in the navbar, stacked above the site's headline
const YouTubeContent = () => (
  <div className="relative z-10 h-full flex flex-col items-center justify-center text-center">
    <div className="flex items-center" style={{ gap: v.logo * 0.33, marginBottom: v.title * 0.55 }}>
      <img src="/logo18-white.svg" alt="Scalar logo" className="brand-logo" style={{ height: v.logo }} />
      <span
        className="font-brand font-normal leading-none tracking-[-0.02em] text-foreground"
        style={{ fontSize: v.wordmark, transform: `translateY(${v.wordmark * 0.05}px)` }}
      >
        Scalar
      </span>
    </div>
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

const Banner = () => (
  <div className="bg-background bg-noise relative overflow-hidden" style={{ width: v.width, height: v.height }}>
    <HeroGrid
      pitch={v.pitch}
      dotSize={v.dotSize}
      style={{ WebkitMaskImage: v.youtube ? YT_MASK : MASK, maskImage: v.youtube ? YT_MASK : MASK }}
    />
    {v.youtube ? <YouTubeContent /> : <LinkedInContent />}
  </div>
);

document.body.style.margin = "0";
createRoot(document.getElementById("root")).render(<Banner />);
