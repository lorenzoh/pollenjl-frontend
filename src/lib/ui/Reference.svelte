<script lang="ts">
	import { hasContext, getContext } from 'svelte';

	import { ctxIsInteractive } from '$lib/viewers/store';
	import ReferenceInteractive from './ReferenceInteractive.svelte';
	import ReferenceStatic from './ReferenceStatic.svelte';

	export let documentId: string;
	export let reftype: string;
	export let className: string = '';

	const isInteractive: boolean = hasContext(ctxIsInteractive) ? getContext(ctxIsInteractive) : false;
</script>

{#if isInteractive}
	<ReferenceInteractive {documentId} {reftype} {className}><slot>LINK</slot></ReferenceInteractive>
{:else}
	<ReferenceStatic {documentId} {reftype} {className}><slot>LINK</slot></ReferenceStatic>
{/if}
