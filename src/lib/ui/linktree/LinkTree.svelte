<script lang="ts">
	import CaretRightGlyph from 'carbon-icons-svelte/lib/CaretRightGlyph';
	import CaretDownGlyph from 'carbon-icons-svelte/lib/CaretDownGlyph';

	import type { ILinkTree } from './types';
	import { getContext } from 'svelte';
	import { ctxLoader } from '$lib/viewers/store';
	import type { ViewerController } from '$lib/viewers/controller';
	import type { HTTPDocumentLoader } from '$lib/documentloader';

	export let viewcontrol: ViewerController;
	export let data: ILinkTree;
	export let depth: number = 0;
	export let openDepth: number = 0;
	export let isInteractive: boolean = false;
	export let title: string | null;

	const loader: HTTPDocumentLoader = getContext(ctxLoader);

	let opened;
	if (!(Array.isArray(data) || typeof data === 'string')) {
		opened = Object.keys(data).map((_) => depth <= openDepth);
	}
	const toggleOpen = (i) => {
		opened[i] = !opened[i];
	};
</script>

{#if typeof data === 'string'}
	{#if isInteractive}
		<span on:click={() => viewcontrol.documentIds.set([data])} class="link"
			>{title ? title : loader.getTitle(data).text}</span
		>
	{:else}
		<a class="link" href={loader.getHref(data)}>{title ? title : loader.getTitle(data).text}</a>
	{/if}
{:else if Array.isArray(data)}
	{#each data as child}
		<svelte:self data={child} {viewcontrol} depth={depth + 1} {openDepth} {isInteractive} />
	{/each}
{:else}
	{#each Object.keys(data) as k, i}
		{#if typeof data[k] === 'string'}
			<svelte:self data={data[k]} {viewcontrol} {depth} {openDepth} {isInteractive} title={k} />
		{:else}
			<div class="groupcontainer">
				<div class="groupname" on:click={(_) => toggleOpen(i)}>
					{#if !opened[i]}
						<CaretRightGlyph style="display:inline; width: 8px" />
					{:else}
						<CaretDownGlyph style="display:inline; width: 8px" />
					{/if}
					<span class="pl-1">{k}</span>
				</div>
				{#if opened[i]}
					<div class="group">
						<svelte:self data={data[k]} {viewcontrol} depth={depth+1} {openDepth} {isInteractive} />
					</div>
				{/if}
			</div>
		{/if}
	{/each}
{/if}

<style>
	.groupcontainer {
		@apply text-sm mt-1.5;
	}
	.group {
		@apply flex flex-col text-sm pl-3;
	}
	.groupname {
		@apply text-gray-500 text-xs font-bold uppercase flex flex-row items-center select-none cursor-pointer;
		line-height: 1.25rem;
	}
	.link {
		@apply text-gray-600 cursor-pointer text-sm mt-0.5;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.link:hover {
		color: black;
	}

	.link:active {
		color: black;
	}
</style>
