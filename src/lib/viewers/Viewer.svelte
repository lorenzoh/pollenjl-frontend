<script lang="ts">
	import { getContext, setContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { ctxPosition, ctxScroll } from './store';

	export let position: number = 0;
	export let nviewers: number = 1;
	export let width: number = 500;
	export let minWidth: number = 40;
	export let space: number = width;
	export let title;
	let overlapped = false;
	let collapsed = true;
	$: overlapped = space < width;
	$: collapsed = space <= 2 * minWidth;
	setContext(ctxPosition, position);

	const scroll: Writable<number> = getContext(ctxScroll);

	function handleClick(e) {
		scroll.set(position * width);
	}
</script>

<div
	class="viewer v"
	class:overlapped
	class:collapsed
	style="width: {width}px; max-width: {width}px; left:{position * minWidth}px ;right:{-width +
		minWidth * (nviewers - position)}px;"
>
	<div class="titlebar" class:collapsed={!collapsed} on:click={handleClick}>{title}</div>
	<div class="document d" style={collapsed ? 'opacity: 0;' : 'opacity: 1;'}>
		<slot />
	</div>
</div>

<style>
	.v {
		position: sticky;
		height: inherit;
		overflow-y: auto;
	}

	.v:last-child {
		border-right-width: 1px;
	}

	.titlebar {
		position: absolute;
		writing-mode: vertical-lr;
	}

	.d {
		@apply transition-opacity;
	}

	.titlebar.collapsed {
		@apply pointer-events-none;
	}
</style>
