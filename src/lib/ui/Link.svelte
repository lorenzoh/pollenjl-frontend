<script lang="ts">
	import { ctxIsInteractive } from '$lib/viewers/store';
	import { getContext } from 'svelte';

	const isInteractive: boolean = getContext(ctxIsInteractive) ? true : false;
</script>

{#if isInteractive}
	<!-- content here -->
{:else}

{/if}
