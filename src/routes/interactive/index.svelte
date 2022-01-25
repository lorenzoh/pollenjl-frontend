<script context="module" lang="ts">
	export const prerender = false;

	import { DOCUMENTS, ASSETS, DEFAULTDOC, CORPUSURL, REPOURL, VIEWERWIDTH } from '../../lib/config';

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
	import type { IDocumentNode } from '$lib/documents/types';
	import type { Writable } from 'svelte/store';
	import { setContext } from 'svelte';

	import Viewers from '$lib/viewers/Viewers.svelte';
	import Header from '$lib/page/Header.svelte';
	import { documentIdsStore } from './stores';
	import { ctxDocumentIds, ctxIsInteractive } from '$lib/viewers/store';

	// # Props
	// The document IDs that are initially open
	export let ids: string[];
	// A cache of {documentId: document}
	export let documents: { [id: string]: IDocumentNode } = {};

	// The active IDs are made available to child components. Needed
	// for navigation.
	const documentIds: Writable<string[]> = documentIdsStore(ids);
	setContext(ctxDocumentIds, documentIds);
	setContext(ctxIsInteractive, true);

	// When a document is selected from the search, it is used as the new root
	function handleSearchSelect(e) {
		documentIds.set([e.detail]);
	}
</script>

<div class="flex flex-row max-w-full wrapper">
	<div class="header sticky left-0 z-10 bg-white">
		<Header on:resultSelected={(e) => handleSearchSelect(e)} />
	</div>
	<div class="interactive flex flex-grow items-stretch overflow-auto">
		<Viewers {documents} {documentIds} viewerwidth={VIEWERWIDTH} documentroot={DOCUMENTS} />
	</div>
</div>

<style>
	.wrapper {
		height: 100vh;
	}

	.header {
		@apply border-gray-300;
		border-right-width: 1px;
		max-width: 300px;
		min-width: 300px;
	}
</style>
