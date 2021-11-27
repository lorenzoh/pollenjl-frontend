<script lang="ts">
	import { documents } from '$lib/search';
	import lunr from 'lunr';
	import SearchWidget from '$lib/search/SearchWidget.svelte';

	const index = lunr(function () {
		this.ref('id');
		this.field('title');
		this.field('text');
		documents.forEach(function (doc) {
			this.add(doc);
		}, this);
	});

	const documentData = Object.fromEntries(documents.map(doc => [doc.id, doc]))

	let results: any[];
</script>

<div class="container">
	<SearchWidget {index} bind:results {documentData} />
</div>

<style>
	.container {
		@apply bg-gray-100 p-16;
	}
</style>
