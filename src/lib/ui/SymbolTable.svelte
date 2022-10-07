<script lang="ts">
	import type { SymbolInfo } from '$lib/types';
	import CodeInline from './CodeInline.svelte';
	import Reference from './Reference.svelte';

	export let package_id: string;
	export let symbols: SymbolInfo[];
	let showSymbols = symbols;
</script>

<div class="max-h-96 overflow-y-auto m-2">
	<table>
		<tr class="relative border-gray-200"
			><th class="namecol sticky top-0 bg-white"> Name</th>
			<th class="sticky top-0 bg-white">Kind</th>
		</tr>
		{#each showSymbols as symbol}
			<tr>
				<td>
					<Reference documentId={`${package_id}/ref/${symbol.id}`} reftype="reference">
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
		@apply min-w-full divide-y divide-gray-100 m-0 border-none;
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
