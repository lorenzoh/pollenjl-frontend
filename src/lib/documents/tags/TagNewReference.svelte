<script lang="ts">
	import { dev } from '$app/environment';

	import type { IDocumentNode } from '$lib/documents/types';
	import { getContext, hasContext } from 'svelte';

	import type { Writable } from 'svelte/store';
	import { writable } from 'svelte/store';

	export let document: IDocumentNode;

	const attrs = document.attributes;
	const documentId = attrs.document_id;
	const reftype = attrs.reftype;

	const urls = hasContext('urls') ? getContext('urls') : null;
	const column: number = hasContext('column') ? getContext('column') : 0;
	const isMultiColumn = getContext('isMultiColumn');
	const getHref = getContext('getHref');

	const idStore: Writable<string[]> = hasContext('documentIdStore')
		? getContext('documentIdStore')
		: writable([]);

	const attributes: Object = getContext('documentAttributes');

	/* The reference link opens the referenced document in the next column (replacing
			 other opened documents opened further to the right), UNLESS
			 the document is already opened. In the latter case no new documents are opened
			 and the existing column is scrolled to */
	const href = getHref((ids) => {
		const opened = ids.includes(documentId);
		ids = opened ? ids : [...ids.slice(0, column + 1), documentId];
		const focus = opened ? ids.findIndex((id) => id == documentId) : column + 1;
		return [ids, focus];
	});
</script>

{#if urls !== null}
	<!-- First we check that the referenced document exists. If it does not exist, we give
a visual warning during development mode, and fail silently during production. -->
	{#if !(documentId in attributes)}
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
{:else}
	ERROR: cannot render reference without <code>urls</code> context!
{/if}

<style>
	.missingref {
		@apply text-amber-600;
	}
</style>
