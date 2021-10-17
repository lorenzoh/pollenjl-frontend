<script lang="ts">
	import CodeInline from '$lib/ui/CodeInline.svelte';
	import type { IDocumentNode } from '$lib/documents/types';

	export let document: IDocumentNode;
</script>

<CodeInline>
	<slot />
</CodeInline>
