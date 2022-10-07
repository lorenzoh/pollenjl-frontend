<script lang="ts">
	import type { IDocumentNode } from '$lib/documents/types';
	import DocHeader from './DocHeader.svelte';
	import DocMethods from './DocMethods.svelte';
	import DocSubtitle from './DocSubtitle.svelte';
	import Backlinks from '$lib/ui/Backlinks.svelte';
	import type { RefAttributes } from '$lib/types';

	export let document: IDocumentNode;
	const attributes = (document.attributes as RefAttributes)
	const { name, module_id, kind, methods, symbol_id, exported, package_id} = document.attributes;
	const backlinks = document.attributes.backlinks || [];
</script>

<div class="documentation function markdown">
	<DocHeader ispublic={exported} name={symbol_id} {module_id} {kind} />
	<DocSubtitle {attributes} />
	<div class="docstring markdown">
		<slot />
	</div>
</div>

<div class="more">
	<DocMethods {package_id} {symbol_id} {methods} />
	<Backlinks {backlinks} />
</div>
