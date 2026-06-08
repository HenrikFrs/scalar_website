/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark mode tokens
        background: '#080808',
        surface:    '#0D0D0D',
        surface2:   '#131313',
        surface3:   '#1a1a1a',
        border:     'rgba(255,255,255,0.07)',
        borderLight: 'rgba(255,255,255,0.05)',
        pillBorder:  '#161616',
        foreground: '#FAFAFA',
        muted:      '#5C5C5C',
        accent:     '#FAFAFA',
        // Light mode tokens (lt- prefix avoids conflict with Tailwind's border-l-, text-l- directional utilities)
        'lt-background': '#FAFAFA',
        'lt-surface':    '#F2F2F2',
        'lt-surface2':   '#E8E8E8',
        'lt-surface3':   '#DEDEDE',
        'lt-borderLight': 'rgba(0,0,0,0.12)',
        'lt-pillBorder':  'rgba(0,0,0,0.28)',
        'lt-foreground': '#1A1A1A',
        'lt-muted':      '#525252',
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
