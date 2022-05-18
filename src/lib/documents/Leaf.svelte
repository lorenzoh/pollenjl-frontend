<script lang="ts">
	import type { IDocumentLeaf } from '$lib/documents/types';

	export let leaf: IDocumentLeaf;
	let mimes;
	const isString = typeof leaf === 'string';
	if (!isString) {
		mimes = leaf.mimes;
	} else {
	}
</script>

{#if mimes}
	{#if mimes['image/png']}
	 <img src="data:image/jpeg;base64,${mimes['image/png']}" />
	{:else if mimes['text/html']}
		{@html mimes['text/html']}
	{:else if mimes['text/plain']}{mimes['text/plain']}{/if}
{:else if isString}{leaf}{:else}
	MALFORMED
{/if}
