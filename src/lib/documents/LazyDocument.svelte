<script lang="ts">
	import { APIError, type API } from '$lib/api';
	import Document from './Document.svelte';
	import * as types from '$lib/types';

	export let api: API;
	export let documentId;
	export let views;
</script>

{#await api.loadDocument(documentId)}
	<div class="text-center">Loading...</div>
{:then document}
	{#if APIError.guard(document)}
		ERROR <code>{JSON.stringify(document)}</code>
	{:else}
		<Document {document} {views} />
	{/if}
{:catch error}
	Could not load document "{error.documentId}"
	<code>{JSON.stringify(error, null, 2)}</code>
{/await}
