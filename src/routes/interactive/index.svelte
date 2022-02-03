<script context="module" lang="ts">
	export const prerender = false;

	import { DOCUMENTS, DEFAULTDOC, VIEWERWIDTH, BASE } from '../../lib/config';

	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ url, fetch }) {
		// document IDs are read from the query string; if none are given
		// opens the configured default document
		let documentIds: string[] = (url.searchParams as URLSearchParams).getAll('id');
		documentIds = documentIds.length > 0 ? documentIds : [DEFAULTDOC];

		const docId = documentIds[0];

		const dataurl = `${DOCUMENTS}/${docId}.json`;
		const res = await fetch(dataurl);
		if (res.ok) {
			const body = await res.json();
			let documents = {};
			documents[docId] = body;
			return {
				props: {
					documents,
					ids: documentIds
				}
			};
		}

		return {
			rootid: docId,
			status: res.status,
			error: new Error(`Could not load ${url}`)
		};
	}
</script>

<script lang="ts">
	import { writable, Writable } from 'svelte/store';
	import { onMount, setContext } from 'svelte';

	import Viewers from '$lib/viewers/Viewers.svelte';
	import Header from '$lib/page/Header.svelte';
	import { syncquery } from './stores';
	import { ctxIsInteractive, ctxLoader, ctxViewControlStore } from '$lib/viewers/store';
	import type { ViewerController } from '$lib/viewers/controller';
	import { HTTPDocumentLoader } from '$lib/documentloader';
	// # Props
	// The initial document IDs
	export let ids: string[];

	// A cache of {documentId: document}

	const viewControlStore: Writable<null | ViewerController> = writable(null);
	setContext(ctxViewControlStore, viewControlStore);
	setContext(ctxIsInteractive, true);

	let documentId = ids[0];
	onMount(() => {
		viewControlStore.set(viewcontrol);
		console.log(viewcontrol.documentIds);
		const s_documentIds = viewcontrol.documentIds;
		s_documentIds.subscribe(syncquery);
	});

	// When a document is selected from the search, it is used as the new root
	function handleSearchSelect(e) {
		viewcontrol.documentIds.set([e.detail]);
	}

	let viewcontrol: ViewerController;
	const loader = new HTTPDocumentLoader(DOCUMENTS);
	setContext(ctxLoader, loader);
</script>

<div class="flex flex-col lg:flex-row max-w-full wrapper">
	<Header on:resultSelected={(e) => handleSearchSelect(e)} />
	<div class="interactive flex-grow items-stretch overflow-auto hidden md:flex">
		<Viewers documentIds={ids} {loader} viewerwidth={VIEWERWIDTH} bind:viewcontrol />
	</div>
	<div class="flex md:hidden items-center">
		<div class="max-w-sm m-auto mt-10">
			<p class="text-center text-gray-700">
				On a small screen, we recommend using the single-page viewer.
			</p>
			<div
				class="border-bluegray-200 text-bluegray-500 items-stretch grow  bg-bluegray-100 border-2 p-1 rounded-lg text-center mt-8
hover:border-bluegray-300 hover:text-bluegray-700 hover:bg-bluegray-200"
			>
				<a href={`${BASE}/docs/${documentId}`}> Open in single-page viewer </a>
			</div>
		</div>
	</div>
</div>

<style>
	.wrapper {
		height: 100vh;
	}
</style>
