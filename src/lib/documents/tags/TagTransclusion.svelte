<script lang="ts">
	import type { API } from '$lib/api';
	import type { IDocumentNode } from '$lib/documents/types';
	import { getContext } from 'svelte';
	import LazyDocument from '../LazyDocument.svelte';
	import TagReference from './TagReference.svelte';
	export let document: IDocumentNode = null;

	const api: API = getContext('api');
	const views = getContext('views');

	const id = document.attributes.document_id;
</script>

<TagReference
	document={{ tag: '_', attributes: { document_id: id, reftype: 'transcluded' }, children: [] }}
>
	<div class="transclusion small">
		<LazyDocument {api} {views} documentId={id} />
	</div>
</TagReference>

<style>
</style>
