<script lang="ts">
	import DocHeader from './DocHeader.svelte';
	import type { IStructAttrs } from '../types';
	import type { IDocumentNode } from '$lib/documents/types';
	import DocSubtitle from './DocSubtitle.svelte';

	import Backlinks from '$lib/ui/Backlinks.svelte';

	export let document: IDocumentNode;
	const attributes = document.attributes as RefAttributes;
	const { module_id, kind, symbol_id, exported, package_id } = document.attributes;
	const backlinks = document.attributes.backlinks || [];
</script>

<div class="documentation const markdown">
	<DocHeader ispublic={exported} name={symbol_id} {module_id} {kind} />

	<DocSubtitle {attributes} />
	<div class="docstring">
		<slot />
	</div>
</div>

<div class="more">
	{#if backlinks.length > 0}
		<Backlinks {backlinks} />
	{/if}
</div>
