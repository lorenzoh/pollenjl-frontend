<script lang="ts">
	import TagReference from '$lib/documents/tags/TagReference.svelte';
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

	<span class="file"
		><TagReference
			document={{ tag: 'reference', children: [], attributes: { document_id: file, file, line } }}
		/>
		<Reference documentId={`sourcefiles/${shortenfilenamekeepmodule(file)}`} reftype=sourcefile>
			<SourceFile {file} {line} />
		</Reference>
	</span>
</div>

<style>
	.container {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.signature {
		@apply font-mono;
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
