<script context="module">
	import { BASE } from '$lib/config';
  export const prerender = true;
  export const hydrate = false;

	export async function load() {
		return {
			status: 302,
			redirect: `${BASE}/docs/dev/`
		};
	}
</script>
