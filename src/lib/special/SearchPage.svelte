<script lang="ts">
	import type { SearchResults, Stork, SearchResult } from './types';

	import { Badge, Group, Input, Loader } from '@svelteuidev/core';
	import Close20 from 'carbon-icons-svelte/lib/Close20';
	import Search20 from 'carbon-icons-svelte/lib/Search20';
	import CodeInline from '$lib/ui/CodeInline.svelte';
	import SearchResult from './SearchResult.svelte';
	import Key from '$lib/ui/Key.svelte';

	import { focus, hotkey } from '@svelteuidev/composables';
	import { getContext, onMount } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import { goto } from '$app/navigation';
	import { CtxPollen, type AppContext } from '$lib/context';
	import { subscribeHref } from '$lib/navigation';

	// ## Context
	const appContext: AppContext = getContext(CtxPollen);
	const { version, urls, debug } = appContext.config;

	const indexURL: string = `${urls.data}/storksearch/${version}/index.st`;

	// ## Component state
	// is `true` only once search index is downloaded and stork initialized
	let initialized: boolean = false;
	// value of the search field
	export let value: string = '';

	let results: Writable<SearchResults> = writable({
		results: [],
		total_hit_count: 0,
		url_prefix: ''
	});

	const DOCTYPES = {
		doc: {
			color: 'blue',
			label: 'Document'
		},
		ref: {
			color: 'orange',
			label: 'Reference'
		},
		src: {
			color: 'green',
			label: 'Source file'
		}
	};

	let stork;
	let inputElem;

	onMount(async () => {
		if (!window) {
			console.error('`window` global variable not found!');
		}
		stork = window.stork as Stork;
		await loadStorkIndex(stork, version, indexURL);
		initialized = true;
		updateResults();
		if (inputElem) {
			inputElem.onkeydown = (e) => {
				if (e.key == 'Escape') {
					handleEscape();
				}
			};
		}
	});

	async function loadStorkIndex(stork: Stork, name, url, options = { forceOverwrite: true }) {
		if (!stork) {
			throw Error('`window.stork` global variable not found!');
		}
		// TODO: Initialize and download index at the same time
		debug && console.log('Initializing search...');
		await stork.initialize();

		debug && console.log('Downloading index...');
		await stork
			.downloadIndex(name, url, options)
			.then((r) => {
				debug && console.log('Index successfully downloaded.');
				return r;
			})
			.catch((e) => {
				console.error(`Failed to load search index from "${url}"`);
				throw e;
			});
		debug && console.log('Successfully initialized search!');
		inputElem.focus();
	}

	const closeHref = subscribeHref(appContext, (ids) => {
		let ids_ = ids.length > 1 ? ids.filter((id) => id != 'search') : ['search'];
		return [ids_, null];
	});

	const currentHref = subscribeHref(appContext, (ids) => [ids, null]);

	// If ESCAPE is pressed, clear the input field; if the input field is empty, close the search pane.
	const handleEscape = () => {
		if (value == '') {
			goto($closeHref);
		} else {
			resetInput();
		}
	};

	const resetInput = () => {
		value = '';
		updateResults();
		inputElem.focus();
	};

	const updateResults = () => {
		if (!stork) {
			return;
		}
		if (value == '') {
			results.set({
				results: [],
				total_hit_count: 0,
				url_prefix: ''
			});
		} else {
			let _results = stork.search(version, value)
			let __results = {..._results, results: _results.results.sort(score)}
			results.set(__results);
		}
	};

	// TODO: weigh search results by type, e.g. prefer documents over source files
	function makeResultHref(currentHref: string, documentId: string) {
		return currentHref.replace('search', documentId);
	}

	Array.prototype.sort()
	const MULTIPLIERS = {
		doc: 20,
		ref: 4,
		src: 1,
	}
	function score(a: SearchResult, b: SearchResult) {
			const scoreA = a.score * MULTIPLIERS[getDoctype(a.entry.url)]
			const scoreB = b.score * MULTIPLIERS[getDoctype(b.entry.url)]
			return scoreA > scoreB ? -1 : 1
	}
	function getDoctype(id: string) {
		return id.split('/')[1]
	}
</script>

<div class="p-4 bg-gray-50 min-h-screen" use:hotkey={[['Escape', handleEscape]]}>
	<h1 class="text-2xl font-bold h-14">Search</h1>
	<Input
		class="shadow-sm"
		use={[[focus]]}
		icon={Search20}
		placeholder="Search documentation"
		variant="default"
		radius="md"
		size="sm"
		on:input={updateResults}
		bind:element={inputElem}
		bind:value
		on:keydown
		rightSectionWidth={70}
	>
		<svelte:fragment slot="rightSection">
			{#if !initialized}
				{#await new Promise((resolve) => {
					setTimeout(() => resolve(null), 500);
				}) then _}
					<Loader size="sm" />
				{/await}
			{:else if value.length > 0}
				<Close20
					class="fill-gray-600 hover:fill-gray-900 cursor-pointer mr-1"
					on:click={resetInput}
				/>
				<Key className="opacity-50">Esc</Key>
			{/if}
		</svelte:fragment>
	</Input>
	<div class="results mt-4">
		{#if initialized}
			{#each $results.results as result}
				{@const type = result.entry.url.split('/')[1]}
				<a href={makeResultHref($currentHref, result.entry.url)}>
					<div
						class="p-2 px-3  border border-gray-300 mt-1 rounded-md bg-gray-50 shadow-sm hover:border-bluegray-400 hover:bg-bluegray-100 hover:shadow-lg"
					>
						<Group spacing="xs" position="apart">
							<span class="text-base text-gray-800">
								{#if type == 'ref'}
									<CodeInline
										><span class="text-sm">{result.entry.url.split('@')[0]}.{result.entry.title}</span></CodeInline
									>
								{:else}
									{result.entry.title}
								{/if}
							</span>
							<Badge variant="light" class="shadow-sm" color={DOCTYPES[type].color} size="sm"
								>{DOCTYPES[type].label}</Badge
							>
						</Group>
						<Group position="apart" />
						{#if result.excerpts.length > 0 && type != 'src'}
							<div class="py-1 px-3">
								<SearchResult {result} />
							</div>
						{/if}
					</div>
				</a>
			{:else}
				{#if value != ''}
					<div class="text-gray-700 px-2">No results found.</div>
				{/if}
			{/each}
		{:else}No results{/if}
	</div>
</div>
