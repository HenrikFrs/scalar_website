/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0D0D0D',
        surface:    '#111111',
        surface2:   '#1a1a1a',
        surface3:   '#222222',
        border:     'rgba(255,255,255,0.08)',
        borderLight: 'rgba(255,255,255,0.06)',
        pillBorder:  '#1C1C1C',
        foreground: '#FAFAFA',
        muted:      '#5C5C5C',
        accent:     '#FAFAFA',
      },
      fontFamily: {
        sans: ['"Hedvig Letters Sans"', '"DM Sans"', 'sans-serif'],
        serif: ['"Hedvig Letters Serif"', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
