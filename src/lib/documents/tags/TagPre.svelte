<script lang="ts">
	import CodeBlock from '$lib/ui/CodeBlock.svelte';
	import type { IDocumentNode } from '$lib/documents/types';

	export let document: IDocumentNode;
	const startline = document.attributes.startline;
	const endline = document.attributes.endline;
	const cls = document.attributes.class || document.tag;

</script>

<CodeBlock {startline} {endline} {cls}><slot /></CodeBlock>
