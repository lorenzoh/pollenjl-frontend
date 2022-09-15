<script lang="ts">
	import type { IFunctionAttrs } from '../types';
	import type { IDocumentNode } from '$lib/documents/types';
	import DocHeader from './DocHeader.svelte';
	import DocMethods from './DocMethods.svelte';
	import DocSubtitle from './DocSubtitle.svelte';
	import Backlinks from '$lib/ui/Backlinks.svelte';

	export let document: IDocumentNode;
	const { name, module_id, kind, methods } = document.attributes as IFunctionAttrs;
	const backlinks = document.attributes.backlinks || [];
</script>

<div class="documentation function markdown">
	<DocHeader ispublic={document.attributes.public} {name} {module_id} {kind} />
	<DocSubtitle {kind} {module_id} />
	<div class="docstring markdown">
		<slot />
	</div>
</div>

<div class="more">
	<DocMethods {name} {methods} />
	<Backlinks {backlinks} />
</div>
