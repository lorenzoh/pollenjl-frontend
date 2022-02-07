<!--
  @component

  The header part of the page. This includes
  - a project icon and title
  - a search bar to navigate to pages
  - a version switcher (TODO)
  - a document index for quick navigation (mobile size only)
-->
<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import LogoGithub24 from 'carbon-icons-svelte/lib/LogoGithub24';

	import LinkTree from '$lib/ui/linktree/LinkTree.svelte';
	import SearchWidget from '$lib/search/SearchWidget.svelte';

	import { BASE, CORPUSURL, DEFAULTDOC, LINKTREEURL, REPONAME, REPOURL } from '$lib/config';
	import { ctxIsInteractive, ctxVersion } from '$lib/viewers/store';
	import OpenTabs from './OpenTabs.svelte';

	import { ctxViewControlStore } from '$lib/viewers/store';
	import type { ViewerController } from '$lib/viewers/controller';
	import type { Readable } from 'svelte/store';
	import Menu24 from 'carbon-icons-svelte/lib/Menu24';
	import Close24 from 'carbon-icons-svelte/lib/Close24';
	import { slide } from 'svelte/transition';
	import type { ITree } from '$lib/ui/linktree/types';
	import { getCorpusUrl, getDocumentHref, getDocumentHrefInteractive, getLinkTreeUrl } from '$lib/urls';
	const s_viewcontrol: Readable<ViewerController> = getContext(ctxViewControlStore);

	export let documentId: string = '';

	const version: string = getContext(ctxVersion);
	const isInteractive: boolean = getContext(ctxIsInteractive) ? true : false;
	const doLink: boolean = isInteractive ? false : true;
	let opened = true;
	let isToggled = false;

	async function loadLinkTree(url) {
		const r = await fetch(url);
		if (r.ok) {
			return r.json();
		}
	}
	let linkTreeData: Promise<ITree> = Promise.resolve({
		kind: 'group',
		children: [],
		link: '#',
		name: 'not_loaded'
	});
	let menuElem: Element;

	onMount(() => {
		linkTreeData = loadLinkTree(getLinkTreeUrl(version));
	});
</script>

<!-- Header styles: (1) class for external styling (2) mobile styles (3) desktop styles -->
<div
	class="
		header border-gray-200
		flex flex-col w-full border-b-[1px]
		lg:sticky lg:top-0 lg:w-72 lg:[min-width:18rem;] lg:max-h-screen lg:min-h-screen lg:h-screen lg:border-b-0 lg:border-r-[1px]"
>
	<div class="title flex flex-row items-center p-3">
		<span class="name content-center text-xl flex-grow">
			{#if isInteractive}
				<a href={getDocumentHrefInteractive(version, DEFAULTDOC)}>{REPONAME}</a>
			{:else}
				<a href={getDocumentHref(version, DEFAULTDOC)}>{REPONAME}</a>
			{/if}
		</span>
		<span
			class="openmenu cursor-pointer flex lg:hidden"
			on:click={() => {
				if (menuElem) {
					isToggled = true;
					if (menuElem.style.display !== 'block') {
						opened = true;
						menuElem.style.display = 'block';
					} else {
						opened = false;
						menuElem.style.display = 'none';
					}
				}
			}}
		>
			{#if opened && isToggled}
				<Close24 />
			{:else}
				<Menu24 />
			{/if}
		</span>
	</div>

	<div
		class="
		menu p-3  
		flex-col hidden [box-shadow:inset_0_0_8px_rgba(0,0,0,.1)] border-t-[1px]
		lg:flex lg:[box-shadow:none] lg:border-t-0
		"
		bind:this={menuElem}
		transition:slide
	>
		<div class="group">
			<div class="grouptitle">Search</div>
			<SearchWidget
				documentsURL={getCorpusUrl(version)}
				on:resultSelected
				link={doLink}
				style="width: 100%; flex-grow: 3"
			/>
		</div>

		<div class="group">
			<div class="grouptitle">Pages</div>
			{#await linkTreeData}
			<div class="text-xs text-gray-500">Loading...</div>
			{:then data}
				<LinkTree {data} />
			{:catch error}
				<div class="text-xs text-gray-500">
					Error loading the index :( {error}
				</div>
			{/await}
		</div>

		<!-- On the interactive page, we instead show the open tabs and allow the user to modify them. -->
		{#if $s_viewcontrol}
			<div class="group">
				<div class="grouptitle">Open tabs</div>
				<OpenTabs viewcontrol={$s_viewcontrol} />
			</div>
		{/if}

		<!-- On the static page, a link to open the currrent document in the interactive viewer is shown -->
		{#if !isInteractive}
			<div class="flex-col hidden md:flex">
				<div class="grouptitle">This page</div>
				<a class="linktointeractive" href={getDocumentHrefInteractive(version, documentId)}
					>Open in interactive viewer</a
				>
			</div>
		{/if}
		<div class="group">
			<div class="grouptitle">Links</div>
			<a href={REPOURL} class="text-gray-600 hover:text-gray-900">
				<LogoGithub24 />
			</a>
		</div>
	</div>
</div>

<style>
	.group {
		@apply mb-6 flex flex-col;
	}
	.grouptitle {
		@apply text-sm text-gray-500 border-b-2 border-gray-200 mb-2;
		border-bottom-width: 1px;
	}

	.linktointeractive {
		@apply border-bluegray-200 text-bluegray-500  bg-bluegray-100 border-2 p-1 rounded-lg text-center w-full;
	}
	.linktointeractive:hover {
		@apply border-bluegray-300 text-bluegray-700 bg-bluegray-200;
	}
</style>
