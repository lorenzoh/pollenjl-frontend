<script lang="ts">
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	import { SPECIAL_PAGES } from '$lib/config';
	import OpenTab from './OpenTab.svelte';
	import { DOCUMENT_ICONS } from '$lib/viewers/types';
	import { CtxPollen, type AppContext } from '$lib/context';

	export let appContext: AppContext
	const idStore: Writable<string[]> = appContext.stores.documentIds;
	const docindex = appContext.data.docindex;
</script>

<div class="opentabs">
	{#each $idStore as id, i (id)}
		{#if id in docindex}
			<OpenTab documentId={id} title={docindex[id].title} icon={DOCUMENT_ICONS[docindex[id].tag]} />
		{:else if id in SPECIAL_PAGES}
			<OpenTab documentId={id} title={SPECIAL_PAGES[id].name} icon={SPECIAL_PAGES[id].icon} />
		{:else}
			No attributes for id {id}
		{/if}
	{:else}
		<div class="text-gray-500">No tabs open.</div>
	{/each}
</div>

<style>
	.opentabs {
		@apply flex flex-col text-sm items-stretch;
	}
</style>
