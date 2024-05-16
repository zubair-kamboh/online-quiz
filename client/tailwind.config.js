/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./*.{html,js,jsx,ts}'],
  screens: {
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    xxl: '1400px',
  },
  theme: {
    colors: {
      white: '#FFFFFF',
      dark: '#000000',
      blue: '#6090AB',
      quilgrey: '#D4D4D4',
      stormgrey: '#ff7849',
      cloudgrey: '#C4C4C4',
      green: '#A8CB1B',
    },
    fontFamily: {
      sans: ['"Istok Web"', ...defaultTheme.fontFamily.sans],
    },
    extend: {},
  },
  plugins: [],
}
