<script lang="ts">
	import { Badge, Group, Input, Loader } from '@svelteuidev/core';

	import Close20 from 'carbon-icons-svelte/lib/Close20';

	import Search20 from 'carbon-icons-svelte/lib/Search20';
	import { focus } from '@svelteuidev/composables';

	import { hotkey } from '@svelteuidev/composables';
	import { getContext, hasContext, onMount } from 'svelte';
	import { writable, type Readable, type Writable } from 'svelte/store';
	import type { SearchResults, Stork } from './types';
	import CodeInline from '$lib/ui/CodeInline.svelte';
	import { goto } from '$app/navigation';
	import SearchResult from './SearchResult.svelte';

	// ## Context
	const version: string = getContext('version');
	const urls = getContext('urls');
	const isMultiColumn: Readable<boolean> = getContext('isMultiColumn');
	const idStore: Writable<string[]> = hasContext('documentIdStore')
		? getContext('documentIdStore')
		: writable([]);
	const getHref = getContext('getHref');

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
		console.log('Initializing...');
		await stork.initialize();

		console.log('Downloading index...');
		await stork
			.downloadIndex(name, url, options)
			.then((r) => {
				console.log('Index successfully downloaded.');
				return r;
			})
			.catch((e) => {
				console.error('Failed to load index');
				throw e;
			});
		console.log('Done!');
	}

	const resetInput = () => {
		value = '';
		updateResults();
		inputElem.focus();
	};

	// If ESCAPE is pressed, clear the input field; if the input field is empty, close the search pane.
	const handleEscape = () => {
		if (value == '') {
			goto(getHref((ids) => ids.filter((id) => id != 'search')));
		} else {
			resetInput();
		}
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
			results.set(stork.search(version, value));
		}
	};
</script>

<div class="p-4 bg-gray-50 shadow-inner min-h-screen" use:hotkey={[['Escape', handleEscape]]}>
	<h1 class="text-2xl font-bold mb-4">Search</h1>
	<Input
		slot="input"
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
	>
		<svelte:fragment slot="rightSection">
			{#if !initialized}
				{#await new Promise((resolve) => {
					setTimeout(() => resolve(null), 500);
				}) then _}
					<Loader size="sm" />
				{/await}
			{:else if value.length > 0}
				<Close20 class="fill-gray-400 hover:fill-gray-700 cursor-pointer" on:click={resetInput} />
			{/if}
		</svelte:fragment>
	</Input>
	<div class="results mt-4">
		{#if initialized}
			{#each $results.results as result}
				{@const type = result.entry.url.split('/')[1]}
				<a href={getHref((ids) => ids.map((id) => (id == 'search' ? result.entry.url : id)))}>
					<div class="p-2 px-3  border border-gray-300 mt-1 rounded-md bg-gray-50 shadow-sm hover:border-bluegray-400 hover:bg-bluegray-100 hover:shadow-lg">
						<Group spacing="xs" position="apart">
							<span class="text-base text-gray-800">
								{#if type == 'ref'}
									<CodeInline
										><span class="text-sm">ModuleInfo.{result.entry.title}</span></CodeInline
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
						{#if result.excerpts.length > 1}
							<div class="py-1 px-3">
								<SearchResult {result} />
							</div>
						{/if}
					</div>
				</a>
			{:else}
				<!-- empty list -->
			{/each}
		{:else}{/if}
	</div>
</div>
