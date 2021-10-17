<script lang="ts">
	export let maxheight: string = '300px';
	export let open: boolean = true;
</script>

<div class="expandable" class:open>
	<slot />
</div>

<style>
	.expandable {
		max-height: 300px;
    overflow: scroll;
	}
	.open {
		max-height: none;
	}
</style>
