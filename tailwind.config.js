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
        background: '#0D0D0D',
        surface:    '#111111',
        surface2:   '#1a1a1a',
        surface3:   '#222222',
        border:     'rgba(255,255,255,0.09)',
        borderLight: 'rgba(255,255,255,0.06)',
        pillBorder:  '#1E1E1E',
        foreground: '#FAFAFA',
        muted:      '#737373',
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
