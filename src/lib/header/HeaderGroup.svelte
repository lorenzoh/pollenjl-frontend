<script>
	export let title = null;
	export let divider = true;
</script>

<div class:divider class="group">
	<hr class:divider>
	<div class="grouptitle">
		{#if title}
			{title}
		{:else}
			<slot name="title" />
		{/if}
	</div>
	<slot />
</div>

<style>
	.group {
		@apply mb-4 flex flex-col;
	}
	hr {
		@apply border-0;
	}

	hr.divider {
		@apply mb-6;
		border-width: 0.5px;
	}
	.grouptitle {
		@apply text-xs text-gray-600 font-bold uppercase mb-2 select-none;
	}
</style>
