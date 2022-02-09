<script lang="ts">
	import type { HTTPDocumentLoader } from '$lib/documentloader';
	import DocumentTitle from '$lib/ui/DocumentTitle.svelte';

	import type { ViewerController } from '$lib/viewers/controller';
	import { ctxLoader } from '$lib/viewers/store';
	import Close16 from 'carbon-icons-svelte/lib/Close16';
	import NotebookReference16 from 'carbon-icons-svelte/lib/NotebookReference16';
	import { getContext } from 'svelte';
	import { slide } from 'svelte/transition';

	export let viewcontrol: ViewerController;

	const documentIds = viewcontrol.documentIds;
	const loader: HTTPDocumentLoader = getContext(ctxLoader);
</script>

<div class="opentabs">
	{#each $documentIds as id (id)}
		<div class="opentab" >
			<span
				class="tabname highlight"
				on:click={() => {
					viewcontrol.scrollToDocument(id);
				}}
			>
				<DocumentTitle className="small" style="" title={loader.getTitle(id)} />
			</span>
			<span class="space flex-grow" />
			<span class="button highlight invisible p-1 rounded-lg">
				<a href={loader.getHref(id)}><NotebookReference16 /></a>
			</span>
			<span
				class="button delete highlight invisible p-1 rounded-lg"
				on:click={(e) => viewcontrol.closeDocument(id)}
			>
				<Close16 />
			</span>
		</div>
	{:else}
		<div class="text-gray-500">No tabs open.</div>
	{/each}
</div>

<style>
	.opentabs {
		@apply flex flex-col text-sm items-stretch;
	}

	.opentab {
		@apply text-gray-600 rounded-md flex flex-row items-center;
	}
	.highlight:hover {
		@apply bg-gray-100 text-gray-900 cursor-pointer;
	}
	.tabname {
		@apply pl-1 pr-1 rounded-lg text-gray-600;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.opentab:hover > .button {
		@apply visible;
	}
</style>
