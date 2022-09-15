<script lang="ts">
	import Document from './Document.svelte';

	export let cache;
	export let documentId;
	export let views;
</script>

{#await cache.load(documentId)}
	<div class="text-center">Loading...</div>
{:then document}
	<Document {document} {views} />
{:catch error}
	Could not load document "{error.documentId}"
	<code>{JSON.stringify(error, null, 2)}</code>
{/await}
