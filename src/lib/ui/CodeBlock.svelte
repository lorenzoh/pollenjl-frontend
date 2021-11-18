<script lang="ts">
	export let startline = null;
	export let endline = null;

	let linenumbers = null;
	if (startline !== null && endline !== null) {
		linenumbers = Array.from(new Array(endline - startline + 1).keys()).map((x) => x + startline);
	}
</script>

<div class="container">
	{#if startline !== null && endline !== null}
		<pre class="linenumbers">
    <span class="linenumber">
{startline}
    </span>
</pre>
	{/if}
	<pre class="snd codeblock"><code><slot /></code></pre>
</div>

<style>
	.container {
		position: relative;
	}
	code {
		counter-reset: line-numbering;
	}
	.linenumbers {
		left: 0;
		position: absolute;
		z-index: 1;
	}
	span {
		user-select: none;
	}
	.snd {
		position: relative;
	}
</style>
