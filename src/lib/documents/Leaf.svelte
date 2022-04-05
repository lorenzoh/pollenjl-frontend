<script lang="ts">
	import type { IDocumentLeaf } from '$lib/documents/types';

	export let leaf: IDocumentLeaf;
	const mimes = leaf.mimes;
</script>

{#if mimes}
	{#if mimes['image/png']}
		{@html `<img src="data:image/jpeg;base64,${mimes['image/png']}" /> `}
	{:else if mimes['text/html']}
		{@html mimes['text/html']}
	{:else if mimes['text/plain']}
		{mimes['text/plain']}
	{/if}
{:else}
	MALFORMED
{/if}
