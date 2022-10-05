<script lang="ts">
	import type { Node } from '$lib/types';

	import Default from './Default.svelte';
	import Leaf from './leaves/Leaf.svelte';

	export let document: Node;
	export let views = {};
</script>

{#if document}
	<svelte:component
		this={views[document.tag] === undefined ? Default : views[document.tag]}
		{document}
		>{#if document.children.length == 0}<slot />{:else}
			{#each document.children as child}
				{#if child.tag !== undefined}
					<svelte:self document={child} {views} />
				{:else}
					<Leaf leaf={child} />
				{/if}
			{/each}
		{/if}
	</svelte:component>
{/if}
