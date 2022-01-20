<script context="module" lang="ts">
	export const prerender = false;

	import {
		DOCUMENTS,
		ASSETS,
		DEFAULTDOC,
		CORPUSURL,
		REPOURL,
		VIEWERWIDTH,
	} from '../../lib/config';

	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page, fetch }) {
		// document IDs are read from the query string; if none are given
		// opens the configured default document
		let documentIds: string[] = (page.query as URLSearchParams).getAll('id');
		documentIds = documentIds.length > 0 ? documentIds : [DEFAULTDOC];

		const docId = documentIds[0];

		const url = `${DOCUMENTS}/${docId}.json`;
		const res = await fetch(url);
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
	import SearchWidget from '$lib/search/SearchWidget.svelte';

	import LogoGithub32 from 'carbon-icons-svelte/lib/LogoGithub32';
	import { documentIdsStore } from './stores';

	// # Props
	// The document IDs that are initially open
	export let ids: string[];
	// A cache of {documentId: document}
	export let documents: { [id: string]: IDocumentNode } = {};

	// The active IDs are made available to child components. Needed
	// for navigation.
	const documentIds: Writable<string[]> = documentIdsStore(ids);
	import { ctxDocumentIds, ctxIsInteractive } from '$lib/viewers/store';
	setContext(ctxDocumentIds, documentIds);
	setContext(ctxIsInteractive, true);

	// When a document is selected from the search, it is used as the new root
	function handleSearchSelect(e) {
		documentIds.set([e.detail]);
	}
</script>

<div class="interactive">
	<div class="interactive-header">
		<a href="?id=documents/README.md"> <h1>DataLoaders.jl</h1></a>
		<div class="space" />
		<div class="search">
			<SearchWidget documentsURL={CORPUSURL} on:resultSelected={handleSearchSelect} />
		</div>
		<div class="space" />
		<a href={REPOURL}>
			<LogoGithub32 />
		</a>
	</div>

	<div class="interactive-viewers">
		<Viewers {documents} {documentIds} viewerwidth={VIEWERWIDTH} documentroot={DOCUMENTS} />
	</div>
</div>

<style>
	.space {
		flex-grow: 1;
	}
	.search {
		@apply ml-4 mr-4;
		flex-grow: 3;
		max-width: 500px;
	}

	.interactive {
		position: relative;
	}
	.interactive-header {
		@apply h-12;
		flex-grow: 0;
	}
	.interactive-viewers {
		flex-grow: 1;
		height: calc(100vh - 3rem);
	}
</style>
