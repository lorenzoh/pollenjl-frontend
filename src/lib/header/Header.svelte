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
	import Menu24 from 'carbon-icons-svelte/lib/Menu24';
	import Close24 from 'carbon-icons-svelte/lib/Close24';

	import LinkTree from '$lib/ui/linktree/LinkTree.svelte';
	import OpenTabs from '../page/OpenTabs.svelte';
	import VersionSwitcher from '../page/VersionSwitcher.svelte';

	import Key from '$lib/ui/Key.svelte';
	import { useOs } from '@svelteuidev/composables';
	import { goto } from '$app/navigation';
	import { Group, Switch, Tooltip } from '@svelteuidev/core';
	import type { AppContext } from '$lib/context';
	import { subscribeHref } from '$lib/navigation';
	import HeaderGroup from './HeaderGroup.svelte';
	import { slide } from 'svelte/transition';

	// App context
	export let appContext: AppContext;
	const { docindex, versions } = appContext.data;
	const { version } = appContext.config;
	const { multiColumn, preferMultiColumn } = appContext.stores;
	const config = appContext.data.versions[appContext.config.version];

	// State
	let opened = true;
	let isToggled = false;
	let menuElem: Element;
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
</script>

<!-- Header styles: (1) class for external styling (2) mobile styles (3) desktop styles -->
<div
	class="
		header border-gray-300 bg-gray-50
		flex flex-col w-full border-b

		sticky lg:top-0 lg:w-72 lg:[min-width:18rem;] lg:max-h-full lg:overflow-y-auto lg:overflow-x-clip
		lg:min-h-screen lg:h-screen lg:border-b-0 lg:border-r-[1px]"
>
	<div class="title flex flex-row items-center p-3 h-14">
		<span class="name content-center text-2xl flex-grow font-bold">
			<a href={`${appContext.config.urls.base}/${config.defaultDocument}.html`}>{config.title}</a>
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
		<HeaderGroup divider={false}>
			<div
				class="bg-gray-50 border-gray-200 text-gray-500  px-2 py-1 border rounded-md cursor-pointer
				flex flex-row items-center select-none
				hover:text-bluegray-700 hover:border-bluegray-300 hover:bg-bluegray-100
				"
				on:click={openSearch}
			>
				<Search20 style="fill:gray; display:inline" />
				<span class="grow px-2">Search</span>
				{#if useOs() == 'macos'}<Key>⌘</Key>{:else}<Key>Ctrl</Key>{/if}+<Key>K</Key>
			</div>
		</HeaderGroup>
		<HeaderGroup title="Pages" divider={false}>
			<div class="ml-1 mr-1">
				<LinkTree {docindex} data={config.linktree} />
			</div>
		</HeaderGroup>
		<HeaderGroup>
			<div slot="title">
				<Group align="center" position="apart">
					<span>Opened panes</span>
					<Tooltip
						label="Toggle Sliding Panes mode"
						class="text-sm font-normal normal-case"
						withArrow
						placement="center"
					>
						<Switch size="xs" bind:checked={$preferMultiColumn} />
					</Tooltip>
				</Group>
			</div>
			{#if $multiColumn}
				<OpenTabs {appContext} />
			{:else}
				<span transition:slide class="px-2 text-sm text-gray-500 select-none"
					>Sliding panes disabled</span
				>
			{/if}
		</HeaderGroup>

		<HeaderGroup title="Versions">
			<VersionSwitcher {versions} {version} />
		</HeaderGroup>
		<HeaderGroup title="links">
			<a href={config.url} class="text-gray-600 hover:text-gray-900">
				<LogoGithub24 />
			</a>
		</HeaderGroup>
	</div>
</div>
