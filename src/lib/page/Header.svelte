<!--
  @component

  The header part of the page. This includes
  - a project icon and title
  - a search bar to navigate to pages
  - a version switcher (TODO)
  - a document index for quick navigation (mobile size only)
-->
<script lang="ts">
	import LogoGithub32 from 'carbon-icons-svelte/lib/LogoGithub32';

	import SearchWidget from '$lib/search/SearchWidget.svelte';
	import HeaderName from './HeaderName.svelte';

	import { CORPUSURL, REPOURL } from '$lib/config';
</script>

<div class="header flex flex-col items-center justify-between h-12 w-full">
	<span class="name">
		<HeaderName />
	</span>

	<div class="search  w-full">
		<SearchWidget
			documentsURL={CORPUSURL}
			on:resultSelected}
			link
			style="width: 100%; flex-grow: 3"
		/>
	</div>

	<div class="other">
		<a href={REPOURL}>
			<LogoGithub32 />
		</a>
	</div>
</div>

<style>
	.name {
		min-width: 200px;
	}
	.other {
		@apply m-2;
		min-width: 200px;
	}
</style>
