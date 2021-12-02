<script lang="ts">
	import type { IDocumentNode } from '$lib/documents/types';

	import { computevisibility, loaddocument } from '$lib/utils';
	import { derived, Writable, writable } from 'svelte/store';

	import Document from '$lib/documents/Document.svelte';
	import Viewer from './Viewer.svelte';
	import { ctxScroll } from './store';
	import { setContext } from 'svelte';
	import SearchWidget from '$lib/search/SearchWidget.svelte';
	import { fade } from 'svelte/transition';

	/* Props */
	export let documentroot: string = '/pollendata';
	export let documents: { [id: string]: IDocumentNode } = {};
	export let documentIds: Writable<string[]> = writable([]);
	export let viewerwidth: number = 700;

	const position = writable({ scroll: 0, width: 2 * viewerwidth });
	const spaces = derived([documentIds, position], ([ids, pos]) => {
		const spcs = ids.map((_, i) => computevisibility(i, viewerwidth, pos.width, pos.scroll));
		return spcs;
	});

	let container;

	const scrollPosition = writable(100);
	setContext(ctxScroll, scrollPosition);
	scrollPosition.subscribe(
		(pos) => {
			if (container !== undefined) {
				container.scrollTo({ left: pos });
			}
		},
		() => {}
	);

	setTimeout(() => {
		if (container) {
			position.update((pos) => {
				return { scroll: pos.scroll, width: container.clientWidth };
			});
		}
	}, 100);
	/* Helper for loading a document */
	async function load(docid: string) {
		await loaddocument(documents, docid, documentroot);
	}

	function handlescroll(e) {
		const node = e.target;
		position.set({ scroll: node.scrollLeft, width: node.clientWidth });
	}
</script>

<div class="outerviewers" on:scroll={(e) => handlescroll(e)} bind:this={container}>
	<div class="viewers" style="width: {viewerwidth * $documentIds.length}px">
		{#each $documentIds as docid, i (docid)}
			{#if docid == 'search'}
				<div class="viewer">
					<slot name="search">Search</slot>
				</div>
			{:else}
				<!-- else content here -->
				<Viewer
					position={i}
					width={viewerwidth}
					space={$spaces[i]}
					nviewers={$documentIds.length}
					title={docid in documents ? documents[docid].attributes.title : docid}
				>
					{#if docid in documents}
						<Document document={documents[docid]} />
					{:else}
						{#await load(docid)}
							<p in:fade={{ duration: 2000 }}>Loading</p>
						{:then doc}
							<div class="loadeddocument" in:fade={{duration: 80}}>
								<Document document={documents[docid]} />
							</div>
						{:catch error}
							<p>An error occured while loading this document: <code>{docid}</code> {error}</p>
						{/await}
					{/if}
				</Viewer>
			{/if}
		{/each}
	</div>
</div>
