<script context="module" lang="ts">
	export const prerender = true;
	export const hydrate = true;
	export const router = false;

	import { base } from '$app/paths';
	import { DEFAULTDOC, REPONAME, STATICTAGS } from '$lib/config';

	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ params, fetch }) {
		let { version, documentId } = params;
		documentId = documentId ? documentId : DEFAULTDOC;

		console.log({base, documentId, version})
		console.log('Rendering:')
		//const config: IConfig = await fetch('/config').then((r) => r.json());
		
		const loader = new HTTPDocumentLoader(base, version);
		loader.fetch = fetch;
		loader.attributes = await loader.load('attributes');
		loader.load('linktree');
		let props = { documentId, loader };

		return await loader
			.load(documentId)
			.then((_) => {
				props['error'] = false;
				return { props };
			})
			.catch((e) => {
				props['error'] = e;
				return { props };
			});
	}
</script>

<script lang="ts">
	import Document from '$lib/documents/Document.svelte';
	import Header from '$lib/page/Header.svelte';
	import { setContext } from 'svelte';
	import { ctxLoader } from '$lib/viewers/store';
	import { HTTPDocumentLoader } from '$lib/documentloader';

	export let error;
	export let documentId: string;
	export let loader: HTTPDocumentLoader;

	const document = loader.cache[documentId];
	setContext(ctxLoader, loader);
</script>

<svelte:head>
	<title>{REPONAME}</title>
</svelte:head>

{#if error}
	An error occured :( : {error}
{:else}
	<div class="flex lg:flex-row flex-col lg:sticky lg:h-full">
		<div class="gutter">
			<Header {documentId} {loader} />
		</div>
		<div class="content h-max p-4 sm:w-full md:max-w-2xl">
			<div class="document {document.tag}">
				<Document {document} views={STATICTAGS} />
			</div>
		</div>
	</div>
{/if}
