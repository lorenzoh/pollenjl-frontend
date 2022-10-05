<script lang="ts">
	import type { PageData } from './$types';

	// libraries
	import { setContext } from 'svelte';
	import { beforeNavigate, goto } from '$app/navigation';
	import watchMedia from 'svelte-media';

	// components
	import Document from '$lib/documents/Document.svelte';
	import TagNewReference from '$lib/documents/tags/TagNewReference.svelte';
	import Pane from '$lib/slidingpanes/Pane.svelte';
	import SlidingPanes from '$lib/slidingpanes/SlidingPanes.svelte';

	// config
	import { SPECIAL_PAGES, TAGS } from '$lib/config';
	import { prerendering } from '$app/environment';
	import { derived, readable, writable } from 'svelte/store';
	import { getDocIdsFromUrl, getHrefFromIds, makeDocumentCache } from '$lib/navigation';
	import Header from '$lib/page/Header.svelte';
	import { DOCUMENT_ICONS } from '$lib/viewers/types';
	import TagTransclusion from '$lib/documents/tags/TagTransclusion.svelte';
	import LazyDocument from '$lib/documents/LazyDocument.svelte';
	import { API } from '$lib/api';

	// props
	export let data: PageData;
	// TODO: this may not update when `data` is updated! see https://github.com/sveltejs/kit/discussions/5774
	let { apiData, documentIds, docindex, baseUrl, dataUrl, versions, version } = data;
	const config = versions[version];
	const api = new API(
		dataUrl,
		version,
		fetch,
		apiData.documents,
		apiData.docversions,
		apiData.pkgindexes
	);
	const debug = true;
	// Component logic
	// TODO: add fallback routes

	const paneWidth = 700;
	const media = watchMedia({
		large: `(min-width: ${paneWidth + 40}px)`
	});
	const isMultiColumn = prerendering ? readable(false) : derived(media, (m) => m.large);

	const views = {
		// overwrite tags here for now
		...TAGS,
		reference: TagNewReference,
		transclusion: TagTransclusion
	};

	const special = {
		_search: 1
	};

	// context management
	const idStore = writable(documentIds);
	setContext('urls', { base: baseUrl, data: dataUrl });
	setContext('documentIdStore', idStore);
	setContext('documentAttributes', docindex);
	setContext('isMultiColumn', isMultiColumn);
	setContext('views', views);
	setContext('cache', api);
	setContext('version', version);

	// lifecycle hooks

	beforeNavigate(async ({ from, to, cancel }) => {
		if (to === null) {
			debug && console.log('Navigation without target');
			return;
		}
		debug && console.log('Navigation triggered: ', to, from.url.href, to.url.href);

		if ($isMultiColumn) {
			// **Multi-column view**
			// We intercept SvelteKit's client-side router, cancelling its
			// navigation. Instead we parse document ids from the URL.
			// One id is given by the href, and optionally others are given as
			// `id` query arguments.

			// TODO: drop duplicates
			const newIds = getDocIdsFromUrl(to.url, baseUrl);
			// We only navigate if the opened documents have changed
			if ($idStore != newIds) {
				history.pushState(null, '', to.url);
				debug && console.log('Navigating to ids', newIds);
				// Preload and cache documents after navigation
				await api.loadDocuments(newIds);
				idStore.set(newIds);
			}

			if (to.url.searchParams.has('focus')) {
				// TODO: scroll in afterNavigate
				const targetcolumn = parseInt(to.url.searchParams.get('focus'));
				debug && console.log('Scrolling to colum', targetcolumn);
				scrollToColumn(targetcolumn);
				//setTimeout(() => paneContainer.scrollTo({ left: targetcolumn * paneWidth, top: 0 }), 50);
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
			const [newId] = getDocIdsFromUrl(to.url, baseUrl);
			await api.loadDocument(newId);
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
			await api.loadDocuments(newIds);
			idStore.set(newIds);
		}
	};
	let paneContainer: Element;
	// UI event handling

	import { hotkey } from '@svelteuidev/composables';

	const getHref = (updateIds: {(ids: string[]): [string[], number?]}) => {
		return derived([idStore, isMultiColumn], ([ids_, is_multi],) => {
			let [ids, column] = updateIds(ids_)
			return getHrefFromIds(
				baseUrl,
				ids,
				is_multi,
				column,
			);
		})
	};
	setContext('getHref', getHref);

	// triggered by mod+k hotkey or click on search input

	const searchHref = getHref(ids => {
		let i = ids.findIndex(id => id == 'search')
		if (i >= 0) {
			return [ids, i]
		} else {
			[[...ids, 'search'], ids.length]
		}
	})
	function openSearch() {
		goto($searchHref)
		//scrollToId('search');
		return
		if ($isMultiColumn) {
			idStore.update((ids) => [...ids.filter((id) => id != 'search'), 'search']);
			scrollToId('search');
		} else {
			idStore.set(['search']);
		}
	}

	function scrollToId(id: string, delay = 50) {
		const idx = $idStore.findIndex((id_) => id == id_);
		if (idx >= 0) {
			scrollToColumn(idx, delay);
		}
	}
	function scrollToColumn(column: number, delay = 50) {
		setTimeout(() => paneContainer.scrollTo({ left: column * paneWidth, top: 0 }), 50);
	}
</script>

<svelte:window on:popstate={handleHistoryUpdate} use:hotkey={[['mod+K', () => openSearch()]]} />

<svelte:head>
	<title>{config.title} - {docindex[$idStore[0]].title}</title>
</svelte:head>

<div class="flex flex-col lg:flex-row max-w-full" style="height: 100vh; width: 100%;">
	<Header attributes={docindex} {versions} {version} />
	{#if $isMultiColumn}
		<SlidingPanes
			bind:container={paneContainer}
			numPanes={derived(idStore, (ids) => ids.length)}
			{paneWidth}
		>
			{#each $idStore as id, i (id)}
				{#if Object.keys(SPECIAL_PAGES).includes(id)}
					<Pane column={i}>
						<div slot="title" class="flex flex-row items-center h-full">
							{id}
						</div>
						<svelte:component this={SPECIAL_PAGES[id]} />
					</Pane>
				{:else}
					<Pane column={i}>
						<div slot="title" class="flex flex-row items-center h-full">
							{#if id in docindex}
								<svelte:component this={DOCUMENT_ICONS[docindex[id].tag]} class="mb-2 icon" />
								<span class="name {docindex[id].tag}">{docindex[id].title}</span>
							{:else}
								ID {id} not in `docindex`
							{/if}
						</div>
						{#if id in api.documents}
							<div class="markdown">
								<Document document={api.documents[id]} {views}>No docstrings available.</Document>
							</div>
						{:else}
							<div class="markdown">
								<LazyDocument {api} documentId={id} {views} />
							</div>
						{/if}
					</Pane>
				{/if}
			{/each}
		</SlidingPanes>
	{:else}
		<div class="markdown overflow-scroll w-full lg:w-[700px]" style="height: 100vh;">
			<Document document={api.documents[documentIds[0]]} {views} />
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
