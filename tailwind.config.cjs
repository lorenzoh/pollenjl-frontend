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
        },
        fontFamily: {
            //sans: ['Lora'],
            sans: ['Alegreya Sans'],
            mono: ['JuliaMono'],
            header: ['Lora', 'Source Sans Pro'],
        }
    },
    variants: {
        extend: {},
    },
    plugins: [],
}