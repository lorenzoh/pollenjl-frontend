<script lang="ts">
	import CodeInline from '$lib/ui/CodeInline.svelte';
	import Reference from '$lib/ui/Reference.svelte';

	export let kind: string;
	export let module_id: string;
</script>

<p class="subtitle">
	<CodeInline>{kind}</CodeInline> defined in module <Reference
		documentId={`references/${module_id}`}
		reftype={'reference'}
		><CodeInline className="small">{module_id}</CodeInline>
	</Reference>
</p>
