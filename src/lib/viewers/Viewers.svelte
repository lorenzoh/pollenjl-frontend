<script lang="ts">
import type { IViewerData } from './types';

	import Viewer from './Viewer.svelte';


	export let viewerdatas: IViewerData[];
</script>

{#each viewerdatas as data}
	<Viewer data={data.data} kind={data.kind} />
{/each}
