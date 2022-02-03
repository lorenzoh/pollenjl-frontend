<script lang="ts">
	// external
	import { onMount } from 'svelte';
	import { setContext } from 'svelte';
	import { fade } from 'svelte/transition';

	// components
	import Document from '$lib/documents/Document.svelte';
	import Viewer from './Viewer.svelte';
	import CodeInline from '$lib/ui/CodeInline.svelte';
	import { ctxViewControl } from './store';
	import { INTERACTIVETAGS } from '$lib/config';

	// logic
	import { ViewerController } from './controller';
	import type { IDocumentLoader } from '$lib/documentloader';

	/* Props */
	export let documentIds: string[] = [];
	export let viewerwidth: number = 700;
	export let loader: IDocumentLoader;

	export const viewcontrol = new ViewerController(documentIds, viewerwidth);
	const store = viewcontrol.viewerProps;
	setContext(ctxViewControl, viewcontrol);

	// DOM node for containing <div>, is set in `onMount`
	let container: Element;
	onMount(() => {
		viewcontrol.connect(container);
	});
</script>

<svelte:window on:resize={(_) => viewcontrol.updateElemAttrs()} />
<div
	class="outer"
	on:scroll={(e) => viewcontrol.updateElemAttrs()}
	bind:this={container}
>
	<div class="inner viewers" style="width: {viewerwidth * $store.length}px">
		{#each $store as props, i (props.documentId)}
			{@const docid = props.documentId}
			{@const title = loader.getTitle(docid)}
			<Viewer {...props} {title}>
				<!-- This if check is needed so that documents are not rerendered
					when a single one changes -->
				{#if loader.hasDocument(docid)}
					<Document views={INTERACTIVETAGS} document={loader.get(docid)} />
				{:else}
					{#await loader.load(docid)}
						<p in:fade={{ duration: 2000 }}>Loading</p>
					{:then doc}
						<div class="loadeddocument" in:fade={{ duration: 80 }}>
							<Document document={doc} views={INTERACTIVETAGS} />
						</div>
					{:catch error}
						<p>
							An error occured while loading this document: <CodeInline
								>{docid}, {JSON.stringify(error)}</CodeInline
							>
						</p>
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
