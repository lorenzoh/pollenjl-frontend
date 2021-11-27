<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import LunrSearch from './LunrSearch.svelte';
	import Search20 from 'carbon-icons-svelte/lib/Search20';
	import Close20 from 'carbon-icons-svelte/lib/Close20';
	import TextAlignJustify16 from 'carbon-icons-svelte/lib/TextAlignJustify16';
	import CodeReference16 from 'carbon-icons-svelte/lib/CodeReference16';
	import ScriptReference16 from 'carbon-icons-svelte/lib/ScriptReference16';
	import { blur, slide, fade } from 'svelte/transition';

	export let index;
	export let results = [];
	export let documentData;
	export let focused = false;
	export let style = '';
	let value = '';

	const dispatch = createEventDispatcher();
	const icons = {
		document: TextAlignJustify16,
		documentation: CodeReference16,
		sourcefile: ScriptReference16
	};

	let showResults = false;
	$: showResults = value != '' && focused;

	const handleSelect = (ref: string) => {
		console.log(ref);
		dispatch('resultSelected', ref);
	};

	const clearSearch = () => {
		value = '';
	};

	const onFocus = (e) => {
		focused = true;
	};
	const onUnfocus = (e) => {
		focused = false;
	};
</script>

<div class="searchwidget" class:focused {style} on:focusin={onFocus} on:focusout={onUnfocus}>
	<div class="searchfield" class:hasresults={showResults}>
		<Search20 style="fill:gray; padding-top: 2px; display:inline; padding-left: 4px" />
		<LunrSearch
			style="margin-left: 4px; flex-grow: 2; outline:none; background: inherit;"
			{index}
			bind:value
			bind:focused
			bind:results
		/>
		{#if value != ''}
			<Close20
				style="cursor: pointer; fill:gray; padding-top: 2px; display:inline"
				on:click={clearSearch}
			/>
		{/if}
	</div>
	{#if showResults}
		<!-- content here -->
		<div class="resultwrapper">
			<div class="results" transition:slide={{ duration: 100 }}>
				{#if results?.length == 0}
					<p>No results found.</p>
				{:else}
					<p>
						Found {results?.length} page{results?.length == 1 ? '' : 's'}:
					</p>
				{/if}

				{#each results as result, i (result.ref)}
					<div
						transition:slide={{ duration: 100 }}
						class="result"
						on:click={(e) => handleSelect(result.ref)}
					>
						<span class="icon"
							><svelte:component
								this={icons[documentData[result.ref].doctype]}
								class="icon"
							/></span
						><span class="name {documentData[result.ref].doctype}"
							>{documentData[result.ref].title}</span
						>
					</div>
				{/each}
			</div>
		</div>
	{/if}
</div>

<style lang="scss">
	.icon {
		fill-opacity: 0.5;
	}

	.searchwidget {
		@apply flex flex-col z-10 border-0 rounded-xl transition-shadow bg-gray-50;
	}

	.searchwidget.focused {
		@apply shadow-sm bg-white;
	}

	.searchfield {
		@apply text-base flex flex-row items-center p-1 rounded-xl ;
		border-width: 1px 1px 1px 1px;
	}

	.searchfield.hasresults {
		@apply rounded-b-none shadow-md;
		border-bottom-width: 0px;
	}

	.results {
		@apply flex flex-col p-1 bg-white rounded-b-xl absolute z-20 shadow-md;
		border-width: 1px;
		width: 100%;
	}
	.resultwrapper {
		@apply relative flex;
	}

	.result {
		@apply rounded-md  mb-0.5 p-0.5 pl-1 pr-1 flex flex-row items-center text-gray-600;
	}
	.name {
		@apply ml-2 align-top text-sm;
	}

	.name.documentation {
		@apply font-mono;
		font-size: 0.8rem;
	}
	.name.sourcefile {
		@apply pl-1 italic;
	}
	.result:hover {
		@apply bg-gray-100 cursor-pointer text-gray-900;
	}
	.result:hover .icon {
		fill-opacity: 1;
	}
	.results p {
		@apply text-xs text-gray-500 mb-1 mt-1 pl-1;
	}
</style>
