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

	export let documents: { [id: string]: IDocumentNode } = {};

	const documentIds: Writable<string[]> = writable(Object.keys(documents));

	setContext(ctxDocumentIds, documentIds);
</script>

<div class="header">
	<h1>DataLoaders.jl</h1>
	<a href="/docs/documents/README.md">README</a>
</div>

<Viewers {documents} {documentIds} viewerwidth={650} documentroot="/pollendata" />
