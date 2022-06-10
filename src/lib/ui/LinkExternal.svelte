<script lang="ts">
	import Link from 'carbon-icons-svelte/lib/Link16';

	import type { IDocumentNode } from '$lib/documents/types';

	export let document: IDocumentNode;
</script>

<span class="linkexternal">
	<a rel="external" href={document.attributes.href}>
		<slot />
		<Link style="display:inline; transform: translate(-1px,-2px)" />
	</a>
</span>

<style>
  a {
    @apply text-bluegray-500;
  }
  a:hover {
    @apply text-bluegray-700;
  }
</style>
