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

	const shortName = kind == "module" ? name : name.slice(module_id.length+1)
</script>

<h1 class="docheader">
	{#if !(ispublic || (kind == "module"))}<code class="modulename textbg">.{module_id}</code>{/if}<span
		 class="grow" ><code class="symbolname">{shortName}</code></span
	>

	<span class="icon">
		<svelte:component this={icons[kind]} style="fill: gray; display: inline;" />
	</span>
</h1>

<style>
	.docheader {
		@apply flex flex-row font-normal max-w-full items-center;
		width: 100%;
	}

	.modulename {
		flex-shrink: 2;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		direction: rtl;
	}
	.symbolname {
		@apply max-w-fit;
	}
	.grow {
		@apply flex-grow;
	}

	.icon {
		@apply float-right ml-2 ;
		display: inline;
	}
</style>
