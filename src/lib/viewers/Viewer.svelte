<script lang="ts">
	import DocumentTitle from '$lib/ui/DocumentTitle.svelte';
	import { getContext, setContext } from 'svelte';
	import type { ViewerController } from './controller';
	import { ctxPosition, ctxViewControl } from './store';

	export let documentId: string;
	export let column: number = 0;
	export let overlapped = false;
	export let collapsed = false;
	export let title: string = documentId;
	export let style: string;

	setContext(ctxPosition, column);
	const viewcontrol: ViewerController = getContext(ctxViewControl);
</script>

<div class="viewer v" class:overlapped class:collapsed {style}>
	<div class="titlebar" class:collapsed={!collapsed} on:click={(e) => viewcontrol.scrollTo(column)}>
		<DocumentTitle {title} />
	</div>
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
		height: 100%;
	}

	.d {
		@apply transition-opacity;
	}

	.titlebar.collapsed {
		@apply pointer-events-none;
	}
</style>
