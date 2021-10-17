<script lang="ts">
	import CodeInline from '$lib/ui/CodeInline.svelte';
	import type { IViewerFunctionData } from '../types';
	import Expandable from '$lib/ui/Expandable.svelte';
	import Document from '$lib/documents/Document.svelte';
	import MethodReference from '$lib/ui/MethodReference.svelte';

	export let data: IViewerFunctionData;
	data.methods.sort((a, b) => (a.file < b.file ? -1 : 1));

	let nmethods = data.methods.length;
</script>

<div class="viewer functionviewer">
	<h1>
		<code>
			<span class="modulename textbg">{data.module_id}.</span><span class="symbolname"
				>{data.name}</span
			>
			<span class="kind textbg">function</span>
		</code>
	</h1>
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
</style>
