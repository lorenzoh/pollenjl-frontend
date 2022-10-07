<script lang="ts">
	import { onMount } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import type { Stork, SearchResults } from './types';


	export let indexName: string;
	export let indexURL: string;
	export let query: string;
	export let results: Writable<SearchResults> = writable({
		results: [],
		total_hit_count: 0,
		url_prefix: ''
	});
	export let options = {};

	let initialized = false;

	onMount(async () => {
		if (!window) {
			console.error('`window` global variable not found!');
		}
		//stork = window.stork as Stork;

		console.log(stork);
		if (!stork) {
			throw Error('`window.stork` global variable not found!');
		}
		// TODO: Initialize and download index at the same time
		console.log('Initializing...');
		await stork.initialize();

		console.log('Downloading index...');
		await stork
			.downloadIndex(indexName, indexURL, options)
			.then((r) => {
				console.log('Index successfully downloaded.');
				return r;
			})
			.catch((e) => {
				console.error('Failed to load index');
				throw e;
			});
		console.log('Done!');
		initialized = true;
	});

	//let stork: Stork;
	let searchterm = '';

	const oninput = (value: string) => {
		if (value) {
			results.set(stork.search('index', value));
		}
	};
</script>

<svelte:head>
	<script src="https://files.stork-search.net/releases/v1.5.0/stork.js"></script>
</svelte:head>

{#if initialized}
	<slot name="input">
		<input disabled={!initialized} on:input={(e) => oninput(e.target.value)} />
	</slot>
{:else}
	Initializing...
{/if}

{$results.results.length}
