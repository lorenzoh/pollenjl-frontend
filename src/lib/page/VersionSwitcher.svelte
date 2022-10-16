<script lang="ts">
	import { base } from '$app/paths';
	import type { DocVersions } from '$lib/types';
	import { NativeSelect } from '@svelteuidev/core';

	export let version: string;
	export let versions: DocVersions;

	const otherVersions = Object.keys(versions).filter((v) => v != version);

	const versionIds = Object.keys(versions);
	const labelfn = v => {
		if (v == 'dev') {
			return "Latest (in development)"
		} else if (v == 'stable') {
			return "Stable (latest release)"
		} else if (v.startsWith("pr")){
			return `Pull request ${v.slice(3)}`
		} else {
			return v
		}
	}
	const data = versionIds.map(v => {return {
		value: v,
		label: labelfn(v),
		disabled: v == version,
	}})
</script>

<NativeSelect
	data={data}
	on:change={(e) => window.location.assign(`${base}/${e.target.value}`)}
	size="xs"
	placeholder={labelfn(version)}
	class="text-sm"
	disabled={versionIds.length <= 1}
/>
