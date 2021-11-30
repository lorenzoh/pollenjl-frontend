<script lang="ts">
	import { compare, search } from './utils';
	export let index;
	export let value: string = '';
	export let results = search(index, value);
	export let style = '';
	export let className = '';
	$: results = search(index, value);

</script>

<input
	type="text"
	{style}
	class={className}
	bind:value
	placeholder="Search for text or code"
/>

