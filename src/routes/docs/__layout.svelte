<script lang="ts">
	import { goto } from '$app/navigation';

	import { BASE } from '$lib/config';
	import Header from '$lib/page/Header.svelte';
	import LinkTree from '$lib/ui/linktree/LinkTree.svelte';

	//import SearchWidget from '$lib/search/SearchWidget.svelte';
	const linkdata = {
		kind: 'list',
		children: [
			{
				name: 'Tutorials',
				kind: 'group',
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
					{ name: 'Much more advanced tutorial with a really long name', link: '#', kind: 'link' }
				]
			}
		]
	};

	const links = [];

	const handleSearchSelect = (e) => {
		goto(`${BASE}/docs/${e.detail}`);
	};
</script>

<div class="flex flex-col page">
	<Header />
	<div class="flex flex-row ">
		<div class="gutter mt-8 p-2">
			<LinkTree data={linkdata} />
		</div>
		<div class="content h-max pl-2 pr-2 mt-6">
			<slot />
		</div>
		<div class="gutter">1</div>
	</div>
</div>

<style>
	.longtext {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.gutter {
		max-width: 250px;
		@apply flex-grow;
	}
	.page {
		max-width: 1100;
		@apply flex-grow;
	}

	.content {
		max-width: 650px;
		min-width: 650px;
	}
</style>
