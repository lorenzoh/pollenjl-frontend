import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';


/** @type {import('@sveltejs/kit').PrerenderErrorHandler} */
const handleError = ({ status, path, referrer, referenceType }) => {
        if (path.startsWith('/blog')) throw new Error('Missing a blog page!');
        console.warn(`${status} ${path}${referrer ? ` (${referenceType} from ${referrer})` : ''}`);
};
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
            //base: (dev || prerendering) ? '' : '/DataLoaders.jl/test',
            //assets: dev ? null : '/DataLoaders.jl/test/pollendata',
        },
        prerender: {
            onError: handleError,
            //entries: ['*', '/docs'],
        },
        //ssr: false,
        appDir: 'internal',
    },
};

export default config;