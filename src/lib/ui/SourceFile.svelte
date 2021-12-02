<script lang="ts">
	import { shortenfilename } from '$lib/utils';
	import Script16 from 'carbon-icons-svelte/lib/Script16';
	export let file: string;
	export let line: number = null;
	export let compact: boolean = true;
	if (compact) {
		file = shortenfilename(file);
	}
</script>

<span>
	<Script16 style="display:inline" class="icon" />
	{file}{line !== null ? `:${line}` : ''}
</span>
