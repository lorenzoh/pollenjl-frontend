const colors = require('tailwindcss/colors')

module.exports = {
    content: ['./src/**/*.svelte', './src/**/*.css'],
    theme: {
        colors: {
            white: colors.white,
            gray: colors.stone,
            bluegray: colors.slate,
            amber: colors.amber,
            emerald: colors.emerald,
        },
        fontFamily: {
            sans: ['sans-serif'],
            mono: ['Fira Code', 'Fira Mono'],
            header: ['IBM Plex Sans'],
        },
    },
    variants: {
        extend: {
            borderWidth: {
                '1': '1px',
            }
        },
    },
    plugins: [],
}