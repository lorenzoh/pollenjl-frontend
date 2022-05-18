<script context="module" lang="ts">
	export const prerender = true;
	import { browser } from '$app/env';

	import { base } from '$app/paths';

	import { getHrefFromIds } from '$lib/navigation';

	/*
This page is deprecated and redirects to the new path
*/
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ params, url }) {
		const { version } = params;
		const baseUrl = `${base}/${version}`;
		let ids;
		if (browser) {
			ids = url.searchParams.getAll('id');
		} else {
			ids = ['documents/README.md'];
		}
		const target = getHrefFromIds(baseUrl, ids, true);
		return {
			status: 301,
			redirect: target
		};
	}
</script>
