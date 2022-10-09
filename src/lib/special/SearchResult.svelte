<script lang="ts">
	import type { SearchResult } from './types';

	export let result: SearchResult;


  function snippets(text: string, ranges) {
    if (ranges.length == 0) {
      return [[text, false]]
    }
    let snips = []
    snips.push([text.slice(0, ranges[0].beginning), false])
    ranges.forEach(({beginning, end}, i: number) => {
      snips.push([text.slice(beginning, end), true])
      let end_ = i == (ranges.length-1) ? text.length : ranges[i+1].beginning;
      snips.push([text.slice(end, end_), false])
    });
    return snips
  }

</script>

{#each result.excerpts as excerpt}
	<p class="text-sm mb-0.5 text-gray-500 overflow-clip whitespace-nowrap overflow-ellipsis">
    {#each snippets(excerpt.text, excerpt.highlight_ranges) as [snippet, highlighted]}
       <span class:highlighted>{snippet}</span>
    {/each}
		{excerpt.text}
	</p>
{/each}


<style>
  .highlighted {
    @apply font-bold text-gray-700;
  }
</style>