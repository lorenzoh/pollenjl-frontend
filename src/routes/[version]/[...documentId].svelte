<script context="module" lang="ts">
	import { base } from '$app/paths';
	import { browser } from '$app/env';

	export const router = true;
	export const prerender = true;
	export const hydrate = true;

	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ params, fetch, url }) {
		const { version, documentId } = params;
		const dataUrl = `${base}/api/${version}`;
		const cache = makeDocumentCache(dataUrl, {}, fetch);

		await cache.load('config');

		// We load the document and 'attributes', which
		// holds metadata on all documents.
		const ids = ['attributes'];
		if (prerendering) {
			ids.push('searchindex');
		}

		// In the browser, we parse additional document Ids from the query string,
		// which cannot be done during prerendering.
		let documentIds: string[] =
			documentId == '' ? [cache.documents['config'].defaultDocument] : [documentId];
		if (browser) {
			documentIds = [documentIds[0], ...url.searchParams.getAll('id')];
		}
		documentIds.forEach((id) => ids.push(id));

		// load all relevant documents in parallel
		await Promise.all(ids.map((id) => cache.load(id)));

		return {
			props: {
				documents: cache.documents,
				documentIds,
				attributes: cache.documents['attributes'],
				config: cache.documents['config'],
				dataUrl: dataUrl,
				baseUrl: `${base}/${version}`
			}
		};
	}
</script>

<script lang="ts">
	// libraries
	import { setContext } from 'svelte';
	import { beforeNavigate } from '$app/navigation';
	import watchMedia from 'svelte-media';

	// components
	import Document from '$lib/documents/Document.svelte';
	import TagNewReference from '$lib/documents/tags/TagNewReference.svelte';
	import Pane from '$lib/slidingpanes/Pane.svelte';
	import SlidingPanes from '$lib/slidingpanes/SlidingPanes.svelte';

	// config
	import { ProjectConfig, TAGS } from '$lib/config';
	import { prerendering } from '$app/env';
	import { derived, readable, writable } from 'svelte/store';
	import { getDocIdsFromUrl, makeDocumentCache } from '$lib/navigation';
	import Header from '$lib/page/Header.svelte';
	import { DOCUMENT_ICONS } from '$lib/viewers/types';

	// props
	export let documentIds;
	export let documents;
	export let attributes;
	export let config: ProjectConfig;
	export let baseUrl: string;
	export let dataUrl: string;
	export let debug = false;

	// Component logic
	// TODO: add fallback routes

	const paneWidth = 700;
	// TODO: make dependent on media query store, e.g. https://github.com/cibernox/svelte-media
	const media = watchMedia({
		large: `(min-width: ${paneWidth + 40}px)`
	});
	const isMultiColumn = prerendering ? readable(false) : derived(media, (m) => m.large);

	const views = {
		// overwrite tags here for now
		...TAGS,
		reference: TagNewReference
	};

	const cache = makeDocumentCache(dataUrl, documents);

	// context management
	const idStore = writable(documentIds);
	setContext('urls', { base: baseUrl, data: dataUrl });
	setContext('documentIdStore', idStore);
	setContext('documentAttributes', attributes);
	setContext('isMultiColumn', isMultiColumn);

	// lifecycle hooks
	beforeNavigate(async ({ from, to, cancel }) => {
		debug && console.log('Navigation triggered: ', to, from.href, to.href);
		//if (to === null || from.href == to.href) {
		//return;
		//}

		if ($isMultiColumn) {
			// **Multi-column view**
			// We intercept SvelteKit's client-side router, cancelling its
			// navigation. Instead we parse document ids from the URL.
			// One id is given by the href, and optionally others are given as
			// `id` query arguments.

			// TODO: drop duplicates
			const newIds = getDocIdsFromUrl(to, baseUrl);
			// We only navigate if the opened documents have changed
			if ($idStore != newIds) {
				history.pushState(null, '', to);
				debug && console.log('Navigating to ids', newIds);
				await Promise.all(newIds.map(cache.load));
				idStore.set(newIds);
			}

			if (to.searchParams.has('focus')) {
				// TODO: scroll in afterNavigate
				const targetcolumn = parseInt(to.searchParams.get('focus'));
				debug && console.log('Scrolling to colum', targetcolumn);
				setTimeout(() => paneContainer.scrollTo({ left: targetcolumn * paneWidth, top: 0 }), 50);
			}

			cancel();
		} else {
			// **Single-column view**
			// This is basically like regular navigation, but with a twist to
			// make SvelteKit's client-side router work without messing up the DOM.
			// This is needed so that SvelteKit does not reuse DOM nodes for
			// the document. Doing that messes up the DOM as it is not properly
			// hydrated. This basically clears the DOM before navigation occurs.
			documentIds = [];
			const [newId] = getDocIdsFromUrl(to, baseUrl);
			await cache.load(newId);
			documentIds = [newId];
		}
	});

	// This is triggered on browser navigation, e.g. using the forward/backward
	// buttons (event is "window.onpopstate"). Since we disable native routing
	// above, we use that event to sync the documents with the page that was
	// navigated to.
	const handleHistoryUpdate = async (e) => {
		if (window !== undefined) {
			const newUrl = new URL(window.location.href);
			const newIds = getDocIdsFromUrl(newUrl, baseUrl);
			await Promise.all(newIds.map(cache.load));
			idStore.set(newIds);
		}
	};
	let paneContainer: Element;
	// UI event handling
</script>

<svelte:window on:popstate={handleHistoryUpdate} />

<svelte:head>
	<title>{config.title} - {attributes[$idStore[0]].title}</title>
</svelte:head>

<div class="flex flex-col lg:flex-row max-w-full" style="height: 100vh; width: 100%;">
	<!-- HEADER AREA -->
	<Header {attributes} {config} />
	<!-- CONTENT AREA -->
	{#if $isMultiColumn}
		<SlidingPanes
			bind:container={paneContainer}
			numPanes={derived(idStore, (ids) => ids.length)}
			{paneWidth}
		>
			{#each $idStore as id, i (id)}
				<Pane column={i}>
					<div slot="title" class="flex flex-row items-center h-full">
						<svelte:component this={DOCUMENT_ICONS[attributes[id].tag]} class="mb-2 icon" />
						<span class="name {attributes[id].tag}">{attributes[id].title}</span>
					</div>
					{#if id in cache.documents}
						<div class="markdown">
							<Document document={cache.documents[id]} {views} />
						</div>
					{:else}
						<div class="markdown">
							{#await cache.load(id)}
								<div class="text-center">Loading...</div>
							{:then document}
								<Document {document} {views} />
							{:catch error}
								Could not load document "{error.documentId}"
								<code>{JSON.stringify(error, null, 2)}</code>
							{/await}
						</div>
					{/if}
				</Pane>
			{/each}
		</SlidingPanes>
	{:else}
		<div class="markdown overflow-scroll w-full lg:w-[700px]" style="height: 100vh;">
			<Document document={cache.documents[documentIds[0]]} {views} />
		</div>
	{/if}
</div>

<style>
	.markdown {
		@apply p-4;
	}
	.test {
		overflow: visible;
	}
</style>
