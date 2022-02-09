<script context="module" lang="ts">
	export const prerender = false;

	import { DEFAULTDOC, VIEWERWIDTH, REPONAME } from '$lib/config';

	import { base } from '$app/paths';

	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ url, fetch, params }) {
		// document IDs are read from the query string; if none are given
		// opens the configured default document
		const { version } = params;
		let documentIds: string[] = (url.searchParams as URLSearchParams).getAll('id');
		documentIds = documentIds.length > 0 ? documentIds : [DEFAULTDOC];
		const docId = documentIds[0];

		const loader = new HTTPDocumentLoader(base, version);
		loader.fetch = fetch;
		loader.attributes = await loader.load('attributes');
		loader.load('linktree');

		const props = { loader, documentIds };
		return await loader
			.load(docId)
			.then((_) => {
				props['error'] = null;
				return { props };
			})
			.catch((e) => {
				props['error'] = e;
				return { props };
			});
	}
</script>

<script lang="ts">
	import { onMount, setContext } from 'svelte';

	import Viewers from '$lib/viewers/Viewers.svelte';
	import Header from '$lib/page/Header.svelte';
	import { syncquery } from './stores';
	import { ctxLoader } from '$lib/viewers/store';
	import type { ViewerController } from '$lib/viewers/controller';
	import { HTTPDocumentLoader } from '$lib/documentloader';
	import type { DocumentID } from '$lib/documentloader';

	// # Props
	export let documentIds: DocumentID[];
	export let loader: HTTPDocumentLoader;
	export let error;

	console.log(error)

	// Set up context
	setContext(ctxLoader, loader);

	let viewcontrol: ViewerController | null;
	onMount(() => {
		// when the displayed documents change, the query string should change, too
		viewcontrol.documentIds.subscribe(syncquery);
	});

	// When a document is selected from the search, it is used as the new root
	function handleSearchSelect({ detail }) {
		viewcontrol.documentIds.set([detail]);
	}
</script>

<svelte:head>
	<title>{REPONAME}</title>
</svelte:head>

<div class="flex flex-col lg:flex-row max-w-full wrapper">
	<Header on:resultSelected={handleSearchSelect} {viewcontrol} {loader} isInteractive />
	<div class="interactive flex-grow items-stretch overflow-auto hidden md:flex">
		<Viewers {documentIds} {loader} viewerwidth={VIEWERWIDTH} bind:viewcontrol />
	</div>
	<div class="flex md:hidden items-center">
		<div class="max-w-sm m-auto mt-10">
			<p class="text-center text-gray-700">
				On a small screen, we recommend using the single-page viewer.
			</p>
			<a href={loader.getHref(documentIds[0])}>
				<div
					class="border-bluegray-200 text-bluegray-500 items-stretch grow  bg-bluegray-100 border-2 p-1 rounded-lg text-center mt-8
hover:border-bluegray-300 hover:text-bluegray-700 hover:bg-bluegray-200"
				>
					Open in single-page viewer
				</div>
			</a>
		</div>
	</div>
</div>

<style>
	.wrapper {
		height: 100vh;
	}
</style>
