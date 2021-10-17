<script lang="ts">
	export let file: string;
	export let line: number;
	export let compact: boolean = true;
	if (compact) {
		file = shortenfilename(file)
	}

	function shortenfilename(file: string) {
		const parts = file.split('/');
		const idx = parts.findIndex((p) => p == 'src');
		if (idx == -1) {
			return file;
		}
    return parts.slice(idx+1, parts.length).join("/")
	}
</script>

<span class="reference referencefile">
	{file}:{line}
</span>

<style>
  span {
    @apply rounded-lg pl-1 pr-1 bg-bluegray-100;
  }
</style>
