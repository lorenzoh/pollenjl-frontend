<script lang="ts">
	import { BASE } from '$lib/config';

	export let documentId: string;
	export let reftype: string;
	export let className: string = '';

	const url = `${BASE}/docs/${documentId}`;
</script>

<a href={url} class="reference {reftype} {className}">
	<slot />
</a>
