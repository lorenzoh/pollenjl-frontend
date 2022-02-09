<script context="module">
	import { GHPAGES } from '$lib/config';
	import { base } from '$app/paths';

	export const prerender = true;
	export const hydrate = true;
</script>

{GHPAGES}
<a href="{base}/docs/dev/documents/README.md">Click me!</a>
