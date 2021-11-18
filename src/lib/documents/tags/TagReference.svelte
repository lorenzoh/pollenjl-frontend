<!--
  @component

  Does things
-->
<script lang="ts">
	import Reference from '$lib/ui/Reference.svelte';
	import type { IDocumentNode } from '../types';

	export let document: IDocumentNode;

	const attrs = document.attributes;
	const documentId = attrs.document_id;
	const reftype = attrs.reftype;
</script>

<Reference {documentId} {reftype}>
	<slot />
</Reference>
