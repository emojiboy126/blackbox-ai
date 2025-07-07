/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        yellowAccentLight: '#FFD60A', // bright yellow for light mode (Apple style)
        yellowAccentDark: '#D4AF37', // golden yellow for dark mode
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}
