<!--
  @component

  The header part of the page. This includes
  - a project icon and title
  - a search bar to navigate to pages
  - a version switcher (TODO)
  - a document index for quick navigation (mobile size only)
-->
<script lang="ts">
	import LogoGithub24 from 'carbon-icons-svelte/lib/LogoGithub24';

	import LinkTree from '$lib/ui/linktree/LinkTree.svelte';
	import SearchWidget from '$lib/search/SearchWidget.svelte';

	import { DEFAULTDOC, REPONAME, REPOURL } from '$lib/config';
	import OpenTabs from './OpenTabs.svelte';

	import type { ViewerController } from '$lib/viewers/controller';
	import Menu24 from 'carbon-icons-svelte/lib/Menu24';
	import Close24 from 'carbon-icons-svelte/lib/Close24';
	import { slide } from 'svelte/transition';
	import type { HTTPDocumentLoader } from '$lib/documentloader';

	export let documentId: string;
	export let viewcontrol: ViewerController | null = null;
	export let isInteractive: boolean = false;
	export let loader: HTTPDocumentLoader;

	const doLink: boolean = isInteractive ? false : true;
	let opened = true;
	let isToggled = false;

	let menuElem: Element;
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
			<a href={loader.getHref(DEFAULTDOC, isInteractive)}>{REPONAME}</a>
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
				documentsURL={loader.getDataHref('documents')}
				on:resultSelected
				link={doLink}
				style="width: 100%; flex-grow: 3"
			/>
		</div>

		<div class="group">
			<div class="grouptitle">Pages</div>
			{#if loader.hasDocument('linktree')}
				<div class="ml-1 mr-1">
					<LinkTree data={loader.get('linktree')} {isInteractive} {viewcontrol} />
				</div>
			{:else}
				{#await loader.load('linktree')}
					<div class="text-xs text-gray-500">Loading...</div>
				{:catch error}
					<div class="text-xs text-gray-500">
						Error loading the index :( {error}
					</div>
				{/await}
			{/if}
		</div>

		<!-- On the interactive page, we instead show the open tabs and allow the user to modify them. -->
		{#if viewcontrol}
			<div class="group">
				<div class="grouptitle">Open tabs</div>
				<OpenTabs {viewcontrol} />
			</div>
		{/if}

		<!-- On the static page, a link to open the currrent document in the interactive viewer is shown -->
		{#if !isInteractive}
			<div class="flex-col hidden md:flex group">
				<div class="grouptitle">This page</div>
				<a class="linktointeractive" href={loader.getHref(documentId, true)}
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
