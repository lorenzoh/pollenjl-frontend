import data from '../dev/function.json';

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get({ query }) {
	const docid = query.get("docid");

	const url = `http://127.0.0.1:3000/pollendata/${docid}.json`;
	const req = await fetch(url)

	if (req.ok) {
		return {
			props: {
				data: await req.json(),
				rootid: docid
			}
		};
	}

	return {
		rootid: docid,
		status: req.status,
		error: new Error(`Could not load ${url}`)
	};
}
