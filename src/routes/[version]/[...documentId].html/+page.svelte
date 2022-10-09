<script lang="ts">
	import type { PageData } from './$types';

	// libraries
	import { setContext } from 'svelte';
	import { afterNavigate, beforeNavigate, goto } from '$app/navigation';
	import watchMedia from 'svelte-media';

	// components
	import Document from '$lib/documents/Document.svelte';
	import Pane from '$lib/slidingpanes/Pane.svelte';
	import SlidingPanes from '$lib/slidingpanes/SlidingPanes.svelte';

	// config
	import { SPECIAL_PAGES, TAGS } from '$lib/config';
	import { dev, prerendering } from '$app/environment';
	import { derived, readable, writable } from 'svelte/store';
	import {
		afterNavigateHandler,
		beforeNavigateHandler,
		getDocIdsFromUrl,
		subscribeHref
	} from '$lib/navigation';
	import Header from '$lib/header/Header.svelte';
	import { DOCUMENT_ICONS } from '$lib/viewers/types';
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
	const debug = dev;

	const paneWidth = 700;
	const media = watchMedia({
		large: `(min-width: ${paneWidth + 40}px)`
	});
	const hasLargeScreen = prerendering ? readable(false) : derived(media, (m) => m.large);
	const preferMultiColumn = writable(true);
	const multiColumn = derived([hasLargeScreen, preferMultiColumn], ([a, b]) => a && b);

	const views = TAGS;

	// context management
	const idStore = writable(documentIds);
	setContext('urls', { base: baseUrl, data: dataUrl });
	setContext('documentIdStore', idStore);
	setContext('documentAttributes', docindex);
	setContext('isMultiColumn', preferMultiColumn);
	setContext('views', TAGS);
	setContext('cache', api);
	setContext('version', version);

	const appContext: AppContext = {
		// configuration that is constant for a package version
		config: {
			urls: { base: baseUrl, data: dataUrl },
			specialviews: SPECIAL_PAGES,
			views: TAGS,
			version: version,
			debug
		},
		// state of the UI
		stores: { documentIds: idStore, multiColumn, preferMultiColumn },
		data: { docindex, versions },
		api
	};
	setContext(CtxPollen, appContext);

	// lifecycle hooks

	beforeNavigate(async (nav) => beforeNavigateHandler(appContext, nav, $idStore, $multiColumn));

	afterNavigate((nav) => afterNavigateHandler(appContext, nav, scrollToColumn));

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
	import { CtxPollen, type AppContext } from '$lib/context';

	const getTitle = (appContext: AppContext, id) => {
		if (id in appContext.config.specialviews) {
			return appContext.config.specialviews[id].name;
		} else {
			return appContext.data.docindex[id].title;
		}
	};

	const searchHref = subscribeHref(appContext, (ids) => {
		let i = ids.findIndex((id) => id == 'search');
		if (i >= 0) {
			return [ids, i];
		} else {
			return [[...ids, 'search'], ids.length];
		}
	});
	function openSearch() {
		goto($searchHref);
	}

	function scrollToColumn(column: number, delay = 50) {
		setTimeout(() => paneContainer.scrollTo({ left: column * paneWidth, top: 0 }), 50);
	}
</script>

<svelte:window on:popstate={handleHistoryUpdate} use:hotkey={[['mod+K', () => openSearch()]]} />

<svelte:head>
	<title>{config.title} - {getTitle(appContext, $idStore[0])}</title>
</svelte:head>

<div class="flex flex-col lg:flex-row max-w-full" style="height: 100vh; width: 100%;">
	<Header {appContext} />
	{#if $multiColumn}
		<SlidingPanes
			bind:container={paneContainer}
			numPanes={derived(idStore, (ids) => ids.length)}
			{paneWidth}
		>
			{#each $idStore as id, i (id)}
				{#if Object.keys(SPECIAL_PAGES).includes(id)}
					<Pane column={i}>
						<div slot="title" class="flex flex-row items-center h-full">
							<svelte:component this={SPECIAL_PAGES[id].icon} class="mb-2 icon" />
							{SPECIAL_PAGES[id].name}
						</div>
						<svelte:component this={SPECIAL_PAGES[id].component} />
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
		<div class="w-[700px] border-r overflow-auto" style="max-height: 100vh;">
			{#if Object.keys(SPECIAL_PAGES).includes($idStore[0])}
				<svelte:component this={SPECIAL_PAGES[$idStore[0]].component} />
			{:else if documentIds[0] in api.documents}
				<div class="markdown">
					<Document document={api.documents[$idStore[0]]} {views} />
				</div>
			{/if}
		</div>
	{/if}
	<!-- 	<div class="markdown overflow-scroll w-full lg:w-[700px]" style="height: 100vh;" /> -->
</div>

<style>
	.test {
		overflow: visible;
	}
</style>
