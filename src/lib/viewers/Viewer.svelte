<script lang="ts">
	import ViewerDocument from './ViewerDocument.svelte';
	import ViewerDocumentation from './ViewerDocumentation.svelte';
	import ViewerSourceFile from './ViewerSourceFile.svelte';

	export let kind: 'documentation' | 'source' | 'document';
	export let data;
	const component = {
		documentation: ViewerDocumentation,
		document: ViewerDocument,
		source: ViewerSourceFile
	};
</script>

<svelte:component this={component} {data} on:openref/>