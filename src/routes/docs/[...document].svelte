<script context="module" lang="ts">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */

	//import { assets } from '$app/paths';
	const assets = '/pollendata';
	export async function load({ page, fetch, session, stuff }) {
		const path = page.params.document;
		const docid = path ? path : 'documents/README.md';
		const url = `${assets}/${docid}.json`;
		const res = await fetch(url);
		if (res.ok) {
			const body = await res.json();
			let documents = {};
			documents[docid] = body;
			const ids = [docid, ...page.query.getAll('id')];
			return {
				props: {
					documents,
					ids
				}
			};
		}

		return {
			rootid: docid,
			status: res.status,
			error: new Error(`Could not load ${url}`)
		};
	}
</script>

<script lang="ts">
	import { base } from '$app/paths';
	import type { IDocumentNode } from '$lib/documents/types';
	import type { Writable } from 'svelte/store';

	import { setContext } from 'svelte';

	import Viewers from '$lib/viewers/Viewers.svelte';
	import { ctxDocumentIds } from '$lib/viewers/store';
	import SearchWidget from '$lib/search/SearchWidget.svelte';

	import LogoGithub32 from 'carbon-icons-svelte/lib/LogoGithub32';
	import { documentIdsStore } from './stores';

	export let ids: string[];
	export let documents: { [id: string]: IDocumentNode } = {};
	const documentIds: Writable<string[]> = documentIdsStore(ids);

	setContext(ctxDocumentIds, documentIds);

	function handleSearchSelect(e) {
		documentIds.set([e.detail]);
	}
</script>

<div class="header">
	<a href="{base}/docs/documents/README.md"> <h1>DataLoaders.jl</h1></a>
	<div class="space" />
	<div class="search">
		<SearchWidget documentsURL="/documents.json" on:resultSelected={handleSearchSelect} />
	</div>
	<div class="space" />
	<a href="https://github.com/lorenzoh/DataLoaders.jl">
		<LogoGithub32 />
	</a>
</div>

<Viewers {documents} {documentIds} viewerwidth={650} documentroot="/pollendata" />

<style>
	.space {
	}
	.search {
		@apply ml-64 mr-64;
		flex-grow: 3;
		min-width: 500px;
	}
</style>
