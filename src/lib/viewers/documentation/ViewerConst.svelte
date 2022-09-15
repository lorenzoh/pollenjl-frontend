<script lang="ts">
	import DocHeader from './DocHeader.svelte';
	import type { IStructAttrs } from '../types';
	import type { IDocumentNode } from '$lib/documents/types';
	import DocSubtitle from './DocSubtitle.svelte';

	import DocMethods from './DocMethods.svelte';
	import Backlinks from '$lib/ui/Backlinks.svelte';

	export let document: IDocumentNode;
	const { name, module_id, kind } = document.attributes as IStructAttrs;
	const backlinks = document.attributes.backlinks || [];
</script>

<div class="documentation const markdown">
	<DocHeader ispublic={document.attributes.public} {name} {module_id} {kind}/>

	<DocSubtitle {kind} {module_id} />
	<div class="docstring">
		<slot />
	</div>
</div>

<div class="more">
	<Backlinks {backlinks} />
</div>
