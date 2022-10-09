<script lang="ts">
	import { dev } from '$app/environment';
	import { CtxPollen, type AppContext } from '$lib/context';

	import type { IDocumentNode } from '$lib/documents/types';
	import { subscribeHref } from '$lib/navigation';
	import { error } from '@sveltejs/kit';
	import { getContext, hasContext } from 'svelte';


	export let document: IDocumentNode;

	const attrs = document.attributes;
	const documentId = attrs.document_id;
	const reftype = attrs.reftype;

	const column: number = hasContext('column') ? getContext('column') : 0;
	if (!hasContext(CtxPollen)) {
		throw error(500, "No app context!")
	}
	const appContext: AppContext = getContext(CtxPollen);
	const idStore = appContext.stores.documentIds

	/* The reference link opens the referenced document in the next column (replacing
			 other opened documents opened further to the right), UNLESS
			 the document is already opened. In the latter case no new documents are opened
			 and the existing column is scrolled to */
	const href = subscribeHref(appContext, (ids) => {
		const opened = ids.includes(documentId);
		ids = opened ? ids : [...ids.slice(0, column + 1), documentId];
		const focus = opened ? ids.findIndex((id) => id == documentId) : column + 1;
		return [ids, focus];
	});
</script>

<!-- First we check that the referenced document exists. If it does not exist, we give
a visual warning during development mode, and fail silently during production. -->
{#if !(documentId in appContext.data.docindex)}
	{#if dev}
		<span class="missingref">Missing reference: {documentId}</span>
	{/if}
	<slot>LINK</slot>
{:else if $idStore[column] == documentId}
	<slot />
{:else}
	<!-- TODO: Prefetch documents into cache on hover, so no promise is needed when
			rendering -->
	<a
		data-sveltekit-prefetch
		href={$href}
		class="reference {reftype}"
		class:opened={$idStore.includes(documentId)}><slot /></a
	>
{/if}

<style>
	.missingref {
		@apply text-amber-600;
	}
</style>
