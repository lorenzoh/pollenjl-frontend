<script lang="ts">
	import type { Leaf } from '$lib/types';
	import Katex from '$lib/ui/Katex.svelte';

	export let leaf: Leaf;
	let mimes;
	const isString = typeof leaf === 'string';
	if (typeof leaf !== 'string' && 'mimes' in leaf) {
		mimes = leaf.mimes;
	} else {
	}
</script>

{#if mimes}
	{#if mimes['image/png']}
		<img src="data:image/jpeg;base64,${mimes['image/png']}" />
	{:else if mimes['text/html']}
		{@html mimes['text/html']}
	{:else if mimes['text/latex']}
		<Katex math={mimes['text/latex']} />
	{:else if mimes['text/plain']}{mimes['text/plain']}{/if}
{:else if isString}{leaf}{:else}
	MALFORMED
{/if}
