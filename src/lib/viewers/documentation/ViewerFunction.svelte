<script lang="ts">
	import CodeInline from '$lib/ui/CodeInline.svelte';
	import type { IViewerFunctionData } from '../types';
	import Expandable from '$lib/ui/Expandable.svelte';
	import Document from '$lib/documents/Document.svelte';
	import MethodReference from '$lib/ui/MethodReference.svelte';
	import Code from '$lib/documents/tags/TagCode.svelte';

	export let data: IViewerFunctionData;
	data.methods.sort((a, b) => (a.file < b.file ? -1 : 1));

	let nmethods = data.methods.length;
</script>

<div class="viewer documentation function">
	<h1>
		<code>
			<span class="modulename textbg">{data.module_id}.</span><span class="symbolname"
				>{data.name}</span
			>
		</code>
	</h1>
	<p class="subtitle">
		<Code>{data.symbol_id}</Code> is a <Code>function</Code> defined in module <Code
			>{data.module_id}</Code
		>.
	</p>
	<h2>Documentation</h2>
	<div class="docstring">
		<Document document={data.documentation} />
	</div>

	<div class="methods">
		<h2>Methods</h2>
		<p>
			There are {nmethods}
			{nmethods == 1 ? 'method' : 'methods'} for <CodeInline>{data.name}</CodeInline>:
		</p>
		<Expandable>
			<ul>
				{#each data.methods as method}
					<li>
						<MethodReference {...method} />
					</li>{/each}
			</ul>
		</Expandable>
	</div>
</div>

<style>
	.kind {
		float: right;
	}

	.subtitle {
		@apply italic;
	}
</style>
