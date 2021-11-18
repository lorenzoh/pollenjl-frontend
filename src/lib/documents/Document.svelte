<script>
	import ViewerDocumentation from '$lib/viewers/documentation/ViewerDocumentation.svelte';
	import ViewerDocument from '$lib/viewers/ViewerDocument.svelte';
	import ViewerSourceFile from '$lib/viewers/ViewerSourceFile.svelte';

	import Default from './Default.svelte';
	import Leaf from './Leaf.svelte';
	import TagCode from './tags/TagCode.svelte';
	import TagPre from './tags/TagPre.svelte';
	import TagReference from './tags/TagReference.svelte';

	export let document;
	export let views = {
		// tag viewers
		pre: TagPre,
		code: TagCode,
		reference: TagReference,
		codeblock: TagPre,
		// document viewers
		documentation: ViewerDocumentation,
		sourcefile: ViewerSourceFile,
		document: ViewerDocument
	};
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
