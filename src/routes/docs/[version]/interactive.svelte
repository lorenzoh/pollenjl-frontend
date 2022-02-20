<script context="module" lang="ts">
	export const prerender = true;

	import { ProjectConfig } from '$lib/config';

	import { base } from '$app/paths';

	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ fetch, params }) {
		console.log('Rendering INTERACTIVE');
		const { version } = params;
		const documentIds: string[] = [];

		let loader;
		if (dev) {
			loader = new HTTPDocumentLoader(base, version, 'http://127.0.0.1:8000');
		} else {
			loader = new HTTPDocumentLoader(base, version);
		}
		loader.fetch = fetch;
		console.log(loader.getDataHref('attributes'));
		loader.attributes = await loader.load('attributes');
		const config: ProjectConfig = (await loader.load('config')) as unknown as ProjectConfig;

		const props = { loader, documentIds, config };
		return { props };
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
	import { dev } from '$app/env';

	// # Props
	export let documentIds: DocumentID[];
	export let loader: HTTPDocumentLoader;
	export let config: ProjectConfig;

	// Set up context
	setContext(ctxLoader, loader);

	let initialIds: string[] = [config.defaultDocument];

	let viewcontrol: ViewerController | null;
	onMount(() => {
		// Initial documents are read from the query string.
		const urlParams = new URLSearchParams(window.location.search);
		let ids_ = urlParams.getAll('id');
		initialIds = ids_.length > 0 ? ids_ : initialIds;
		viewcontrol.documentIds.set(initialIds);

		// When the displayed documents change, the query string should change, too
		viewcontrol.documentIds.subscribe(syncquery);
	});

	// When a document is selected from the search, it is used as the new root
	function handleSearchSelect({ detail }) {
		viewcontrol.documentIds.set([detail]);
	}
</script>

<svelte:body on:keydown={(e) => (dev && e.key == 'r' ? viewcontrol.reload(loader) : '')} />

<svelte:head>
	<title>{config.title}</title>
</svelte:head>

<div class="flex flex-col lg:flex-row max-w-full wrapper">
	<Header
		on:resultSelected={handleSearchSelect}
		{viewcontrol}
		{loader}
		isInteractive
		documentId={initialIds[0]}
		{config}
	/>
	<div class="interactive flex-grow items-stretch overflow-auto hidden md:flex">
		<Viewers {documentIds} {loader} viewerwidth={config.columnWidth} bind:viewcontrol />
	</div>
	<div class="flex md:hidden items-center">
		<div class="max-w-sm m-auto mt-10">
			<p class="text-center text-gray-700">
				On a small screen, we recommend using the single-page viewer.
			</p>
			<a href={loader.getHref(initialIds[0])}>
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
