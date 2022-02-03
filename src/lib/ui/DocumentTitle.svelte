<script lang="ts">
	import { DOCUMENT_ICONS, IDocumentTitle } from '$lib/viewers/types';
	import CodeInline from './CodeInline.svelte';

	export let title: IDocumentTitle;
	const { text, kind } = title;
	export let style: string = '';
	export let className: string = '';
</script>

<span class={className} {style}>
	<svelte:component this={DOCUMENT_ICONS[kind]} style="display:inline;" />
	{#if kind == 'documentation'}
		<CodeInline>{text}</CodeInline>
	{:else}
		{text}
	{/if}
</span>
