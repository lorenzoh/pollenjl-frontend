<script lang="ts">
	import type { Writable } from 'svelte/store';
	import { getContext } from 'svelte';
	import { ctxPosition, ctxViewControl } from '$lib/viewers/store';
	import type { ViewerController } from '$lib/viewers/controller';

	export let documentId: string;
	export let reftype: string;
	export let className: string = '';

	// stores
	const column: number = getContext(ctxPosition);

	const viewcontrol: ViewerController = getContext(ctxViewControl);
	const documentIds: Writable<string[]> = viewcontrol.documentIds

	function handleClick(_) {
		viewcontrol.openDocument(documentId, column + 1);
		setTimeout(() => viewcontrol.scrollToDocument(documentId), 30);
	}
</script>

{#if reftype === null}
	Misformed reference
{:else if $documentIds[column] == documentId}
	<slot />
{:else}
	<span
		class:opened={$documentIds.includes(documentId)}
		class="reference {reftype} {className}"
		on:click={handleClick}
	>
		<slot />
	</span>
{/if}
