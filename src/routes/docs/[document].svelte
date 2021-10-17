<script context="module">
	export async function load({ page, fetch, session, stuff }) {
		//const url = '/api/symbols/bla.json';
		
		const url = `/${page.query.get("doc")}`;
		const res = await fetch(url);


		if (res.ok) {
			return {
				props: {
					data: await res.json(),
          query: page.query,
				}
			};
		}

		return {
			status: res.status,
			error: new Error(`Could not load ${url}`)
		};
	}
</script>

<script>
  export let data;
  export let query;
</script>

hi

{JSON.stringify(data)}
<br>
{query.toString()}
