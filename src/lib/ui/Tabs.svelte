<script lang="ts">
	interface TabContent {
		title: string;
		props: any;
		component: any;
	}
	export let contents: TabContent[];
	export let selected: number = 0;
</script>

<div class="tabs">
	<div class="tabsheader">
		{#each contents as content, i}
			<span class:selected={selected == i} on:click={(e) => (selected = i)}>{content.title}</span>
		{/each}
	</div>
	<div class="tab">
		<svelte:component this={contents[selected].component} {...contents[selected].props} />
	</div>
</div>
