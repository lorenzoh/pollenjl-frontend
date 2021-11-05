<script context="module">
	export async function load({ page, fetch, session, stuff }) {
		//const url = '/api/symbols/bla.json';

		const url = `/pollendata/documents/${page.params.document}.json`;
		const res = await fetch(url);
		// Strategy: store document ids in context
		// have children references be able to add a document id
		// one doc is the base and is preloaded, any others are stored in context
		// and reflected as query parameters
		if (res.ok) {
			return {
				props: {
					data: await res.json(),
					query: page.query.toString()
				}
			};
		}

		return {
			status: res.status,
			error: new Error(`Could not load ${url}`)
		};
	}
</script>

<script>
	import Document from '$lib/documents/Document.svelte';
	import { getContext, setContext } from 'svelte';
	import { writable } from 'svelte/store';

	export let data;
	export let query;

	const docs = writable([])

</script>

{query}

<Document document={data} />
