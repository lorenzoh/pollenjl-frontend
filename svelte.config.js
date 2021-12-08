import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';

const dev = process.env.NODE_ENV === 'development';
/** @type {import('@sveltejs/kit').Config} */
console.log(dev)
const config = {
    // Consult https://github.com/sveltejs/svelte-preprocess
    // for more information about preprocessors
    preprocess: preprocess(),
    vite: {
        plugins: []
    },

    kit: {
        // hydrate the <div id="svelte"> element in src/app.html
        target: '#svelte',
        adapter: adapter({
            fallback: 'index.html'
        }),
        paths: {
            base: dev ? '' : '/DataLoaders.jl/test',
            //assets: dev ? null : '/DataLoaders.jl/test/pollendata',
        },
        prerender: {
            entries: ['*', '/docs'],
        },
        ssr: false,
        appDir: 'internal',
    },
};

export default config;