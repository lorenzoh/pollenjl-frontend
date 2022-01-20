<script lang="ts">
	import DocHeader from './DocHeader.svelte';

	import type { IModuleAttrs } from '../types';
	import type { IDocumentNode } from '$lib/documents/types';
	import CodeInline from '$lib/ui/CodeInline.svelte';
	import { compare } from '$lib/search/utils';
	import SymbolTable from '$lib/ui/SymbolTable.svelte';
	import Backlinks from '$lib/ui/Backlinks.svelte';
	import { shortenfilenamekeepmodule } from '$lib/utils';
	import Reference from '$lib/ui/Reference.svelte';
	import SourceFile from '$lib/ui/SourceFile.svelte';

	export let document: IDocumentNode;
	const { name, module_id, kind, backlinks, symbols, files } = document.attributes as IModuleAttrs;

	let showUnexported = false;
	let showSymbols = symbols.slice();
	let exportedSymbols = symbols.filter((s) => s.public).sort(compare(['kind', 'name'], false));
	let unexportedSymbols = symbols.filter((s) => !s.public).sort(compare(['kind', 'name'], false));
</script>

<div class="documentation module markdown">
	<DocHeader ispublic={document.attributes.public} {name} {module_id} {kind} />

	<p class="subtitle">
		<CodeInline>{name}</CodeInline> is a <CodeInline>module</CodeInline>
	</p>

	<div class="docstring">
		<slot />
	</div>

	<h2>Symbols</h2>
	<SymbolTable symbols={exportedSymbols} />
	<div class="controls">
		<label><input type="checkbox" bind:checked={showUnexported} />Show unexported</label>
	</div>
	{#if showUnexported}
		<SymbolTable symbols={unexportedSymbols} />
	{/if}
	<h2>Source files</h2>
	<div class="filelist">
		{#each files as file}
			<div class="file">
				<Reference
					documentId={`sourcefiles/${shortenfilenamekeepmodule(file)}`}
					reftype={'sourcefile'}><SourceFile {file} /></Reference
				>
			</div>
		{/each}
	</div>
</div>

<div class="more">
	{#if backlinks.length > 0}
		<Backlinks {backlinks} />
	{/if}
</div>

<style>
	.controls {
		@apply select-none text-sm text-gray-500 align-middle;
	}
	input {
		@apply mr-1 pt-2;
	}
  .filelist {
    @apply text-sm;
  }
  .file {
    @apply mb-0.5;
  }


</style>
