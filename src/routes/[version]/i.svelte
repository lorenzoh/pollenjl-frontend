<script context="module" lang="ts">
	export const prerender = true;
	import { browser } from '$app/env';

	import { base } from '$app/paths';

	import { getHrefFromIds, makeDocumentCache } from '$lib/navigation';

	/*
This page is deprecated and redirects to the new path
*/
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ params, url, fetch }) {
		const { version } = params;
		const baseUrl = `${base}/${version}`;

		let ids;
		if (browser) {
			ids = url.searchParams.getAll('id');
		} else {

			const dataUrl = `${base}/api/${version}`;
			const cache = makeDocumentCache(dataUrl, {}, fetch);
			await cache.load('config')
			ids = [cache.documents['config'].defaultDocument];
		}
		const target = getHrefFromIds(baseUrl, ids, true);
		return {
			status: 301,
			redirect: target
		};
	}
</script>
