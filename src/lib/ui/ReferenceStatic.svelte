<script lang="ts">
	import type { HTTPDocumentLoader } from '$lib/documentloader';

	import { ctxLoader } from '$lib/viewers/store';
	import { getContext } from 'svelte';

	export let documentId: string;
	export let reftype: string;
	export let className: string = '';

	const loader: HTTPDocumentLoader = getContext(ctxLoader);
</script>

<a href={loader.getHref(documentId)} class="reference {reftype} {className}">
	<slot />
</a>
