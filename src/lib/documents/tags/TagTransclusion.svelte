<script lang="ts">
	import type { API } from '$lib/api';
	import type { IDocumentNode } from '$lib/documents/types';
	import { getContext } from 'svelte';
	import LazyDocument from '../LazyDocument.svelte';
	import TagNewReference from './TagNewReference.svelte';
	export let document: IDocumentNode = null;

	const api: API = getContext('api');
	const views = getContext('views');

	const id = document.attributes.document_id;
</script>

<TagNewReference
	document={{ tag: '_', attributes: { document_id: id, reftype: 'transcluded' }, children: [] }}
>
	<div class="transclusion small">
		<LazyDocument {api} {views} documentId={id} />
	</div>
</TagNewReference>

<style>
</style>
