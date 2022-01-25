<script lang="ts">
	import type { IDocumentNode } from '$lib/documents/types';

	import { computevisibility, loaddocument } from '$lib/utils';
	import { derived, Writable, writable } from 'svelte/store';

	import Document from '$lib/documents/Document.svelte';
	import Viewer from './Viewer.svelte';
	import { ctxScroll } from './store';
	import { setContext } from 'svelte';
	import { fade } from 'svelte/transition';
	import { INTERACTIVETAGS } from '$lib/config';

	/* Props */
	export let documentroot: string = '';
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
				console.log(container.clientWidth)
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

<div class="outer" on:scroll={(e) => handlescroll(e)} bind:this={container}>
	<div class="inner viewers" style="width: {viewerwidth * $documentIds.length}px">
		{#each $documentIds as docid, i (docid)}
			<!-- else content here -->
			<Viewer
				position={i}
				width={viewerwidth}
				space={$spaces[i]}
				nviewers={$documentIds.length}
				title={docid in documents ? documents[docid].attributes.title : docid}
			>
				{#if docid in documents}
					<Document views={INTERACTIVETAGS} document={documents[docid]} />
				{:else}
					{#await load(docid)}
						<p in:fade={{ duration: 2000 }}>Loading</p>
					{:then doc}
						<div class="loadeddocument" in:fade={{ duration: 80 }}>
							<Document document={documents[docid]} views={INTERACTIVETAGS} />
						</div>
					{:catch error}
						<p>An error occured while loading this document: <code>{docid}</code> {error}</p>
					{/await}
				{/if}
			</Viewer>
		{/each}
	</div>
</div>

<style>
	.outer {
		@apply flex flex-col;
		overflow-x: auto;
		overflow-y: hidden;
		scroll-behavior: smooth;
		min-width: 100%;
		min-height: 100%;
		width: inherit;
	}

	.inner {
		@apply flex;
		height: inherit;
		min-height: 100%;
	}
</style>
