<script lang="ts">
	import DocHeader from './DocHeader.svelte';
	import type { IStructAttrs } from '../types';
	import type { IDocumentNode } from '$lib/documents/types';
	import DocSubtitle from './DocSubtitle.svelte';

	import DocMethods from './DocMethods.svelte';
	import Tabs from '$lib/ui/Tabs.svelte';
	import Backlinks from '$lib/ui/Backlinks.svelte';

	export let document: IDocumentNode;
	const {attributes} = document;
	console.log(document.attributes)
	const { symbol_id, module_id, methods, backlinks, kind } = attributes
	const name = symbol_id

</script>

<div class="documentation struct markdown">
	<DocHeader ispublic={document.attributes.public} {name} {module_id} {kind} />

	<DocSubtitle {attributes} />
	<div class="docstring">
		<slot />
	</div>
</div>

<div class="more">
	{#if methods}
		<DocMethods {name} {methods} />
	{/if}
	{#if backlinks}
		<Backlinks {backlinks} />
	{/if}
</div>
