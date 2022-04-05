<script lang="ts">
	import { hasContext, getContext } from 'svelte';

	import { ctxIsInteractive, ctxLoader } from '$lib/viewers/store';
	import ReferenceInteractive from './ReferenceInteractive.svelte';
	import ReferenceStatic from './ReferenceStatic.svelte';
	import type { HTTPDocumentLoader } from '$lib/documentloader';

	export let documentId: string;
	export let reftype: string;
	export let className: string = '';

	const isInteractive: boolean = hasContext(ctxIsInteractive)
		? getContext(ctxIsInteractive)
		: false;
	const loader: HTTPDocumentLoader = hasContext(ctxLoader) ? getContext(ctxLoader) : null;
</script>

{#if loader}
	{#if !(documentId in loader.attributes)}
		<slot>LINK</slot>
	{:else if isInteractive}
		<ReferenceInteractive {documentId} {reftype} {className}><slot>LINK</slot></ReferenceInteractive
		>
	{:else}
		<ReferenceStatic {documentId} {reftype} {className}><slot>LINK</slot></ReferenceStatic>
	{/if}
	<!-- content here -->
{/if}
