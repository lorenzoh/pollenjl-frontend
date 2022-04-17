<script lang="ts">
  export let data: string;
</script>

{@html `<img src="data:image/jpeg;base64,${data}" /> `}