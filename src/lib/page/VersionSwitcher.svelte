<script lang="ts">
	import { base } from '$app/paths';
	import type { DocVersion } from '$lib/types';
	import { NativeSelect } from '@svelteuidev/core';
	import { Button, Divider, Menu } from '@svelteuidev/core';

	export let version: string;
	export let versions: DocVersion;

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
<!-- 
<select id="version-select" on:change={(e) => window.location.assign(`${base}/${e.target.value}`)}>
	<optgroup label="Open">
		<option>{version}</option>
	</optgroup>
	<optgroup label="Other">
		{#each otherVersions as v}
			<option>{v}</option>
		{/each}
	</optgroup>
</select>
 -->
