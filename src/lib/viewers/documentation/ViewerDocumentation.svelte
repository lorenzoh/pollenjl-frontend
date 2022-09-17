<script lang="ts">
	import type { IDocumentNode } from '$lib/documents/types';
	import ViewerAbstractType from './ViewerAbstractType.svelte';
	import ViewerFunction from './ViewerFunction.svelte';
	import ViewerModule from './ViewerModule.svelte';
	import ViewerStruct from './ViewerStruct.svelte';
	import ViewerConst from './ViewerConst.svelte';
	export let document: IDocumentNode;
	const attrs = document.attributes;
</script>

{#if attrs.kind == 'function'}
	<ViewerFunction {document}><slot /></ViewerFunction>
{:else if attrs.kind == 'struct'}
	<ViewerStruct {document}><slot /></ViewerStruct>
{:else if attrs.kind == 'module'}
	<ViewerModule {document}><slot /></ViewerModule>
{:else if attrs.kind == 'abstract type'}
	<ViewerAbstractType {document}><slot /></ViewerAbstractType>
{:else if attrs.kind == 'const'}
	<ViewerConst {document}><slot /></ViewerConst>
{:else if attrs.kind === undefined}
	UNDEFINED
{:else}
	Cannot render <code>{attrs.kind}</code>
{/if}
