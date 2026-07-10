/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Fraunces"', 'Georgia', 'serif'],
      },
      colors: {
        brand: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        earth: {
          50: '#faf8f3',
          100: '#f3eee0',
          200: '#e7dcc2',
          300: '#d6c39a',
          400: '#c4a872',
          500: '#b08d54',
          600: '#977342',
          700: '#7a5b37',
          800: '#634a30',
          900: '#523e2a',
        },
      },
      boxShadow: {
        'soft': '0 1px 2px rgba(20,83,45,0.04), 0 8px 24px rgba(20,83,45,0.06)',
        'card': '0 2px 4px rgba(20,83,45,0.05), 0 12px 32px rgba(20,83,45,0.08)',
        'glow': '0 0 0 1px rgba(34,197,94,0.15), 0 8px 30px rgba(34,197,94,0.18)',
      },
    },
  },
  plugins: [],
};
