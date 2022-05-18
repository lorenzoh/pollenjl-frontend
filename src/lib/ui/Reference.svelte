<script lang="ts">
	import TagNewReference from '$lib/documents/tags/TagNewReference.svelte';

	export let documentId: string;
	export let reftype: string;

	const document = {
		tag: 'reference',
		attributes: { document_id: documentId, reftype },
		children: []
	};
</script>

<TagNewReference {document}><slot /></TagNewReference>
