<script lang="ts">
	import CodeBlock from '$lib/ui/CodeBlock.svelte';
	import type { IDocumentNode } from '$lib/documents/types';

	export let document: IDocumentNode;
</script>

<CodeBlock>
	<slot />
</CodeBlock>
