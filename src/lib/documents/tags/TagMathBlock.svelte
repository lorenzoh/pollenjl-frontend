
<script lang="ts">
	import type { IDocumentNode } from '$lib/documents/types';
import Katex from '$lib/ui/Katex.svelte';
	export let document: IDocumentNode = null;
</script>

<Katex displayMode math={document.children.join()}><slot /></Katex>
