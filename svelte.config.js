import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
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
            //base: '/DataLoaders.jl/experimental',
            //assets: '/pollendata',
        },
        prerender: {
            entries: ['*', '/docs'],
        },
        ssr: false,
    },
};

export default config;