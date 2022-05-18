<!--
  @component

  Does things
-->
<script lang="ts">
	import type { HTTPDocumentLoader } from '$lib/documentloader';
	import { ctxLoader } from '$lib/viewers/store';
	import { getContext, hasContext } from 'svelte';

	import type { IDocumentNode } from '../types';

	export let document: IDocumentNode;

	const attrs = document.attributes;

	const loader: HTTPDocumentLoader = hasContext(ctxLoader) ? getContext(ctxLoader) : null;

	let src ='';
	if (loader !== null) {
		src = attrs.src.startsWith("http") ? attrs.src : `${loader.dataPath}/${attrs.src}`
	}
</script>

<img src={src} alt={attrs.alt} />
<slot />