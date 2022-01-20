<script lang="ts">
	import type { ITree } from './types';

	export let data: ITree;
	const { kind, name, link, children } = data;
</script>

{#if kind === 'group'}
	<div class="group">
		{#if name}
			<span class="groupname">{name}</span>
		{/if}
		{#each children as child}
			<svelte:self data={child} />
		{/each}
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
	.group {
		@apply flex flex-col text-sm mb-4;
	}
	.groupname {
		@apply font-bold text-gray-700;
	}
	a {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
