/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,css,md,mdx,html,json,scss}',
  ],
  darkMode: 'class',
  theme: {
    extend: {},
    fontFamily: {
      sans: ['Varela Round', 'sans-serif'],
      logo: ['Festive', 'cursive'],
    },
    screens: {
      xs: '400px',
      ...require('tailwindcss/defaultTheme').screens,
    },
  },
  plugins: [],
}
