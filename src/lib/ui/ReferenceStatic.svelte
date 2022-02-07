<script lang="ts">
	import { getDocumentHref } from '$lib/urls';
	import { ctxVersion } from '$lib/viewers/store';
	import { getContext } from 'svelte';

	export let documentId: string;
	export let reftype: string;
	export let className: string = '';

	const version: string = getContext(ctxVersion) ? getContext(ctxVersion) : 'dev';
	const url = getDocumentHref(version, documentId);
</script>

<a href={url} class="reference {reftype} {className}">
	<slot />
</a>
