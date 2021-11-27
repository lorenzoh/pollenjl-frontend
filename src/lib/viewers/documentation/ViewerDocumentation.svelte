<script lang="ts">
	import type { IDocumentNode } from '$lib/documents/types';
	import Backlinks from '$lib/ui/Backlinks.svelte';
	import { attr } from 'svelte/internal';
	import ViewerFunction from './ViewerFunction.svelte';
	import ViewerStruct from './ViewerStruct.svelte';
	export let document: IDocumentNode;
	const attrs = document.attributes;
</script>

<div class="pageicon">
</div>

{#if attrs.kind == 'function'}
	<ViewerFunction {document}><slot /></ViewerFunction>
{:else if attrs.kind == 'struct'}
	<ViewerStruct {document}><slot /></ViewerStruct>
{:else}
	Cannot render <code>{attrs.kind}</code>
{/if}


<style>
	.pageicon {
		@apply absolute right-6 text-bluegray-500;


	}

</style>