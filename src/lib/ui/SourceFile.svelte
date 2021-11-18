<script lang="ts">
	import { shortenfilename } from '$lib/utils';
	export let file: string;
	export let line: number;
	export let compact: boolean = true;
	if (compact) {
		file = shortenfilename(file);
	}

	const path =
		'M15.475,6.692l-4.084-4.083C11.32,2.538,11.223,2.5,11.125,2.5h-6c-0.413,0-0.75,0.337-0.75,0.75v13.5c0,0.412,0.337,0.75,0.75,0.75h9.75c0.412,0,0.75-0.338,0.75-0.75V6.94C15.609,6.839,15.554,6.771,15.475,6.692 M11.5,3.779l2.843,2.846H11.5V3.779z M14.875,16.75h-9.75V3.25h5.625V7c0,0.206,0.168,0.375,0.375,0.375h3.75V16.75z';
</script>

<span>
	<svg class="svg-icon" viewBox="-1 1 20 20"><path d={path} /></svg>
	{file}{line !== null ? `:${line}` : ''}
</span>

<style>
	.svg-icon {
		width: 1em;
		height: 1em;
		display: inline;
	}
</style>
