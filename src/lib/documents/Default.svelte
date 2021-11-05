<script lang="ts">
	import type { IDocumentNode } from '$lib/documents/types';

	export let document: IDocumentNode;
  const doc = document;
</script>

{#if doc.tag == 'div'}
	<div class={doc.attributes.class} style={doc.attributes.style}><slot /></div>
{:else if doc.tag == 'a'}
	<a href={doc.attributes?.href}><slot /></a>
{:else if doc.tag == 'h1'}
	<h1><slot /></h1>
{:else if doc.tag == 'h2'}
	<h2><slot /></h2>
{:else if doc.tag == 'h3'}
	<h3><slot /></h3>
{:else if doc.tag == 'h4'}
	<h4><slot /></h4>
{:else if doc.tag == 'body'}
	<article><slot /></article>
{:else if doc.tag == 'pre'}
	<pre class={doc.attributes.class}><slot /></pre>
{:else if doc.tag == 'code'}
	<code><slot /></code>
{:else if doc.tag == 'ul'}
	<ul><slot /></ul>
{:else if doc.tag == 'li'}
	<li><slot /></li>
{:else if doc.tag == 'p'}
	<p><slot /></p>
{:else if doc.tag == 'article'}
	<article><slot /></article>
{:else}
<div class="{doc.tag}"><slot /></div>
{/if}
