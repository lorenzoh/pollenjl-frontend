<script lang="ts">
	import Close16 from 'carbon-icons-svelte/lib/Close16';
	import CarouselHorizontal16 from 'carbon-icons-svelte/lib/CarouselHorizontal16';

	import { Tooltip } from '@svelteuidev/core';
	import { getContext } from 'svelte';
	import { slide } from 'svelte/transition';
	import { CtxPollen } from '$lib/context';
	import { subscribeHref } from '$lib/navigation';

	export let documentId: string;
	export let title: string;
	export let icon;

	const appContext = getContext(CtxPollen);

	const hrefScroll = subscribeHref(appContext, (ids) => {
		return [ids, ids.findIndex((id) => id == documentId)];
	});
	const hrefClose = subscribeHref(appContext, (ids) => {
		return [ids.filter((id) => id != documentId), null];
	});
	const hrefSingle = subscribeHref(appContext, (ids) => {
		return [[documentId], null];
	});
</script>

<div class="opentab" transition:slide>
	<svelte:component this={icon} class="pl-0.5 opacity-60" />
	<Tooltip
		opened={false}
		position="bottom"
		placement="center"
		arrowSize={3}
		withArrow
		color="darkgray"
		gutter={5}
		label={null}
	>
		<div slot="label" class="p-0">Scroll to this pane</div>
		<a class="tabname" href={$hrefScroll}>
			{title}
		</a>
	</Tooltip>
	<span class="space flex-grow" />
	<span class="button">
		<a href={$hrefScroll}
			><CarouselHorizontal16 class="icon" title="Scroll this pane into view" /></a
		>
	</span>
	<a class="button" href={$hrefClose}>
		<Close16 class="icon" title="Close this pane" />
	</a>
</div>

<style>
	.opentab {
		@apply text-gray-600 rounded-md flex flex-row items-center py-0.5 border border-gray-50;
	}
	.opentab:hover {
		@apply border-gray-200 text-gray-900;
	}
	.opentab:hover .button {
		@apply opacity-70;
	}
	.opentab:hover .button:hover {
		@apply text-gray-900 cursor-pointer opacity-100;
	}
	.tabname {
		@apply rounded-lg px-1;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.button {
		@apply p-0.5 rounded-lg mx-0.5 opacity-40;
	}
	.opentab:hover > .button {
		@apply visible;
	}
</style>
