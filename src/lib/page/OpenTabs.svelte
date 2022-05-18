<script lang="ts">
	import { getHrefFromIds } from '$lib/navigation';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	import Close16 from 'carbon-icons-svelte/lib/Close16';
	import NotebookReference16 from 'carbon-icons-svelte/lib/NotebookReference16';

	export let attributes;
	const idStore: Writable<string[]> = getContext('documentIdStore');
	const urls = getContext('urls');
</script>

<div class="opentabs">
	{#each $idStore as id, i (id)}
		<div class="opentab">
			<a class="tabname highlight" href={getHrefFromIds(urls.base, $idStore, true, i)}>
				{attributes[id].title}
			</a>
			<span class="space flex-grow" />
			<span class="button highlight invisible p-1 rounded-lg">
				<a href={getHrefFromIds(urls.base, [id], true)}><NotebookReference16 /></a>
			</span>
			{#if i > 0}
				<a
					class="button delete highlight invisible p-1 rounded-lg"
					href={getHrefFromIds(
						urls.base,
						[...$idStore.slice(0, i), ...$idStore.slice(i + 1, $idStore.length)],
						true
					)}
				>
					<Close16 />
				</a>
				<!-- content here -->
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
