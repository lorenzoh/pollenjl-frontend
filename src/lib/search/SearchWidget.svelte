<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	/*

	SearchWidget states:


	- initial: no search term, unfocused
		- on focus -> loading
	- loading: the document index is being loaded/created
		- on success -> ready
		- on failure -> error
	- ready: search field highlighted, ready to receive text
		- on text entry -> searching
	- searching: the search text has changed and the index is being searched
		- on 
	- error (FINAL): there was an error loading the search index


	

	*/

	import fsm from 'svelte-fsm';
	import lunr from 'lunr';

	export let documentsURL: string;
	export let value: string = '';
	export let style = '';

	let focused = false;
	let results = [];

	let data = {};
	let index = {};

	const state = fsm('unloaded', {
		unloaded: {
			focus: 'loading'
		},
		// loads the documents and builds the search index when the search field is
		// hovered over.
		loading: {
			_enter() {
				fetch(documentsURL)
					.then((res) =>
						res
							.json()
							.then((documents) => {
								index = constructIndex(documents);
								data = Object.fromEntries(documents.map((doc) => [doc.id, doc]));
								this.success();
							})
							.catch((e) => this.error(JSON.stringify(e)))
					)
					.catch((e) => this.error(JSON.stringify(e)));
			},
			success() {
				return 'ready';
			},
			error(e) {
				return 'errored';
			}
		},
		// ready to search. when a search term is entered/updated fires off a search
		// after a small delay -> :searching
		ready: {
			write() {
				if (value) {
					this.search.debounce(0.1);
				} else {
					results = [];
				}
			},
			search(term: string) {
				return 'searching';
			}
		},
		// searching for a term. when search is complete goes back to :ready
		searching: {
			_enter() {
				results = index.search(value);
				this.done();
			},
			done: 'ready'
		},
		// error state for when the search index can not be loaded
		errored: {
			_enter() {
				value = 'Could not load search index!';
			}
		}
	});

	function constructIndex(documents) {
		return lunr(function () {
			this.ref('id');
			this.field('title');
			this.field('text');
			documents.forEach(function (doc) {
				this.add(doc);
			}, this);
		});
	}

	$: {
		value;
		state.write();
	}

	import Search20 from 'carbon-icons-svelte/lib/Search20';
	import Close20 from 'carbon-icons-svelte/lib/Close20';
	import TextAlignJustify16 from 'carbon-icons-svelte/lib/TextAlignJustify16';
	import CodeReference16 from 'carbon-icons-svelte/lib/CodeReference16';
	import ScriptReference16 from 'carbon-icons-svelte/lib/ScriptReference16';
	import { blur, slide, fade } from 'svelte/transition';
	import { search } from './utils';
	import { Input } from 'postcss';

	const dispatch = createEventDispatcher();
	const icons = {
		document: TextAlignJustify16,
		documentation: CodeReference16,
		sourcefile: ScriptReference16
	};

	const handleSelect = (ref: string) => {
		console.log(ref);
		dispatch('resultSelected', ref);
	};

	const onFocus = (e) => {
		focused = true;
		state.focus();
	};
	const onUnfocus = (e) => {
		hasFocus = false;
	};

	const resetSearch = (_) => {
		value = '';
		if (inputnode) {
			inputnode.focus();
		}
	};

	let inputnode;
	let expanded = false;
	$: expanded = focused && value && !($state == 'errored');

	let hasMouse = false;
	let hasFocus = false;

	let allowCollapse = true;
	$: {
		allowCollapse = !(hasMouse || hasFocus);
	}
</script>

<div
	class="searchwidget"
	class:focused
	class:errored={$state == 'errored'}
	{style}
	on:focusin={onFocus}
>
	<!-- This is the search field where you enter a query. If the index failed
	to load, it will be disabled and an error message shown -->
	<div class="searchfield" class:hasresults={!allowCollapse && value}>
		<Search20 style="fill:gray; display:inline" />
		{#if $state == 'errored'}
			<p>Could not load search index!</p>
		{:else}
			<input
				bind:this={inputnode}
				type="text"
				bind:value
				on:focus={(e) => (hasFocus = true)}
				on:blur={onUnfocus}
				style="margin-left: 4px; flex-grow: 2; outline:none; background: inherit;"
			/>

			<!-- "x" to clear the search query -->
			{#if value != ''}
				<Close20
					style="cursor: pointer; fill:gray; padding-top: 2px; display:inline"
					on:click={resetSearch}
				/>
			{/if}
		{/if}
	</div>
	{#if !allowCollapse && (value)}
		<div
			class="resultwrapper"
			on:mouseenter={(e) => (hasMouse = true)}
			on:mouseleave={(e) => {
				hasMouse = false;
			}}
		>
			<!-- If there are no errors and a query has completed, the results are shown -->
			{#if $state == 'ready'}
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
							transition:slide={{ duration: 0 }}
							class="result"
							on:click={(e) => handleSelect(result.ref)}
						>
							<span class="icon"
								><svelte:component this={icons[data[result.ref].doctype]} class="icon" /></span
							><span class="name {data[result.ref].doctype}">{data[result.ref].title}</span>
						</div>
					{/each}
				</div>
			{:else if $state == 'searching'}
				<p>Searching...</p>
			{/if}
		</div>
	{/if}
</div>

<!-- 
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
	
</div>
 -->
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

	.searchwidget.errored {
		@apply bg-gray-50 text-gray-500;
		cursor: not-allowed;
	}

	.errored .searchfield {
	}

	.searchfield {
		@apply text-base flex flex-row items-center p-1 rounded-xl pl-2;
		border-width: 1px 1px 1px 1px;
	}

	.searchfield input,
	.searchfield p {
		@apply pl-1;
	}

	.searchfield.hasresults {
		@apply rounded-b-none shadow-md;
		border-bottom-width: 0px;
	}

	.results {
		@apply flex flex-col p-1 bg-white rounded-b-xl absolute z-20 shadow-md;
		border-width: 1px;
		max-height: 485px;
		width: 100%;
		overflow-y: auto;
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
