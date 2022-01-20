<script lang="ts">
	import type { IDocumentNode } from '$lib/documents/types';
	import CodeInline from '$lib/ui/CodeInline.svelte';
	import Reference from '$lib/ui/Reference.svelte';
	import { shortenfilenamekeepmodule } from '$lib/utils';
	import Script32 from 'carbon-icons-svelte/lib/Script32';
	export let document: IDocumentNode;
	const attrs = document.attributes;
	const path = shortenfilenamekeepmodule(attrs.path);
	const pathparts = path.split('/');
	const module_id = pathparts[0];
</script>

<div class="sourcefile markdown">
	<h1>
		<span class="headertext filename">
				{pathparts[pathparts.length - 1]}
		</span>
		<span class="icon">
			<Script32 style="fill: gray; display: inline;" />
		</span>
	</h1>
	<div class="subtitle">
		{#each pathparts.slice(0, pathparts.length - 1) as part}
			{part}/
		{/each}
		is a source file in module <Reference
			documentId={`references/${module_id}`}
			reftype={'reference'}
			><CodeInline>{module_id}</CodeInline>
		</Reference>
	</div>
	<div class="source">
		<slot />
	</div>
</div>

<style>
	h1 {
		@apply flex flex-row items-center;
	}
	.headertext {
		flex-grow: 1;
	}
	.icon {
		@apply float-right flex-grow-0;
	}
</style>
