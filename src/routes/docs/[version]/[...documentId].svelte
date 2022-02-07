<script context="module" lang="ts">
	export const prerender = true;
	export const hydrate = true;
	export const router = false;

	import { DEFAULTDOC, REPONAME, STATICTAGS } from '$lib/config';
	import type { IDocumentNode } from '$lib/documents/types';
	import { getDocumentUrl } from '$lib/urls';

	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ params, fetch }) {
		let { version, documentId } = params;
		const url = getDocumentUrl(version, documentId);
		documentId = documentId ? documentId : DEFAULTDOC;

		let props = { documentId, version };
		await fetch(getDocumentUrl(version, documentId)).then(async (res) => {
			props['status'] = res.status;

			if (res.status == 200) {
				await res.json().then((document: IDocumentNode) => {
					props['document'] = document;
				});
			}
		});

		return {
			props
		};
	}
</script>

<script lang="ts">
	import Document from '$lib/documents/Document.svelte';
	import Header from '$lib/page/Header.svelte';
	import { setContext } from 'svelte';
	import { ctxVersion } from '$lib/viewers/store';

	export let document = null;
	export let documentId: string;
	export let status = null;
	export let version: string;

	setContext(ctxVersion, version);
</script>

<svelte:head>
	<title>{REPONAME}</title>
</svelte:head>

{#if status != 200}
	An error occured :( . Status code {status}
{:else}
	<div class="flex lg:flex-row flex-col lg:sticky lg:h-full">
		<div class="gutter">
			<Header {documentId} />
		</div>
		<div class="content h-max p-4 sm:w-full md:max-w-2xl">
			<div class="document {document.tag}">
				<Document {document} views={STATICTAGS} />
			</div>
		</div>
	</div>
{/if}

<style>
	.gutter {
		/*min-width: 300px;
		max-width: 300px;*/
		/*@apply overflow-auto border-gray-300;*/
	}
	.page {
		max-width: 1100;
		@apply flex-grow;
	}

	.content {
	}
</style>
