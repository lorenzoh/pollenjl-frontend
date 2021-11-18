<script lang="ts">
	import CodeInline from '$lib/ui/CodeInline.svelte';
	import MethodReference from '$lib/ui/MethodReference.svelte';
	import type { IMethodData } from '../types';

	export let methods: IMethodData[];
	export let name: string;

	const methodssorted = methods.slice().sort((a, b) => (a.file < b.file ? -1 : 1));
</script>

<div class="methods">
	<h2>Methods</h2>
	<p>
		There {methods.length == 1 ? 'is' : 'are'}
		{methods.length}
		{methods.length == 1 ? 'method' : 'methods'} for <CodeInline>{name}</CodeInline>:
	</p>
	<ul class="methodlist">
		{#each methodssorted as method}
			<li>
				<MethodReference signature={method.signature} file={method.file} line={method.line} />
			</li>{/each}
	</ul>
</div>
