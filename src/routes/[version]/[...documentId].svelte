<script context="module" lang="ts">
	export const prerender = true;
	export const hydrate = true;
	export const router = false;

	import { base } from '$app/paths';
	import { TAGS } from '$lib/config';
	import type { ProjectConfig } from '$lib/config';

	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ params, fetch }) {
		let { version, documentId } = params;
		let loader;
		if (dev) {
			loader = new HTTPDocumentLoader(base, version, 'http://127.0.0.1:8000');
		} else {
			loader = new HTTPDocumentLoader(base, version);
		}
		console.log(loader)
		loader.fetch = fetch;
		loader.attributes = await loader.load('attributes');
		const config: ProjectConfig = (await loader.load('config')) as unknown as ProjectConfig;
		documentId = documentId ? documentId : config.defaultDocument;
		console.log(documentId);
		let props = { documentId, loader, config };

		documentId = documentId ? documentId : config.defaultDocument;

		console.log('Rendering:');
		console.log({ base, documentId, version });

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
import { dev } from '$app/env';

	export let error;
	export let documentId: string;
	export let loader: HTTPDocumentLoader;
	export let config: ProjectConfig;

	const document = loader.cache[documentId];
	setContext(ctxLoader, loader);
</script>

<svelte:head>
	<title>{config.title}</title>
</svelte:head>

{#if error}
	An error occured :( : {error}
{:else}
	<div class="flex lg:flex-row flex-col lg:sticky lg:h-full">
		<div class="gutter">
			<Header {documentId} {loader} {config} />
		</div>
		<div class="content h-max p-4 sm:w-full md:max-w-2xl">
			<div class="document {document.tag}">
				<Document {document} views={TAGS} />
			</div>
		</div>
	</div>
{/if}
