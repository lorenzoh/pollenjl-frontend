<script lang="ts">
	import ReferenceSourceFile from '$lib/references/ReferenceSourceFile.svelte';
	import CodeInline from './CodeInline.svelte';

	export let signature: string;
	export let file: string;
	export let line: number;
</script>

<div class="container methodreference">
	<div class="signature">
		<span>
			{signature}
		</span>
	</div>

	<span class="file"><ReferenceSourceFile {file} {line} /></span>
</div>

<style>
	.container {
    display: flex;
    justify-content: space-between;
    align-items: center;
	}
  .signature {
    @apply font-mono;
    font-size: 0.8em;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .signature > span {
    white-space: pre;
  }
	.file {
    @apply pl-4;
    white-space: pre;
    align-self: flex-end;
	}
</style>
