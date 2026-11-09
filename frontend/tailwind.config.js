/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        mysticDark: '#0F0C1B',
        mysticCard: '#1A162B',
        mysticGold: '#D4AF37',
        mysticGoldLight: '#F3E5AB',
        mysticBorder: '#2E2744',
        mysticText: '#9A8C9E'
      }
    },
  },
  plugins: [],
}