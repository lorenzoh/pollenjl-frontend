import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),
	vite: {
		plugins: [
		]
	},

	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte'
	},
	prerender: false,
};

export default config;
