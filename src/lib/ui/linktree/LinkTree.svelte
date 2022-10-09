<script lang="ts">
	import CaretRightGlyph from 'carbon-icons-svelte/lib/CaretRightGlyph';
	import CaretDownGlyph from 'carbon-icons-svelte/lib/CaretDownGlyph';

	import type { ILinkTree } from './types';
	import { getContext, hasContext } from 'svelte';
	import { readable, type Readable } from 'svelte/store';
	import type { DocIndex } from '$lib/types';
	import { CtxPollen, type AppContext } from '$lib/context';

	export let data: ILinkTree;
	export let docindex: DocIndex;
	export let depth: number = 0;
	export let openDepth: number = 0;
	export let title: string | null = null;

	let opened;
	if (!(Array.isArray(data) || typeof data === 'string')) {
		opened = Object.keys(data).map((_) => depth <= openDepth);
	}
	const toggleOpen = (i) => {
		opened[i] = !opened[i];
	};

	const appContext: AppContext = getContext(CtxPollen)
	const idStore = appContext.stores.documentIds;
</script>

{#if typeof data === 'string'}
	<div class="link" class:active={$idStore.includes(data)}>
		<a  href={`${appContext.config.urls.base}/${data}.html`}
			>{!title.endsWith('.md') ? title : docindex[data].title}</a
		>
	</div>
{:else if Array.isArray(data)}
	{#each data as child}
		<svelte:self data={child} {docindex} depth={depth + 1} {openDepth} />
	{/each}
{:else}
	{#each Object.keys(data) as k, i}
		{#if typeof data[k] === 'string'}
			<svelte:self {docindex} data={data[k]} {depth} {openDepth} title={k} />
		{:else}
			<div class="groupcontainer">
				<div class="groupname" on:click={(_) => toggleOpen(i)}>
					{#if !opened[i]}
						<CaretRightGlyph style="display:inline; width: 8px" />
					{:else}
						<CaretDownGlyph style="display:inline; width: 8px" />
					{/if}
					<span class="">{k}</span>
				</div>
				{#if opened[i]}
					<div class="group">
						<svelte:self data={data[k]} depth={depth + 1} {docindex} {openDepth} />
					</div>
				{/if}
			</div>
		{/if}
	{/each}
{/if}

<style lang="scss">
	.groupcontainer {
		@apply text-sm mt-1.5;
	}
	.group {
		@apply flex flex-col text-sm pl-3;
	}
	.groupname {
		@apply text-gray-800 my-1 text-sm flex flex-row items-center select-none cursor-pointer;
		line-height: 1.25rem;
	}
	.link {
		@apply text-gray-800 cursor-pointer text-sm border p-0.5 -mx-1 px-1 border-gray-50 rounded-md mb-0.5;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.link:hover {
		@apply border-gray-200 text-gray-900 bg-gray-100;
	}
	.link.active {
		@apply border-gray-200 text-gray-900 bg-gray-100 cursor-default;

	}
	.link.active a {
		@apply cursor-default;
	}

</style>
