<!--
  @component

  The header part of the page. This includes
  - a project icon and title
  - a search bar to navigate to pages
  - a version switcher (TODO)
  - a document index for quick navigation (mobile size only)
-->
<script lang="ts">
	import { getContext } from 'svelte';
	import LogoGithub32 from 'carbon-icons-svelte/lib/LogoGithub32';

	import LinkTree from '$lib/ui/linktree/LinkTree.svelte';
	import SearchWidget from '$lib/search/SearchWidget.svelte';

	import { BASE, CORPUSURL, REPONAME, REPOURL } from '$lib/config';
	import { ctxIsInteractive } from '$lib/viewers/store';

	const linkdata = {
		kind: 'list',
		children: [
			{
				name: 'Tutorials',
				kind: 'group',
				opened: true,
				children: [
					{ name: 'Basic tutorial', link: '#', kind: 'link' },
					{ name: 'Much more advanced tutorial with a really long name', link: '#', kind: 'link' }
				]
			},
			{
				name: 'Tutorials',
				kind: 'group',
				children: [
					{ name: 'Basic tutorial', link: '#', kind: 'link' },
					{ name: 'Much more advanced tutorial with a really long name', link: '#', kind: 'link' },
					{
						name: 'Tutorials',
						kind: 'group',
						children: [
							{ name: 'Basic tutorial', link: '#', kind: 'link' },
							{
								name: 'Much more advanced tutorial with a really long name',
								link: '#',
								kind: 'link'
							}
						]
					},
					{ name: 'Much more advanced tutorial with a really long name', link: '#', kind: 'link' }
				]
			}
		]
	};

	export let documentId: string = '';

	const isInteractive = getContext(ctxIsInteractive) ? true : false;
	const doLink = isInteractive ? false : true;
</script>

<div class="header flex flex-col sticky h-full p-4">
	<span class="name content-center text-2xl mb-4">
		{#if isInteractive}
			<a href={`${BASE}/interactive`}>{REPONAME}</a>
		{:else}
			<a href={`${BASE}/docs`}>{REPONAME}</a>
		{/if}
	</span>

	<div class="group">
		<div class="grouptitle">Search</div>
		<SearchWidget
			documentsURL={CORPUSURL}
			on:resultSelected
			link={doLink}
			style="width: 100%; flex-grow: 3"
		/>
	</div>

	<div class="group">
		<div class="grouptitle">Index</div>
		<LinkTree data={linkdata} />
	</div>

	<!-- On the static page, a link to open the currrent document in the interactive viewer is shown -->
	{#if !isInteractive}
		<div class="group">
			<div class="grouptitle">This page</div>
				<a class="linktointeractive" href={`${BASE}/interactive?id=${documentId}`}
					>Open in interactive viewer</a
				>
		</div>
	{/if}
	<!-- On the interactive page, we instead show the open tabs and allow the user to modify them. -->
	{#if isInteractive}
			<div class="group">
				<div class="grouptitle">Open tabs</div>
			</div>
	{/if}

	<div class="group">
		<div class="grouptitle">Links</div>
		<a href={REPOURL}>
			<LogoGithub32 />
		</a>
	</div>
</div>

<style>
	.group {
		@apply mb-6 flex flex-col;
	}

	.grouptitle {
		@apply text-sm text-gray-400 border-b-2 border-gray-200 mb-2;
		border-bottom-width: 1px
	}

	.linktointeractive {
		@apply border-bluegray-200 text-bluegray-500  bg-bluegray-100 border-2 p-1 rounded-lg text-center w-full;
	}
	.linktointeractive:hover {
		@apply border-bluegray-300 text-bluegray-700 bg-bluegray-200;
	}
</style>
