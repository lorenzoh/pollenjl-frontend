<script lang="ts">
	import type { Backlink } from '$lib/types';
	import Link20 from 'carbon-icons-svelte/lib/Link20';
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

	const n = backlinks.length;
</script>


<div class="backlinks">
	<div class="admonition">
		<div class="admonitiontitle"><Link20 class="icon" /> Backlinks</div>
		<div class="admonitionbody">
			{#if n > 0}
				<p>The following page{n == 1 ? '' : 's'} link{n != 1 ? '' : 's'} back here:</p>
				<p>
					{#each documents as backlink, i}
						<Reference documentId={backlink.docid} reftype={'document'}>
							{backlink.title}</Reference
						>{i + 1 == documents.length ? '' : ', '}
					{/each}
				</p>
				<p>
					{#each references as backlink, i}
						<Reference documentId={backlink.docid} reftype={'symbol'}>
							<CodeInline>{backlink.title}</CodeInline>
						</Reference>{i + 1 == references.length ? '' : ', '}
					{/each}
				</p>
				<p>
					{#each sourcefiles as backlink, i}
						<Reference documentId={backlink.docid} reftype={'sourcefile'}>
							<SourceFile file={backlink.docid} line={null} />
						</Reference>{i + 1 == sourcefiles.length ? '' : ', '}
					{/each}
				</p>
			{:else}
				<p>There are no pages linking back here.</p>
			{/if}
		</div>
	</div>
</div>

<style>
	.backlinks {
		line-height: 1.6;
	}
</style>
