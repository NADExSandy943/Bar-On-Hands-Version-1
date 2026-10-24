/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        cinzel: ['Cinzel', 'Georgia', 'serif'],
      },
      colors: {
        brand: {
          red: '#E50914',
          redHover: '#C40710',
          lime: '#A3E635',
          charcoal: '#2B2B2B',
          olive: '#6B7F5E',
          teal: '#1F4E5B',
          coral: '#D95338',
          peach: '#F29F67'
        }
      }
    },
  },
  plugins: [],
};
