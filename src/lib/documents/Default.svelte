<script lang="ts">
	import type { IDocumentNode } from '$lib/documents/types';
	import { set_attributes } from 'svelte/internal';

	export let document: IDocumentNode;
	const doc = document;
	const cls = doc.attributes.class === undefined ? '' : doc.attributes.class
</script>

{#if doc.tag == 'div'}
	<div class={cls} style={doc.attributes.style}><slot /></div>
{:else if doc.tag == 'a'}
	<a class={cls} href={doc.attributes?.href}><slot /></a>
{:else if doc.tag == 'h1'}
	<h1 class={cls}><slot /></h1>
{:else if doc.tag == 'h2'}
	<h2 class={cls}><slot /></h2>
{:else if doc.tag == 'h3'}
	<h3 class={cls}><slot /></h3>
{:else if doc.tag == 'h4'}
	<h4 class={cls}><slot /></h4>
{:else if doc.tag == 'body'}
	<article class={cls}><slot /></article>
{:else if doc.tag == 'pre'}
	<pre class={cls}><slot /></pre>
{:else if doc.tag == 'code'}
	<code class={cls}><slot /></code>
{:else if doc.tag == 'ul'}
	<ul class={cls}><slot /></ul>
{:else if doc.tag == 'ol'}
	<ol class={cls}><slot /></ol>
{:else if doc.tag == 'li'}
	<li class={cls}><slot /></li>
{:else if doc.tag == 'p'}
	<p class={cls}><slot /></p>
{:else if doc.tag == 'table'}
	<table class={cls}><slot /></table>
{:else if doc.tag == 'tr'}
	<tr class={cls}><slot /></tr>
{:else if doc.tag == 'td'}
	<td class={cls}><slot /></td>
{:else if doc.tag == 'span'}
	<span class={cls}><slot /></span>
{:else if doc.tag == 'em'}
	<em class={cls}><slot /></em>
{:else if doc.tag == 'blockquote'}
	<blockquote class={cls}><slot /></blockquote>
{:else if doc.tag == 'th'}
	<th class={cls}><slot /></th>
{:else if doc.tag == 'br'}
	{' '}
{:else if doc.tag == 'strong'}
	<strong class={cls}><slot /></strong>
{:else if doc.tag == 'article'}
	<article class={cls}><slot /></article>
{:else if [
	'comment', 'admonition', 'admonitionbody', 'admonitiontitle',
	'codeoutput', 'coderesult', 'codecell', 'codeinput', 'md'].includes(doc.tag)}
	<div class="{doc.tag} {cls}"><slot /></div>
{:else}
	<span class="{doc.tag} {cls}"
		><slot /></span
	>
{/if}
