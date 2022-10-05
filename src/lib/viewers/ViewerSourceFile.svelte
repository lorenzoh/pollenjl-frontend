<script lang="ts">
	/* IMPORTS */
	// libraries
	import Script32 from 'carbon-icons-svelte/lib/Script32';
	// components
	import CodeInline from '$lib/ui/CodeInline.svelte';
	import Reference from '$lib/ui/Reference.svelte';
	// types
	import type { Document, SrcAttributes} from '$lib/types';

	import { shortenfilenamekeepmodule } from '$lib/utils';
	
	// props
	export let document: Document;


	const {path, title, module_id, package_id} = (document.attributes as SrcAttributes);
	const pathparts = path.split('/');
	//const filename = attrs.title.split('/').slice(2).join('/');
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
		{title}
		is a source file in module <Reference
			documentId={`${package_id}/ref/${module_id}`}
			reftype={'reference'}
			><CodeInline>{module_id}</CodeInline>
		</Reference>
	</div>
	<div class="source julia">
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
