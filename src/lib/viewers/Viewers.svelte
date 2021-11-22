<script lang="ts">
	import type { IDocumentNode } from '$lib/documents/types';

	import { loaddocument } from '$lib/utils';
	import { derived, Writable, writable } from 'svelte/store';

	import Document from '$lib/documents/Document.svelte';
	import Viewer from './Viewer.svelte';
	import { ctxScroll } from './store';
	import { setContext } from 'svelte';

	/* Props */
	export let documentroot: string = '/pollendata';
	export let documents: { [id: string]: IDocumentNode } = {};
	export let documentIds: Writable<string[]> = writable([]);
	export let viewerwidth: number = 700;

	const position = writable({ scroll: 0, width: 2 * viewerwidth });
	const spaces = derived([documentIds, position], ([ids, pos]) => {
		const spcs = ids.map((_, i) => computevisibility(i, viewerwidth, pos.width, pos.scroll));
		console.log(pos);
		console.log(spcs);
		return spcs;
	});

	let container;

	const scrollPosition = writable(100);
	setContext(ctxScroll, scrollPosition);
	scrollPosition.subscribe(
		(pos) => {
			if (container !== undefined) {
				/* 				position.update(function ({ width }) {
					return { scroll: pos, width };
				}); */
				container.scrollTo({ left: pos });
			}
		},
		() => console.log('Cleanup')
	);

	setTimeout(() => {
		if (container !== undefined) {
			position.update((pos) => {
				return { scroll: pos.scroll, width: container.clientWidth };
			});
		}
	}, 100);
	/* Helper for loading a document */
	async function load(docid: string) {
		await loaddocument(documents, docid, documentroot);
	}

	function computevisibility(
		position: number,
		viewerwidth: number,
		containerwidth: number,
		scroll: number
	) {
		const start = position * viewerwidth;
		const end = start + viewerwidth;
		// visible start and end points
		const startvis = Math.max(scroll, start);
		const endvis = Math.min(scroll + containerwidth, end);

		const w = endvis - startvis;
		return w;
	}

	function handlescroll(e) {
		const node = e.target;
		position.set({ scroll: node.scrollLeft, width: node.clientWidth });
	}
</script>

<div class="outerviewers" on:scroll={(e) => handlescroll(e)} bind:this={container}>
	<div class="viewers" style="width: {viewerwidth * $documentIds.length}px">
		{#each $documentIds as docid, i (docid)}
			<Viewer
				position={i}
				width={viewerwidth}
				space={$spaces[i]}
				nviewers={$documentIds.length}
				title={(docid in documents) ? documents[docid].attributes.title : docid }
			>
				{#if docid in documents}
					<Document document={documents[docid]} />
				{:else}
					{#await load(docid)}
						<p>Loading</p>
					{:then doc}
						<Document document={documents[docid]} />
					{:catch error}
						<p>An error occured while loading this document: <code>{docid}</code> {error}</p>
					{/await}
				{/if}
			</Viewer>
		{/each}
	</div>
</div>
