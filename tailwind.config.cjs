const colors = require('tailwindcss/colors')

module.exports = {
    purge: ['./src/**/*.svelte', './src/**/*.css'],
    darkMode: false,
    theme: {
        colors: {
            white: colors.white,
            gray: colors.warmGray,
            bluegray: colors.blueGray,
            amber: colors.amber,
            emerald: colors.emerald,
        },
        fontFamily: {
            sans: ['Fira Sans'],
            mono: ['Fira Code', 'Fira Mono'],
            header: ['Fira Sans'],
        }
    },
    variants: {
        extend: {},
    },
    plugins: [],
}