<script context="module" lang="ts">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page, fetch, session, stuff }) {
		const docid = `/${page.params.document}`;
		const url = `/pollendata${docid}.json`;
		const res = await fetch(url);
		if (res.ok) {
			const body = await res.json();
			let documents = {};
			documents[docid] = body;
			return {
				props: {
					documents
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
	import type { IDocumentNode } from '$lib/documents/types';

	import { Writable, writable } from 'svelte/store';
	import { setContext } from 'svelte';

	import Viewers from '$lib/viewers/Viewers.svelte';
	import { ctxDocumentIds } from '$lib/viewers/store';
	import SearchWidget from '$lib/search/SearchWidget.svelte';

	export let documents: { [id: string]: IDocumentNode } = {};

	import { documents as searchDocuments } from '$lib/search';
	import lunr from 'lunr';
import { EdgeCluster16 } from 'carbon-icons-svelte';

	const index = lunr(function () {
		this.ref('id');
		this.field('title');
		this.field('text');
		searchDocuments.forEach(function (doc) {
			this.add(doc);
		}, this);
	});

	const documentData = Object.fromEntries(searchDocuments.map((doc) => [doc.id, doc]));

	const documentIds: Writable<string[]> = writable([...Object.keys(documents)]);

	setContext(ctxDocumentIds, documentIds);

	function handleSearchSelect(e) {
		documentIds.set([e.detail]);
	}
</script>

<div class="header">
	<h1>DataLoaders.jl</h1>
	<div style="margin-left: 16px">
		<SearchWidget
			style="width: 400px"
			{index}
			{documentData}
			on:resultSelected={handleSearchSelect}
		/>
	</div>
</div>

<Viewers {documents} {documentIds} viewerwidth={650} documentroot="/pollendata" />

<style>
	.searchviewer {
		@apply flex flex-col m-3 items-stretch;
		width: 300px;
	}
	.searchviewer h2 {
		@apply text-gray-600;
	}
</style>
