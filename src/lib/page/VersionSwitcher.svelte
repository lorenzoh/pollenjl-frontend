<script lang="ts">
	import { base } from '$app/paths';
	import type { DocVersions } from '$lib/types';
	import { NativeSelect } from '@svelteuidev/core';

	export let version: string;
	export let versions: DocVersions;

	const otherVersions = Object.keys(versions).filter((v) => v != version);
</script>

<NativeSelect
	data={otherVersions}
	on:change={(e) => window.location.assign(`${base}/${e.target.value}`)}
	size="xs"
	placeholder={otherVersions.length == 0 ? "No other versions available" : "Choose a different version"}
	disabled={otherVersions.length == 0}
	class="text-sm"
/>