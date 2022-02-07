<script lang="ts">
	import CaretRightGlyph from 'carbon-icons-svelte/lib/CaretRightGlyph';
	import CaretDownGlyph from 'carbon-icons-svelte/lib/CaretDownGlyph';

	import type { ITree } from './types';
	import { BASE } from '$lib/config';
	import { getContext } from 'svelte';
	import { ctxIsInteractive, ctxVersion, ctxViewControlStore } from '$lib/viewers/store';
import { getDocumentHref } from '$lib/urls';

	export let data: ITree;
	let { kind, name, link, children, opened } = data;
	opened = opened ? opened : false;

	const isInteractive = getContext(ctxIsInteractive) ? true : false;
	const s_viewcontrol = getContext(ctxViewControlStore);
	const version = getContext(ctxVersion);

	const toggleOpen = () => {
		opened = !opened;
	};
</script>

{#if kind === 'group'}
	<div class="groupcontainer">
		<div class="groupname" on:click={toggleOpen}>
			{#if !opened}
				<CaretRightGlyph style="display:inline; width: 8px" />
			{:else}
				<CaretDownGlyph style="display:inline; width: 8px" />
			{/if}

			<span class="pl-1">{name}</span>
		</div>
		{#if opened}
			<div class="group">
				{#each children as child}
					<svelte:self data={child} />
				{/each}
			</div>
		{/if}
	</div>
{:else if kind === 'link'}
	{#if isInteractive}
		<span
			on:click={() => $s_viewcontrol.documentIds.set([link])}
		
		class="link">{name}</span>
	{:else}
		<a
			class="link"
			href={getDocumentHref(version, link)}>{name}</a
		>
	{/if}
{:else if kind === 'list'}
	{#each children as child}
		<svelte:self data={child} />
	{/each}
{:else}
	else
{/if}

<style>
	.groupcontainer {
		@apply text-sm;
	}
	.group {
		@apply flex flex-col text-sm mb-1 pl-3 mt-1;
	}
	.groupname {
		@apply text-gray-500 text-sm flex flex-row items-center select-none cursor-pointer;
	}
	.link {
		@apply text-gray-700 cursor-pointer;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.link:hover {
		color: black;
	}
</style>
