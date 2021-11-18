<script lang="ts">
	import type { Writable } from 'svelte/store';
	import { getContext } from 'svelte';
	import { ctxDocumentIds, ctxPosition, ctxScroll } from '$lib/viewers/store';
	import { navigateToDocument } from '$lib/documents/tags/references';

	export let documentId: string;
	export let reftype: string;

	// stores
	const documentIds: Writable<string[]> = getContext(ctxDocumentIds);
	const position: number = getContext(ctxPosition);
	const scroll: Writable<number> = getContext(ctxScroll);

	function handleClick(e) {
		navigateToDocument(documentIds, scroll, documentId, position);
	}
</script>

{#if reftype === null}
	Misformed reference
{:else}
	<span
		class:opened={$documentIds.includes(documentId)}
		class="reference {reftype}"
		on:click={handleClick}
	>
		<slot />
	</span>
{/if}
