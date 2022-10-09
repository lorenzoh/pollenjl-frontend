<script lang="ts">
	import TagReference from '$lib/documents/tags/TagReference.svelte';

	export let documentId: string;
	export let reftype: string;

	const document = {
		tag: 'reference',
		attributes: { document_id: documentId, reftype },
		children: []
	};
</script>

<TagReference {document}><slot /></TagReference>
