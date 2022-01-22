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

	//export let documentId: string = null;
	export let document = null;
	export let status = null;
</script>

{#if status != 200}
	An error occured :( . Status code {status}
{:else}
	<div class="document {document.tag}">
		<Document {document} views={STATICTAGS} />
	</div>
{/if}
