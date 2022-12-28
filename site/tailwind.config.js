/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'back': '#ECDD7B',
      'card': '#CDE7BE',
      'textColor': '#561D25',
      'button': '#CE8147',
      'accent': '#561D25',
    },
    extend: {},
  },
  plugins: [],
}
