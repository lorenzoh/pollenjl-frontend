<script lang="ts">
	import type { IDocumentNode } from '$lib/documents/types';
	import Backlinks from '$lib/ui/Backlinks.svelte';
	import Tabs from '$lib/ui/Tabs.svelte';

	// props
	export let document: IDocumentNode;

	// data
	const backlinks = document.attributes.backlinks;
</script>

<div class="markdown">
	<slot />
</div>

<div class="more">
	<Tabs contents={[{ title: 'Backlinks', component: Backlinks, props: { backlinks } }]} />
</div>
