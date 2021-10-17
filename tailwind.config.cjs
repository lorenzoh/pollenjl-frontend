const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.svelte', './src/**/*.css'],
  darkMode: false,
  theme: {
    colors: {
      white: colors.white,
      gray: colors.warmGray,
      'svelte-prime': '#ff5030',
      bluegray: colors.blueGray,
    },
    fontFamily: {
        sans: ['Alegreya Sans'],
        mono: ['JuliaMono'],
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}