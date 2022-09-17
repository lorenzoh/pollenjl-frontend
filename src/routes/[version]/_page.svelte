<script context="module">
	throw new Error("@migration task: Check code was safely removed (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292722)");

	// import { base } from '$app/paths';
	// import { makeDocumentCache } from '$lib/navigation';

	// export const prerender = true;

	// export async function load({ params, fetch}) {
	// 	const { version } = params;

	// 	const dataUrl = `${base}/api/${version}`;
	// 	const cache = makeDocumentCache(dataUrl, {}, fetch);
	// 	await cache.load('config');
	// 	return {
	// 		status: 301,
	// 		redirect: `${base}/${version}/${cache.documents['config'].defaultDocument}`
	// 	};
	// }
</script>
