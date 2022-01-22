<!--
  @component

  The header part of the page. This includes
  - a project icon and title
  - a search bar to navigate to pages
  - a version switcher (TODO)
  - a document index for quick navigation (mobile size only)
-->
<script lang="ts">
	import LogoGithub32 from 'carbon-icons-svelte/lib/LogoGithub32';

	import SearchWidget from '$lib/search/SearchWidget.svelte';

	import { BASE, CORPUSURL, REPONAME, REPOURL } from '$lib/config';
	import LinkTree from '$lib/ui/linktree/LinkTree.svelte';

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
</script>

<div class="header flex flex-col  border-r-2 border-white p-4">
	<span class="name content-center text-2xl mb-4">
		<a href={`${BASE}/docs`} class="headername">
			{REPONAME}
		</a>
	</span>

	<div class="group">
		<div class="grouptitle">Search</div>
		<SearchWidget
			documentsURL={CORPUSURL}
			on:resultSelected}
			link
			style="width: 100%; flex-grow: 3"
		/>
	</div>

	<div class="group">
		<div class="grouptitle">Index</div>
		<LinkTree data={linkdata} />
	</div>

	<div class="group">
		<div class="grouptitle">Links</div>
		<a href={REPOURL}>
			<LogoGithub32 />
		</a>
	</div>
</div>

<style>
	.group {
		@apply mb-6;
	}

	.grouptitle {
		@apply text-sm text-gray-500 border-b-2 border-gray-100 mb-2 font-bold;
	}
</style>
