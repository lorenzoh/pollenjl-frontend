<script lang="ts">
	import type { IModuleSymbol } from '$lib/viewers/types';
	import CodeInline from './CodeInline.svelte';
	import Reference from './Reference.svelte';

	export let symbols: IModuleSymbol[];
	let showSymbols = symbols;
</script>

<div class="max-h-96 overflow-y-auto">
	<table>
		<tr class="relative border-gray-200"
			><th class="namecol sticky top-0 bg-white"> Name</th>
			<th class="sticky top-0 bg-white">Kind</th>
		</tr>
		{#each showSymbols as symbol}
			<tr>
				<td>
					<Reference documentId={`references/${symbol.symbol_id}`} reftype="reference">
						<CodeInline className="small">{symbol.name}</CodeInline>
					</Reference>
				</td>
				<td><CodeInline className="small">{symbol.kind}</CodeInline></td>
			</tr>
		{:else}
			Does not define any symbols.
		{/each}
	</table>
</div>

<style>
	table {
		@apply min-w-full divide-y divide-gray-100 m-0 ;
	}

	th {
		@apply text-left text-xs font-medium text-gray-500 uppercase tracking-wider;
	}
	.namecol {
		width: 300px;
	}

	td {
		@apply text-sm;
	}
</style>
