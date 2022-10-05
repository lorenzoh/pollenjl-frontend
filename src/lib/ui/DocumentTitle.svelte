<script lang="ts">
	import { DOCUMENT_ICONS, type IDocumentTitle } from '$lib/viewers/types';
	import CodeInline from './CodeInline.svelte';

	export let title: IDocumentTitle;
	const { text, kind } = title;
	export let style: string = '';
	export let className: string = '';
</script>

<span class={className} {style}>
	<span class="icon">
		<svelte:component this={DOCUMENT_ICONS[kind]}/>
	</span>
	{#if kind == 'documentation'}
		<CodeInline>{text}</CodeInline>
	{:else}
		{text}
	{/if}
</span>

<style>
	span {
		@apply flex flex-row items-center;
	}
	.icon {
	}
</style>
