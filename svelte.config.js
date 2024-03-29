import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';

import fs from 'fs';

// Read in a list of documents so that they can be prerendered
function loadpageids() {
    let versions;
    try {
        versions = JSON.parse(fs.readFileSync('./static/data/versions.json'))
    } catch (error) {
        console.error(error)
        versions = {};
    }
    const pageIds = Object.entries(versions).map(([v, config]) => `/${v}`)
    return pageIds
}

const entries = ['*', ...loadpageids()]

const CI = process.env["CI"] ? true : false
let REPO = "Pollen.jl"
if (CI) {
    REPO = process.env['GITHUB_REPOSITORY'].split("/")[1];
}

/** @type {import('@sveltejs/kit').PrerenderErrorHandler} */
const handleError = ({ status, path, referrer, referenceType }) => {
        console.log(referrer)
        console.log(referenceType)
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
            base: CI ? `/${REPO}` : '',
        },
        prerender: {
            crawl: true,
            onError: 'continue',
            entries,
        },
        //ssr: false,
        appDir: 'internal',
    },
};

export default config;