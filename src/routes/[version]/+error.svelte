<script lang="ts">
	import { page } from '$app/stores';

	import '../../tailwind.css';
	import '../../app.scss';
	import { base } from '$app/paths';

	const error = JSON.parse($page.error.message).message;
</script>

<div class="container m-4  lg:mt-8 lg:max-w-2xl mx-auto">
	<div class="markdown">
		<h1>An error occured!</h1>

		<div class="subtitle">Status code: {$page.status}</div>
		<div class="errormessage text-lg">
			{#if error.type == 'devserverunavailable'}
				<p>
					The Pollen.jl development server was not found running at the expected address: <a
						href="http://{error.host}:{error.port}"
						target="_blank"
					>
						<code class="text-base text-bluegray-600 bg-gray-50"
							>http://{error.host}:{error.port}</code
						></a>. Make sure you have started it using <code>Pollen.serve</code>.
				</p>
      {:else if error.type == 'invalidversion'}
        <p>Tried to access a version of the site that does not exist: <code>{error.version}</code></p>
        <p>Please access one of the valid versions:</p>
        {#each error.versions as v}
          <a class="reference" href="{base}/{v}">{v}</a>
        {/each}
			{:else}
				Missing error message :(
			{/if}
		</div>
		<hr />
		<p>Complete error information:</p>
		<pre class="codeblock"><code>{JSON.stringify(error, null, '\t')}</code></pre>
	</div>
</div>
