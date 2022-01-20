<script lang="ts">
	import { BASE, REPONAME } from '$lib/config';
</script>

<a href={`${BASE}/docs`} class="headername">
	{REPONAME}
</a>
<style>

  .headername {
      @apply text-2xl ;
  }
</style>
