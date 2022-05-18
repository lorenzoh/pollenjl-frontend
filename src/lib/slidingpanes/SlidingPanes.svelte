<script lang="ts">
	import { onMount } from 'svelte';
	import { setContext } from 'svelte';
	import { ctxViewControl } from './store';
	import { ViewerController } from './controller';
	import { Readable, readable, writable } from 'svelte/store';

	/* Props */
	// How wide (in px) each pane should be
	export let paneWidth: number = 700;

	// How wide (in px) the pane's title should be. This is the minimum
	// width the pane takes when scrolled all the way to one side.
	export let titleWidth: number = 40;

	// total number of panes
	export let numPanes: Readable<number> = readable(1);

	setContext('paneConfig', { width: paneWidth, titleWidth });
	setContext('numPanesStore', numPanes);
	const containerStore = writable(null);
	setContext('slidingPanesContainerStore', containerStore);

	// This stores information about how far the panes container is scrolled and
	// how wide is. This is used by child `Pane`s to compute visibility.
	const slidingPanesPositionStore = writable({ scroll: 0, width: 0 });
	setContext('slidingPanesPositionStore', slidingPanesPositionStore);

	export let container: Element = null;

	onMount(() => {
		updatePosition();
		containerStore.set(container);
	});
	const updatePosition = () => {
		slidingPanesPositionStore.set({
			scroll: container.scrollLeft,
			width: container.clientWidth
		});
	};
	setContext('updatePosition', updatePosition);
</script>

<svelte:window on:resize={(_) => updatePosition()} />

<div class="outermost">
	<div
		class="outer"
		bind:this={container}
		on:scroll={(_) => updatePosition()}
		style="width: {paneWidth * $numPanes}px"
	>
		<div class="inner viewers"><slot /></div>
	</div>
</div>

<style>
	.outermost {
		position: static;
		height: inherit;
		max-width: 100%;
		overflow: auto;
	}
	.outer {
		display: flex;
		flex-direction: column;
		overflow-x: auto;
		overflow-y: hidden;
		scroll-behavior: smooth;
		max-width: 100%;
		height: inherit;
	}

	.inner {
		display: flex;
		height: inherit;
		min-height: 100%;
		width: inherit;
	}
</style>
