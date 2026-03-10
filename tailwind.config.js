/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#050505', // Pure Dark
        surface: '#0f0f0f', // Ultra Dark Gray
        surface2: '#1a1a1a', // Dark Gray Border/Surface
        accent: '#ffffff', // Pure White for primary elements
        foreground: '#fafafa', // Bright text
        muted: '#a3a3a3', // Medium Gray for secondary text
        borderLight: '#262626' // Clean subtle dark borders
      },
      fontFamily: {
        sans: ['"DM Sans"', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
