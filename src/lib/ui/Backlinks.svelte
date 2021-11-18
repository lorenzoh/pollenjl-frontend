<script lang="ts">
	import type { Backlink } from '$lib/documents/types';
	import CodeInline from './CodeInline.svelte';
	import Reference from './Reference.svelte';
import SourceFile from './SourceFile.svelte';

	export let backlinks: Backlink[];
	const documents = backlinks
		.filter((l) => l.tag == 'document')
		.slice()
		.sort(compare);
	const references = backlinks
		.filter((l) => l.tag == 'reference')
		.slice()
		.sort(compare);
	const sourcefiles = backlinks
		.filter((l) => l.tag == 'sourcefile')
		.slice()
		.sort(compare);
	function compare(a, b) {
		if (a.title < b.title) {
			return -1;
		}
		if (a.title > b.title) {
			return 1;
		}
		return 0;
	}
</script>

{#if backlinks.length > 0}
	<div class="backlinks">
		<p>The following pages link back here:</p>
		<p>
			{#each documents as backlink, i}
				<Reference documentId={backlink.docid} reftype={'document'}>
					{backlink.title}</Reference>{i + 1 == documents.length ? '' : ', '}
			{/each}
		</p>
		<p>
			{#each references as backlink, i}
				<Reference documentId={backlink.docid} reftype={'symbol'}>
					<CodeInline>{backlink.title}</CodeInline>
				</Reference>{i + 1 == documents.length ? '' : ', '}
			{/each}
		</p>
		<p>
			{#each sourcefiles as backlink, i}
				<Reference documentId={backlink.docid} reftype={'sourcefile'}>
			<SourceFile file={backlink.docid} line={null}/>
				</Reference>{i + 1 == documents.length ? '' : ', '}
			{/each}
		</p>
	</div>
{:else}
<p>There are no pages linking back here.</p>
{/if}
