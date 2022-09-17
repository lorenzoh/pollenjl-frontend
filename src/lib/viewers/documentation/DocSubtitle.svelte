<script lang="ts">
	import CodeInline from '$lib/ui/CodeInline.svelte';
	import Reference from '$lib/ui/Reference.svelte';

	export let attributes;
	const {package_id, module_id, symbol_id, kind} = attributes
</script>

<p class="subtitle">
	<CodeInline>{kind}</CodeInline> defined in module <Reference
		documentId={`${package_id}/ref/${module_id}`}
		reftype={'reference'}
		><CodeInline className="small">{module_id}</CodeInline>
	</Reference>
</p>
