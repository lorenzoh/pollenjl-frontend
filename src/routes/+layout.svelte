<script>
	import '../tailwind.css';
	import '../app.scss';

	import { SvelteUIProvider } from '@svelteuidev/core';
</script>

<SvelteUIProvider>
	<slot />
</SvelteUIProvider>
