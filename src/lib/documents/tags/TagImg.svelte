<!--
  @component

  Does things
-->
<script lang="ts">
	import { ctxLoader } from '$lib/viewers/store';
	import { getContext, hasContext } from 'svelte';

	import type { IDocumentNode } from '../types';

	export let document: IDocumentNode;

	const attrs = document.attributes;

	let loader
	// TODO: update to new internals
	let src ='';
	if (loader !== null) {
		src = attrs.src.startsWith("http") ? attrs.src : `${loader.dataPath}/${attrs.src}`
	}
</script>

<img src={src} alt={attrs.alt} />
<slot />