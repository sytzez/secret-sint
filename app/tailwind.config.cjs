/** @type {import('tailwindcss').Config} */

import defaultTheme from 'tailwindcss/defaultTheme'

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
      ...defaultTheme.screens,
    },
  },
  plugins: [],
}
