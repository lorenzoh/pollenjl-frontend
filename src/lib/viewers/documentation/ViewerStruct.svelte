<script lang="ts">
	import DocHeader from './DocHeader.svelte';
	import type { IStructAttrs } from '../types';
	import type { IDocumentNode } from '$lib/documents/types';
	import DocSubtitle from './DocSubtitle.svelte';

	import DocMethods from './DocMethods.svelte';

	export let document: IDocumentNode;
	const data = document.attributes as IStructAttrs;
</script>

<div class="documentation struct">
	<DocHeader ispublic={data.public} name={data.name} module_id={data.module_id} />

	<DocSubtitle name={data.name} kind={data.kind} module_id={data.module_id} />
	<div class="docstring">
		<slot />
	</div>

	<DocMethods name={data.name} methods={data.methods} />
</div>
