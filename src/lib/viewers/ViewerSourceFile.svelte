<script lang="ts">
	import type { IDocumentNode } from '$lib/documents/types';
	import { shortenfilenamekeepmodule } from '$lib/utils';
	export let document: IDocumentNode;
	const attrs = document.attributes;
	const path = shortenfilenamekeepmodule(attrs.path);
	const pathparts = path.split('/');
</script>

<div class="sourcefile">
	<h1>
		<span class="filename">
			{pathparts[pathparts.length - 1]}
		</span>
	</h1>
	<div class="subtitle">
		{#each pathparts.slice(0, pathparts.length - 1) as part}
			{part}/
		{/each}
	</div>
	<div class="source">
		<slot />
	</div>
</div>
