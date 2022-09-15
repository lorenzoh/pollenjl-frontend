<script context="module">
	import { base } from '$app/paths';

	export const prerender = true;

	export async function load() {
		return {
			status: 301,
			redirect: `${base}/stable`
		};
	}
</script>
