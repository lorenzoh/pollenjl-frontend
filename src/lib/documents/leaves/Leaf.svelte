<script lang="ts">
	import type { IDocumentLeaf } from '$lib/documents/types';
	import LeafImageJpeg from './LeafImageJpeg.svelte';
	import LeafImagePng from './LeafImagePng.svelte';
	import LeafTextHTML from './LeafTextHTML.svelte';
	import LeafTextPlain from './LeafTextPlain.svelte';

	export let leaf: IDocumentLeaf;

	const COMPONENTS = {
		'text/html': LeafTextHTML,
		'text/plain': LeafTextPlain,
		'image/jpeg': LeafImageJpeg,
		'image/png': LeafImagePng
	};

	let mimes;
	const isString = typeof leaf === 'string';
	if (!isString) {
		mimes = leaf.mimes;
	} else {
		mimes = { 'text/plain': leaf };
	}

	let component;
	let data;
	for (const mime in COMPONENTS) {
		if (Object.prototype.hasOwnProperty.call(COMPONENTS, mime)) {
			const comp = COMPONENTS[mime];
			if (mime in mimes) {
				component = comp;
				data = mimes[mime];
			}
		}
	}
</script>

<svelte:component this={component} {data} /> 
