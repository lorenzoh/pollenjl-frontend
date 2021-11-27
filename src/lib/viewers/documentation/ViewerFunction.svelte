<script lang="ts">
	import type { IFunctionAttrs } from '../types';
	import type { IDocumentNode } from '$lib/documents/types';
	import DocHeader from './DocHeader.svelte';
	import DocMethods from './DocMethods.svelte';
	import DocSubtitle from './DocSubtitle.svelte';
	import Tabs from '$lib/ui/Tabs.svelte';
	import Backlinks from '$lib/ui/Backlinks.svelte';

	export let document: IDocumentNode;
	const { name, module_id, kind, methods, backlinks } = document.attributes as IFunctionAttrs;
</script>

<div class="documentation function">
	<DocHeader ispublic={document.attributes.public} {name} {module_id} />
	<DocSubtitle {name} {kind} {module_id} />
	<div class="docstring markdown">
		<slot />
	</div>
</div>

<div class="more">
	<Tabs
		contents={[
			{ title: 'Backlinks', component: Backlinks, props: { backlinks } },
			{ title: 'Methods', component: DocMethods, props: { name, methods } }
		]}
	/>
</div>
