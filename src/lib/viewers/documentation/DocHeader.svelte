<script lang="ts">
	export let ispublic: boolean;
	export let module_id: string;
	export let name: string;
</script>

<h1 class="docheader">
	<code>
		{#if !ispublic}<span class="modulename textbg">{module_id}.</span>{/if}<span class="symbolname"
			>{name}</span
		>
	</code>
</h1>
