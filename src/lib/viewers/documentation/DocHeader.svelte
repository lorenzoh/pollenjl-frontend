<script lang="ts">
	import Code32 from 'carbon-icons-svelte/lib/Code32';

	export let ispublic: boolean;
	export let module_id: string;
	export let name: string;
</script>

<h1 class="docheader">
	<code>
		{#if !ispublic}<span class="modulename textbg">{module_id}.</span>{/if}<span class="symbolname"
			>{name}</span
		>

		<span class="icon">
			<Code32 style="fill: gray; display: inline;" />
		</span>
	</code>
</h1>

<style>
	.docheader {
		@apply flex flex-row;
	}

	code {
		@apply flex-grow;
	}
	.icon {
		@apply flex-grow-0 float-right;
		display: inline;
	}
</style>
