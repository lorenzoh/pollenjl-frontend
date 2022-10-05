<script lang="ts">
	import { getHrefFromIds } from '$lib/navigation';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	import Close16 from 'carbon-icons-svelte/lib/Close16';
	import NotebookReference16 from 'carbon-icons-svelte/lib/NotebookReference16';
	import { Tooltip } from '@svelteuidev/core';

	export let attributes;
	const idStore: Writable<string[]> = getContext('documentIdStore');
	const urls = getContext('urls');
</script>

<div class="opentabs">
	{#each $idStore as id, i (id)}
		<div class="opentab">
			{#if id in attributes}
				<a class="tabname highlight" href={getHrefFromIds(urls.base, $idStore, true, i)}>
					{attributes[id].title}
				</a>
				<span class="space flex-grow" />
				{#if i > 0}
					<span class="button highlight invisible p-1 rounded-lg">
						<a href={getHrefFromIds(urls.base, [id], true)}><NotebookReference16 /></a>
					</span>
					<a
						class="button highlight invisible p-1 rounded-lg"
						href={getHrefFromIds(
							urls.base,
							[...$idStore.slice(0, i), ...$idStore.slice(i + 1, $idStore.length)],
							true
						)}
					>
						<Close16 />
					</a>
				{/if}
			{:else}
				No attributes for id {id}
			{/if}
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
		@apply text-gray-700 rounded-md flex flex-row items-center;
	}
	.highlight:hover {
		@apply bg-gray-200 text-gray-900 cursor-pointer;
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
