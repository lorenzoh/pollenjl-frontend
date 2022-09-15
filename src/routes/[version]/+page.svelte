<script context="module">
	import { base } from '$app/paths';
	import { makeDocumentCache } from '$lib/navigation';

	export const prerender = true;

	export async function load({ params, fetch}) {
		const { version } = params;

		const dataUrl = `${base}/api/${version}`;
		const cache = makeDocumentCache(dataUrl, {}, fetch);
		await cache.load('config');
		return {
			status: 301,
			redirect: `${base}/${version}/${cache.documents['config'].defaultDocument}`
		};
	}
</script>
