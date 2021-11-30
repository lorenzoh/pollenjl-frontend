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
			const ids = [page.params.document, ...page.query.getAll('id')];
			console.log(ids);
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
	import type { IDocumentNode } from '$lib/documents/types';

	import { Writable } from 'svelte/store';
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
	<a href="/documents/README.md"> <h1>DataLoaders.jl</h1></a>
	<div style="margin-left: 32px">
		<SearchWidget
			style="width: 600px"
			documentsURL="/documents.json"
			on:resultSelected={handleSearchSelect}
		/>
	</div>
	<div class="space" />
	<a href="https://github.com/lorenzoh/DataLoaders.jl">
		<LogoGithub32 />
	</a>
</div>

<Viewers {documents} {documentIds} viewerwidth={650} documentroot="/pollendata" />

<style>
	.space {
		flex-grow: 2;
	}
</style>
