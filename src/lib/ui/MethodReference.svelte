<script lang="ts">
	import Reference from '$lib/ui/Reference.svelte';
	import { shortenfilenamekeepmodule } from '$lib/utils';

	import CodeInline from './CodeInline.svelte';
	import SourceFile from './SourceFile.svelte';

	export let signature: string;
	export let file: string;
	export let line: number;
</script>

<div class="container methodreference">
	<div class="signature">
		<span>
			<CodeInline>
				{signature}
			</CodeInline>
		</span>
	</div>

	<span class="file">
		<Reference documentId={`sourcefiles/${shortenfilenamekeepmodule(file)}`} reftype="sourcefile">
			<SourceFile {file} {line} />
		</Reference>
	</span>
</div>

<style>
	.container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		line-height: 1.6
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
		@apply pl-4;
		white-space: pre;
		align-self: flex-end;
	}
</style>
