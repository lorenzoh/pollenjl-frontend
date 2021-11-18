<script lang="ts">
	import CodeInline from '$lib/ui/CodeInline.svelte';
	import type { IDocumentNode } from '$lib/documents/types';

	export let document: IDocumentNode = null;
</script>

<span class={document.tag}><CodeInline><slot /></CodeInline></span>
