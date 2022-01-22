<script lang="ts">
	import { goto } from '$app/navigation';

	import { BASE } from '$lib/config';
	import Header from '$lib/page/Header.svelte';
	import LinkTree from '$lib/ui/linktree/LinkTree.svelte';

	//import SearchWidget from '$lib/search/SearchWidget.svelte';

	const links = [];

	const handleSearchSelect = (e) => {
		goto(`${BASE}/docs/${e.detail}`);
	};
</script>

<div class="flex flex-row">
	<div class="gutter">
		<Header />
	</div>
	<div class="content h-max p-4">
		<slot />
	</div>
</div>

<style>
	.longtext {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.gutter {
		max-width: 300px;
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
