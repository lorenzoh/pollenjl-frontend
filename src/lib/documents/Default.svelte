<script lang="ts">
	import type { IDocumentNode } from '$lib/documents/types';

	export let document: IDocumentNode;
	const doc = document;
	const cls = doc.attributes.class === undefined ? '' : doc.attributes.class;
	const style = doc.attributes.style === undefined ? '' : doc.attributes.style;

	const SPAN_TAGS = ['julia', 'using', 'dot', 'newline_ws'];
	const HTML_TAGS = ["DOCTYPE", "a", "abbr", "acronym", "address", "applet", "area", "article", "aside", "audio", "b", "base", "basefont", "bdi", "bdo", "big", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "font", "footer", "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hr", "html", "HTMLFormat", "i", "iframe", "img", "input", "ins", "kbd", "label", "legend", "li", "link", "main", "map", "mark", "meta", "meter", "nav", "noframes", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "small", "source", "span", "strike", "strong", "style", "sub", "summary", "sup", "svg", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]
</script>

{#if ['comment', 'admonition', 'admonitionbody', 'admonitiontitle', 'codeoutput', 'coderesult', 'codecell', 'codeinput', 'md'].includes(doc.tag)}
	<div class="{doc.tag}" {style}><slot /></div>
{:else if  ['br', 'hr'].includes(doc.tag)}
	<svelte:element this={doc.tag} {style} class={cls}/>
{:else if HTML_TAGS.includes(doc.tag)}
	<svelte:element this={doc.tag}><slot /></svelte:element>
{:else}<span class="{doc.tag}"><slot /></span>
{/if}

