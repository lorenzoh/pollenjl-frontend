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
</script>

<img src={`${loader.dataPath}/${attrs.src}`} alt={attrs.alt} />
