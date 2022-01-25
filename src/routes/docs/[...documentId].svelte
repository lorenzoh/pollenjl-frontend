<script context="module" lang="ts">
	export const prerender = true;
	export const router = false;

	import { DEFAULTDOC, STATICTAGS } from '$lib/config';
	import type { IDocumentNode } from '$lib/documents/types';
	import { getDocumentUrl } from '$lib/pollen';

	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ params, fetch }) {
		let documentId = params.documentId;
		documentId = documentId ? documentId : DEFAULTDOC;

		let props = { documentId };
		await fetch(getDocumentUrl(documentId)).then(async (res) => {
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

	export let document = null;
	export let documentId: string;
	export let status = null;
</script>

{#if status != 200}
	An error occured :( . Status code {status}
{:else}
	<div class="flex flex-row">
		<div class="gutter">
			<Header {documentId} />
		</div>
		<div class="content h-max p-4">
			<div class="document {document.tag}">
				<Document {document} views={STATICTAGS} />
			</div>
		</div>
	</div>
{/if}

<style>
	.gutter {
		min-width: 300px;
		max-width: 300px;
		@apply sticky overflow-auto border-gray-300;
		top: 0;
		height: 100vh;
		@apply border-gray-300;
		border-right-width: 1px;
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
