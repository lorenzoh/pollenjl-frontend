<script lang="ts">
	import { getContext, setContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { ctxPosition, ctxScroll } from './store';
	import { slideHorizontal } from '$lib/transitions/slideHorizontal';
	import { fade } from 'svelte/transition';

	export let position: number = 0;
	export let nviewers: number = 1;
	export let width: number = 500;
	export let space: number = width;
	export let title;
	let overlapped = false;
	$: overlapped = space < width;
	setContext(ctxPosition, position);

	const scroll: Writable<number> = getContext(ctxScroll);

	function handleClick(e) {
		scroll.set(position * width);
	}
</script>

<div
	in:fade
	class="viewer"
	class:overlapped
	class:collapsed={space <= 80}
	style="width: {width}px; max-width: {width}px; left:{position * 40}px ;right:{-width +
		40 * (nviewers - position)}px;"
>
	<div class="titlebar" on:click={handleClick}>{title}</div>
	<div class="document">
		<slot />
	</div>
</div>

<style>
	.titlebar {
		position: absolute;
		writing-mode: vertical-lr;
	}
</style>
