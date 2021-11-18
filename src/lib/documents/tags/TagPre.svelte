<script lang="ts">
	import CodeBlock from '$lib/ui/CodeBlock.svelte';
	import type { IDocumentNode } from '$lib/documents/types';

	export let document: IDocumentNode;
	const startline = document.attributes.startline;
	const endline = document.attributes.endline;
</script>

<CodeBlock {startline} {endline}><slot /></CodeBlock>
