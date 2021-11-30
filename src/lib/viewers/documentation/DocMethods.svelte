<script lang="ts">
	import CodeInline from '$lib/ui/CodeInline.svelte';
	import MethodReference from '$lib/ui/MethodReference.svelte';
	import FunctionMath20 from 'carbon-icons-svelte/lib/FunctionMath20';
	import type { IMethodData } from '../types';

	export let methods: IMethodData[];
	export let name: string;

	const methodssorted = methods.slice().sort((a, b) => (a.file < b.file ? -1 : 1));
</script>

<div class="admonition methods note">
	<div class="admonitiontitle title">
		<FunctionMath20 class="icon" />Methods
	</div>
	<div class="admonitionbody">
		<p>
			There {methods.length == 1 ? 'is' : 'are'}
			{methods.length}
			{methods.length == 1 ? 'method' : 'methods'} for <CodeInline>{name}</CodeInline>:
		</p>
		<div class="methodlist">
			{#each methodssorted as method}
				<span>
					<MethodReference signature={method.signature} file={method.file} line={method.line} />
				</span>{/each}
		</div>
	</div>
</div>
