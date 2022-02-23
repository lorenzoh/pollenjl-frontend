<script context="module">
	import { base } from '$app/paths';

	export const prerender = true;
	export const hydrate = false;

	export async function load({params}) {
		return {
			status: 302,
			redirect: `${params.version}/documents/README.md`
		};
	}
</script>
