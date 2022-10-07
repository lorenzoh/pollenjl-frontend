<!--
  @component

  The header part of the page. This includes
  - a project icon and title
  - a search bar to navigate to pages
  - a version switcher (TODO)
  - a document index for quick navigation
-->
<script lang="ts">
	import LogoGithub24 from 'carbon-icons-svelte/lib/LogoGithub24';
	import Search20 from 'carbon-icons-svelte/lib/Search20';

	import LinkTree from '$lib/ui/linktree/LinkTree.svelte';
	import SearchWidget from '$lib/search/SearchWidget.svelte';

	import OpenTabs from './OpenTabs.svelte';

	import Menu24 from 'carbon-icons-svelte/lib/Menu24';
	import Close24 from 'carbon-icons-svelte/lib/Close24';
	import { dev } from '$app/environment';
	import { getContext } from 'svelte';
	import type { DocVersions } from '$lib/types';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import VersionSwitcher from './VersionSwitcher.svelte';
	import { Group, Kbd } from '@svelteuidev/core';
	import Key from '$lib/ui/Key.svelte';
	import { useOs } from '@svelteuidev/composables';

	export let attributes = {};
	export let versions: DocVersions;
	export let version: string;
	const config = versions[version];

	const urls = getContext('urls');
	const isMultiColumn = getContext('isMultiColumn');

	let opened = true;
	let isToggled = false;
	let menuElem: Element;
</script>

<!-- Header styles: (1) class for external styling (2) mobile styles (3) desktop styles -->
<div
	class="
		header border-gray-200 bg-gray-50
		flex flex-col w-full border-b

		lg:sticky lg:top-0 lg:w-72 lg:[min-width:18rem;] lg:max-h-full lg:overflow-y-auto lg:overflow-x-clip
		lg:min-h-screen lg:h-screen lg:border-b-0 lg:border-r-[1px]"
>
	<div class="title flex flex-row items-center p-3">
		<span class="name content-center text-2xl flex-grow font-bold">
			<a href={`${urls.base}/${config.defaultDocument}`}>{config.title}</a>
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
	>
		<div class="group">
			<div
				class="bg-gray-50 border-gray-200 text-gray-500  px-2 py-1 border rounded-md cursor-pointer
				flex flex-row items-center select-none
				hover:text-bluegray-700 hover:border-bluegray-300 hover:bg-bluegray-100
				"
			>
				<Search20 style="fill:gray; display:inline" />
				<span class="grow px-2">Search</span>
				{#if useOs() == 'macos'}<Key>⌘</Key>{:else}<Key>Ctrl</Key>{/if}+<Key>K</Key>
			</div>
		</div>
		<div class="group">
			<div class="grouptitle">Pages</div>
			<div class="ml-1 mr-1">
				<LinkTree {attributes} data={config.linktree} />
			</div>
		</div>

		<!-- On the interactive page, we show the open tabs and allow the user to modify them. -->
		{#if $isMultiColumn}
			<div class="group">
				<div class="grouptitle">Open tabs</div>
				<OpenTabs {attributes} />
			</div>
		{/if}

		<!-- On the static page, a link to open the currrent document in the interactive viewer is shown -->
		<!-- 		{#if !isInteractive}
			<div class="flex-col hidden md:flex group">
				<div class="grouptitle">This page</div>
				<a class="linktointeractive" href={loader.getHref(documentId, true)}
					>Open in interactive viewer</a
				>
			</div>
		{/if} -->
		<div class="group">
			<div class="grouptitle">Versions</div>
			<VersionSwitcher {versions} {version} />
		</div>
		<div class="group">
			<div class="grouptitle">Links</div>
			<a href={config.url} class="text-gray-600 hover:text-gray-900">
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
		@apply text-sm text-gray-800 border-b-2 border-gray-200 mb-2;
		border-bottom-width: 1px;
	}
</style>
