<script lang="ts">
import CodeInline from '$lib/ui/CodeInline.svelte';

	export const name: string = "";
	export let kind: string;
	export let module_id: string;
</script>

<p class="subtitle">
	<CodeInline>{kind}</CodeInline> defined in module <CodeInline>{module_id}</CodeInline>
</p>
