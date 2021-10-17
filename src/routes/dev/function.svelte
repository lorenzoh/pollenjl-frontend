<script lang="ts">
	import ViewerFunction from '$lib/viewers/documentation/ViewerFunction.svelte';
	import data from './function.json';
	import type { IViewerFunctionData } from '$lib/viewers/types';
	const data_ = data as unknown as IViewerFunctionData;
</script>

<div class="container">
	<ViewerFunction data={data_} />
</div>


<style>
	.container {
		width: 70ch;
	}
	

</style>
