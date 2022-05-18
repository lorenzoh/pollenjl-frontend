<script context="module">
	import { base } from '$app/paths';

	export const prerender = true;

	export async function load({ params }) {
		const { version } = params;
		return {
			status: 301,
			redirect: `${base}/${version}/documents/README.md`
		};
	}
</script>
