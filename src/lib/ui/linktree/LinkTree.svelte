<script lang="ts">
	import CaretRightGlyph from 'carbon-icons-svelte/lib/CaretRightGlyph';
	import CaretDownGlyph from 'carbon-icons-svelte/lib/CaretDownGlyph';

	import type { ITree } from './types';
	import { slide } from 'svelte/transition';

	export let data: ITree;
	let { kind, name, link, children, opened } = data;
	opened = opened ? opened : false;

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
			<div class="group" transition:slide={{duration: 100}}>
				{#each children as child}
					<svelte:self data={child} />
				{/each}
			</div>
		{/if}
	</div>
{:else if kind === 'link'}
	<a href={link}>{name}</a>
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
	a {
		@apply mb-0.5 text-gray-800;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	a:hover {
		@apply underline;
		color: black;
	}
</style>
