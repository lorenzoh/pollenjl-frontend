<script context="module">
	import { base } from '$app/paths';

	export const prerender = true;
	export const hydrate = false;

/* 	export async function load() {
		return {
			status: 302,
			redirect: `${base}/dev`
		};
	} */
</script>


<a href={`${base}/dev/i`} class="text-xl w-full text-center text-bluegray-600">Documentation (dev)</a>