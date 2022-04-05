<script lang="ts">
	import type { IDocumentNode } from '$lib/documents/types';
	import Backlinks from '$lib/ui/Backlinks.svelte';

	// props
	export let document: IDocumentNode;

	// data
	const backlinks = document.attributes.backlinks;
</script>

<div class="markdown">
	<slot />
</div>

<div class="more">
	{#if backlinks.length > 0}
		<Backlinks {backlinks} />
	{/if}
</div>
