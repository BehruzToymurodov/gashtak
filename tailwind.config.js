/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        neon: '#7dfff4',
      },
      fontFamily: {
        oswald: ['Oswald', 'sans-serif'],
        barlow: ['Barlow', 'sans-serif'],
      },
      keyframes: {
        neonFlickerIn: {
          '0%':   { opacity: '0', filter: 'brightness(0)' },
          '8%':   { opacity: '1', filter: 'brightness(3)' },
          '14%':  { opacity: '0.15', filter: 'brightness(0.15)' },
          '22%':  { opacity: '1', filter: 'brightness(2.5)' },
          '28%':  { opacity: '0.35', filter: 'brightness(0.35)' },
          '38%':  { opacity: '1', filter: 'brightness(2)' },
          '46%':  { opacity: '0.65', filter: 'brightness(0.65)' },
          '58%':  { opacity: '1', filter: 'brightness(1.5)' },
          '100%': { opacity: '1', filter: 'brightness(1)' },
        },
        neonPulse: {
          '0%, 100%': { filter: 'brightness(1)' },
          '50%': { filter: 'brightness(1.25)' },
        },
        cursorBlink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
      animation: {
        'neon-flicker-in': 'neonFlickerIn 0.55s ease-out forwards',
        'neon-pulse': 'neonPulse 4s ease-in-out infinite',
        'cursor-blink': 'cursorBlink 1s step-end infinite',
        'fade-up': 'fadeUp 0.7s ease-out both',
        'scanline': 'scanline 8s linear infinite',
      },
    },
  },
  plugins: [],
}
