<script lang="ts">
	import ContainerServices32 from 'carbon-icons-svelte/lib/ContainerServices32';
	import Code32 from 'carbon-icons-svelte/lib/Code32';

	export let ispublic: boolean;
	export let module_id: string;
	export let name: string;
	export let kind: string;

	const icons = {
		function: Code32,
		const: Code32,
		struct: Code32,
		'abstract type': Code32,
		module: ContainerServices32
	};
</script>

<h1 class="docheader">
	<code>
		{#if !ispublic}<span class="modulename textbg">{module_id}.</span>{/if}<span class="symbolname"
			>{name}</span
		>

		<span class="icon">
			<svelte:component this={icons[kind]} style="fill: gray; display: inline;" />
		</span>
	</code>
</h1>

<style>
	.docheader {
		@apply flex flex-row font-normal;
	}

	code {
		@apply flex-grow;
	}
	.icon {
		@apply flex-grow-0 float-right;
		display: inline;
	}
</style>
