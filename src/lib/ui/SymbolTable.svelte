<script lang="ts">
	import type { IModuleSymbol } from '$lib/viewers/types';
	import CodeInline from './CodeInline.svelte';
	import Reference from './Reference.svelte';

	export let symbols: IModuleSymbol[];
	let showSymbols = symbols;
</script>

<table>
	<tr
		><th class="namecol"> Name</th>
		<th>Kind</th>
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

<style>
	table {
		@apply min-w-full divide-y divide-gray-100;
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
