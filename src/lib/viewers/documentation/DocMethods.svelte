<script lang="ts">
	import CodeInline from '$lib/ui/CodeInline.svelte';
	import MethodReference from '$lib/ui/MethodReference.svelte';
	import FunctionMath20 from 'carbon-icons-svelte/lib/FunctionMath20';
	export let methods;
	export let package_id: string;
	export let symbol_id: string;

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
			{methods.length == 1 ? 'method' : 'methods'} for <CodeInline>{symbol_id}</CodeInline>:
		</p>
		<div class="methodlist">
			{#each methodssorted as method}
				<span>
					<MethodReference {package_id} {method} />
				</span>{/each}
		</div>
	</div>
</div>


<style>
	.methodlist {
		@apply m-2;
	}
</style>