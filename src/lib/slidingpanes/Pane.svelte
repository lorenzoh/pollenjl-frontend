<script lang="ts">
	import { getContext, onMount, setContext } from 'svelte';
	import { derived, Readable, readable, writable, Writable } from 'svelte/store';

	export let column: number = 0;
	export let style: string = '';
	export let debug: boolean = false;

	setContext('column', column);

	// load context from `SlidingPanes` parent
	const { width, titleWidth } = getContext('paneConfig');

	const slidingPanesPositionStore: Writable = getContext('slidingPanesPositionStore');
	const containerStore: Writable<Element> = getContext('slidingPanesContainerStore');
	const numPanesStore: Readable<number> = getContext('numPanesStore');

	let mounted = false;
	const space = derived([slidingPanesPositionStore, numPanesStore], ([container, _]) => {
		// show at first, so that width changes from parent can propagate
		if (!mounted) {
			return width;
		}
		const start = column * width - Math.floor(container.scroll / width) * titleWidth;
		const end = start + width;
		const startvis = Math.max(container.scroll, start);
		const endvis = Math.min(container.scroll + container.width, end);
		return endvis - startvis;
	});

	const computeStyle = (numPanes) => {
		return `width: ${width}px; max-width: ${width}px;
			left: ${column * titleWidth}px;
			right: ${-width + titleWidth * (numPanes - column)}px;
			${style}`;
	};

	let styleStore = readable(computeStyle($numPanesStore + 1));
	let collapsed = readable(false);
	let overlapped = readable(false);

	onMount(() => {
		mounted = true;
		collapsed = derived(space, (s) => s <= 2 * titleWidth);
		overlapped = derived(space, (s) => s < width);
		styleStore = derived(numPanesStore, computeStyle);
	});
</script>

<div class="pane v" class:overlapped={$overlapped} class:collapsed={$collapsed} style={$styleStore}>
	<div
		class="titlebar"
		style="display: {$collapsed ? 'block' : 'none'}; "
		class:collapsed={$collapsed}
		on:click={(e) => {
			$containerStore.scrollTo(column * width, 0);
		}}
	>
		{#if debug}
			collapsed: {$collapsed}, overlapped: {$overlapped}, space: {$space}, numPanes: {$numPanesStore}
		{/if}
		<slot name="title">TITLE</slot>
	</div>
	<div class="d" style="opacity: {$collapsed ? '0%' : '100%'};">
		{#if debug}
			collapsed: {$collapsed}, overlapped: {$overlapped}, space: {$space}, numPanes: {$numPanesStore}
		{/if}
		<slot />
	</div>
</div>

<style>
	.v {
		position: sticky;
		flex-shrink: 0;
		background-color: white;
		height: inherit;
		overflow-y: auto;
		overflow-y: scroll;
	}

	.v:last-child {
		pointer-events: visible;
		border-right-width: 1px;
	}

	.titlebar {
		position: absolute;
		writing-mode: vertical-lr;
		height: 100%;
		cursor: pointer;
	}

	.d {
		transition-property: opacity;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 100ms;
	}

	.titlebar.collapsed {
		/*pointer-events: none;*/
	}
</style>
