<script lang="ts">
	export let startline = null;
	export let endline = null;
	export let cls = '';

	let linenumbers = null;
	if (startline !== null && endline !== null) {
		linenumbers = Array.from(new Array(endline - startline + 1).keys()).map((x) => x + startline);
	}
</script>

{#if startline !== null && endline !== null}
	<div class="container">
		<pre class="linenumbers">
    <span class="linenumber">
{startline}
    </span>
</pre>
		<pre class="snd codeblock {cls}"><code><slot /></code></pre>
	</div>
{:else}
	<pre class="codeblock {cls}"><code><slot /></code></pre>
{/if}

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
