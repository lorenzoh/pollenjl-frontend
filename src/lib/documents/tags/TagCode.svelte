<script lang="ts">
	import CodeInline from '$lib/ui/CodeInline.svelte';
	import type { IDocumentNode } from '$lib/documents/types';

	export const document: IDocumentNode = null;
</script>

<CodeInline>
	<slot />
</CodeInline>
