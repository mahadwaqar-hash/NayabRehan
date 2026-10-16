/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: '#E6D5BD',
          dark: '#D9C5A8',
          light: '#F2E5D3',
        },
        black: {
          DEFAULT: '#101010',
          soft: '#181818',
          card: '#141414',
        },
        orange: {
          DEFAULT: '#D5360C',
          hover: '#BA2E0A',
          glow: 'rgba(213, 54, 12, 0.4)',
        },
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Perandory', '"Bodoni Moda"', 'Georgia', 'serif'],
        script: ['var(--font-script)', '"Birds of Paradise"', 'cursive'],
        sans: ['var(--font-sans)', '"Plus Jakarta Sans"', '"Inter"', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['var(--font-mono)', '"Plus Jakarta Sans"', '"Inter"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      boxShadow: {
        // Claymorphism Light (on #E6D5BD canvas)
        'clay-light': '14px 14px 28px rgba(16, 16, 16, 0.12), -12px -12px 24px rgba(255, 255, 255, 0.8), inset 2px 2px 4px rgba(255, 255, 255, 0.6), inset -2px -2px 4px rgba(16, 16, 16, 0.12)',
        'clay-light-sm': '8px 8px 16px rgba(16, 16, 16, 0.10), -6px -6px 14px rgba(255, 255, 255, 0.8), inset 1.5px 1.5px 3px rgba(255, 255, 255, 0.6), inset -1.5px -1.5px 3px rgba(16, 16, 16, 0.10)',
        'clay-light-pressed': 'inset 4px 4px 8px rgba(16, 16, 16, 0.15), inset -4px -4px 8px rgba(255, 255, 255, 0.8)',

        // Claymorphism Dark (#101010 structural cards)
        'clay-dark': '14px 14px 30px rgba(0, 0, 0, 0.45), -8px -8px 24px rgba(230, 213, 189, 0.08), inset 1px 1px 2px rgba(255, 255, 255, 0.18), inset -2px -2px 4px rgba(0, 0, 0, 0.7)',
        'clay-dark-sm': '8px 8px 18px rgba(0, 0, 0, 0.4), -5px -5px 12px rgba(230, 213, 189, 0.06), inset 1px 1px 2px rgba(255, 255, 255, 0.15), inset -1.5px -1.5px 3px rgba(0, 0, 0, 0.6)',

        // Claymorphism Burnt Orange (#D5360C CTA buttons & active pills)
        'clay-orange': '8px 8px 20px rgba(213, 54, 12, 0.35), -4px -4px 12px rgba(255, 255, 255, 0.4), inset 2px 2px 3px rgba(255, 255, 255, 0.45), inset -2px -2px 4px rgba(0, 0, 0, 0.35)',
        'clay-orange-hover': '10px 10px 24px rgba(213, 54, 12, 0.45), -5px -5px 14px rgba(255, 255, 255, 0.5), inset 2px 2px 3px rgba(255, 255, 255, 0.5), inset -2px -2px 4px rgba(0, 0, 0, 0.4)',
        'clay-orange-pressed': 'inset 3px 3px 6px rgba(0, 0, 0, 0.4), inset -2px -2px 4px rgba(255, 255, 255, 0.25)',
      },
      borderRadius: {
        '2rem': '2rem',
        '2.5rem': '2.5rem',
      },
    },
  },
  plugins: [],
}
