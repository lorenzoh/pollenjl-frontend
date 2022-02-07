<script context="module">

import { GHPAGES } from "$lib/config";


	export const prerender = true;
	export const hydrate = false;
</script>

{GHPAGES}
{process.env}
<a href="/docs/dev/documents/README.md">Click me!</a>
