/** @type {import('tailwindcss').Config} */

// Palette lives in CSS variables (src/index.css)
const v = (name) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: v("background"),
        surface: v("surface"),
        surface2: v("surface2"),
        surface3: v("surface2"),
        border: v("border"),
        borderLight: "var(--border-light)", // Hairline on every box
        borderMid: v("border-mid"),
        pillBorder: v("border"),
        pillAccent: v("accent"),
        pillAccentText: v("accent"),
        foreground: v("foreground"),
        foregroundHover: v("foreground"),
        heading: v("foreground"),
        body: v("body"),
        muted: v("muted"),
        accent: v("accent"),
        accentHover: v("accent"),
        green: v("accent"),
        greenLight: v("border-mid"),
        greenDeep: v("accent-soft"),
        warn: v("warn"),
        brand: v("brand"), // Accent colour
        highlight: v("highlight"), // Greyed part of titles
        btn: v("btn"),
        btnText: v("btn-text"),
        btnHover: v("btn-hover"),
      },
      // Square corners everywhere; rounded-full stays for dots and badges
      borderRadius: {
        DEFAULT: "0",
        sm: "0",
        md: "0",
        lg: "0",
        xl: "0",
        "2xl": "0",
      },
      fontFamily: {
        sans: ['"Instrument Sans"', "system-ui", "sans-serif"],
        // Title font (font-serif): LT Superior Serif, self-hosted (see index.css)
        serif: ['"LT Superior Serif"', "Georgia", "serif"],
        brand: ["Geist", "Inter", "sans-serif"],
        ui: ['"Instrument Sans"', "system-ui", "sans-serif"],
        mono: ['"Geist Mono"', "ui-monospace", "monospace"],
      },
      transitionTimingFunction: {
        soft: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
