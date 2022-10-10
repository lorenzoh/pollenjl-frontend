<!--
  @component

  Does things
-->
<script lang="ts">
	import { CtxPollen, type AppContext } from '$lib/context';
	import { getContext } from 'svelte';


	import type { IDocumentNode } from '../types';

	export let document: IDocumentNode;

	const attrs = document.attributes;
	const appContext: AppContext = getContext(CtxPollen);

	// TODO: update to new internals
	let src ='';
	src = attrs.src.startsWith("http") ? attrs.src : `${appContext.config.urls.data}/${attrs.src}`
</script>

<img src={src} alt={attrs.alt} />
<slot />