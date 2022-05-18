<script lang="ts">
	import { DOCUMENT_ICONS } from '$lib/viewers/types';

	export let doctype: string;
	export let title: string;
	DOCUMENT_ICONS;
</script>

<div class="result" on:click>
	<span class="icon"><svelte:component this={DOCUMENT_ICONS[doctype]} class="icon" /></span><span
		class="name {doctype}">{title}</span
	>
</div>

<style>
	.result {
		@apply rounded-md  mb-0.5 p-0.5 pl-1 pr-1 flex flex-row items-center text-gray-600;
	}
	.result:hover {
		@apply bg-gray-100 cursor-pointer text-gray-900;
	}
	.result:hover .icon {
		fill-opacity: 1;
	}

	.name {
		@apply ml-2 align-top text-sm;
		/*  https://ishadeed.com/article/defensive-css/#long-content */
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.name.documentation {
		@apply font-mono;
		font-size: 0.8rem;
	}
	.name.sourcefile {
		@apply pl-1 italic;
	}

	.icon {
		fill-opacity: 0.5;
	}
</style>
