import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';



const dev = process.env.NODE_ENV === 'development';


/** @type {import('@sveltejs/kit').PrerenderErrorHandler} */
const handleError = ({ status, path, referrer, referenceType }) => {
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
        adapter: adapter({
            fallback: 'index.html'
        }),
        paths: {
            base: dev ? '' : '/DataLoaders.jl',
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