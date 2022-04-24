<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
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
	export let indexUrl: string | null;
	export let value: string = '';
	export let style = '';
	export let link = false;
	export let data = {};

	let focused = false;
	let results = [];

	let index = {};

	const state = fsm('unloaded', {
		unloaded: {
			focus: 'loading'
		},
		// loads the documents and builds the search index when the search field is
		// hovered over.
		loading: {
			_enter() {
				fetch(indexUrl ? indexUrl : documentsURL)
					.then((res) =>
						res
							.json()
							.then((data) => {
								if (indexUrl) {
									index = lunr.Index.load(data);
								} else {
									index = constructIndex(data);
								}
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
				console.log(transformquery(value))
				results = index.search(transformquery(value));
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

	function transformquery(searchterm: string) {
		return searchterm.split(" ").map(term => {
			term = term.trim();
			if (term === "") return "";
			var res = `${term}*${term.length > 2 ? "~1" : ""}`
			res = term.length > 2 ? `${res} ${res.slice(0, term.length-2)}*` : res;
			return res
		}).join(" ")
	}
	

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
	import { slide } from 'svelte/transition';
	import SearchResult from './SearchResult.svelte';
	import { ctxLoader } from '$lib/viewers/store';
	import type { HTTPDocumentLoader } from '$lib/documentloader';

	const dispatch = createEventDispatcher();

	const handleSelect = (ref: string) => {
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

	let inputnode: any;
	let hasMouse = false;
	let hasFocus = false;

	const loader: HTTPDocumentLoader = getContext(ctxLoader);

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
				placeholder="Search for text or code"
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
	{#if !allowCollapse && value}
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
						{#if link}
							<a href={loader.getHref(result.ref)}>
								<SearchResult doctype={data[result.ref].tag} title={data[result.ref].title} />
							</a>
						{:else}
							<SearchResult
								doctype={data[result.ref].tag}
								title={data[result.ref].title}
								on:click={(e) => handleSelect(result.ref)}
							/>
						{/if}
					{/each}
				</div>
			{:else if $state == 'searching'}
				<p>Searching...</p>
			{/if}
		</div>
	{/if}
</div>

<style lang="scss">
	.searchwidget {
		@apply flex flex-col z-10 border-0 rounded-xl transition-shadow bg-gray-50;
	}

	.searchwidget.focused {
		@apply shadow-sm bg-white;
	}

	.searchwidget.errored {
		@apply bg-gray-50 text-gray-500 shadow-none;
		cursor: not-allowed;
	}

	.searchfield {
		@apply text-base flex flex-row items-center p-1 rounded-xl pl-2 border-gray-200;
		border-width: 1px 1px 1px 1px;
	}

	.searchfield input,
	.searchfield p {
		@apply pl-1;
	}

	.searchfield.hasresults:not(.errored) {
		@apply rounded-b-none shadow-md;
		border-bottom-width: 0px;
	}

	.results {
		@apply flex flex-col p-1 bg-white rounded-b-xl absolute z-20 shadow-md border-gray-200;
		border-width: 1px;
		max-height: 485px;
		width: 100%;
		overflow-y: auto;
	}
	.resultwrapper {
		@apply relative flex;
	}

	.results p {
		@apply text-xs text-gray-500 mb-1 mt-1 pl-1;
	}
</style>
