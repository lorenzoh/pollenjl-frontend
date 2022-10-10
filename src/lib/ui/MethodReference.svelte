<script lang="ts">
	import type { MethodInfo } from '$lib/types';
	import Reference from '$lib/ui/Reference.svelte';

	import CodeInline from './CodeInline.svelte';
	import SourceFile from './SourceFile.svelte';

	export let package_id: string;
	export let method: MethodInfo;
	const { signature, file, line } = method;
</script>

<div class="container methodreference">
<!-- 	<div class="signature">
		<span>
			<CodeInline>
				{signature}
			</CodeInline>
		</span>
	</div> -->

	<span class="file">
		<Reference documentId={`${package_id}/src/${file}`} reftype="sourcefile">
			<SourceFile {file} {line} />
		</Reference>
	</span>
</div>

<style>
	.container {
		display: flex;
		/*justify-content: space-between;*/
		align-items: center;
		line-height: 1.6;
	}
	.signature {
		@apply font-mono text-xs;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.signature span {
		white-space: pre;
	}
	.file {
		@apply pl-0;
		white-space: pre;
		align-self: flex-start;
	}
</style>
