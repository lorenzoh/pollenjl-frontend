<script lang="ts">
	import DocHeader from './DocHeader.svelte';
	import type { IStructAttrs } from '../types';
	import type { IDocumentNode } from '$lib/documents/types';
	import DocSubtitle from './DocSubtitle.svelte';

	import DocMethods from './DocMethods.svelte';
	import Tabs from '$lib/ui/Tabs.svelte';
	import Backlinks from '$lib/ui/Backlinks.svelte';

	export let document: IDocumentNode;
	const { name, module_id, methods, backlinks, kind } = document.attributes as IStructAttrs;
</script>

<div class="documentation struct">
	<DocHeader ispublic={document.attributes.public} {name} {module_id} />

	<DocSubtitle {name} {kind} {module_id} />
	<div class="docstring">
		<slot />
	</div>
</div>

<div class="more">
	<DocMethods {name} {methods} />
	<Backlinks {backlinks} />
</div>
