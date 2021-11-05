<script>
	import Default from './Default.svelte';
	import Leaf from './Leaf.svelte';
	import TagCode from './tags/TagCode.svelte';
	import TagPre from './tags/TagPre.svelte';

	export let document;
	export let views = { pre: TagPre, code: TagCode };
</script>

{#if document}
	<svelte:component
		this={views[document.tag] === undefined ? Default : views[document.tag]}
		{document}
		>{#each document.children as child}
			{#if child.tag !== undefined}
				<svelte:self document={child} {views} />
			{:else}
				<Leaf leaf={child} />
			{/if}
		{/each}
	</svelte:component>
{/if}
