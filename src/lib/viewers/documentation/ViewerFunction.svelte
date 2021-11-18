<script lang="ts">
	import type { IFunctionAttrs } from '../types';
	import type { IDocumentNode } from '$lib/documents/types';
	import DocHeader from './DocHeader.svelte';
	import DocMethods from './DocMethods.svelte';
	import DocSubtitle from './DocSubtitle.svelte';
	import { set_attributes } from 'svelte/internal';
import Tabs from '$lib/ui/Tabs.svelte';
import Backlinks from '$lib/ui/Backlinks.svelte';

	export let document: IDocumentNode;
	const attrs = document.attributes as IFunctionAttrs;
</script>

<div class="documentation function">
	<DocHeader ispublic={attrs.public} name={attrs.name} module_id={attrs.module_id} />

	<DocSubtitle name={attrs.name} kind={attrs.kind} module_id={attrs.module_id} />

	<div class="docstring">
		<slot />
	</div>

	<DocMethods name={attrs.name} methods={attrs.methods} />
</div>

<div class="more">
	<Tabs
		contents={[{ title: 'Backlinks', component: Backlinks, props: { backlinks: attrs.backlinks } }]}
	/>
</div>
