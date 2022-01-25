<script lang="ts">
	import { getContext } from 'svelte';

	import { ctxIsInteractive } from '$lib/viewers/store';
	import ReferenceInteractive from './ReferenceInteractive.svelte';
	import ReferenceStatic from './ReferenceStatic.svelte';
	import type { Writable } from 'svelte/store';

	export let documentId: string;
	export let reftype: string;
	export let className: string = '';

	const isInteractive: boolean = getContext(ctxIsInteractive) ? true : false;
</script>

{#if isInteractive}
	<ReferenceInteractive {documentId} {reftype} {className}><slot>LINK</slot></ReferenceInteractive>
{:else}
	<ReferenceStatic {documentId} {reftype} {className}><slot>LINK</slot></ReferenceStatic>
{/if}
