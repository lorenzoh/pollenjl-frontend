
import lunr from 'lunr'
import { base } from '$app/paths';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ params, fetch }) {
	const version = params.version

	const url = `${base}/data/${version}/documents.json`

	fetch(url).then(
		r => r.json()
	).then(
		documents => {
			const index = constructIndex(documents);
			return {
				body: index,
			}
		}
	).catch(e => {
		return {
			status: 500,
		}
	})

}

function constructIndex(documents) {
	return lunr(function () {
		this.ref('id');
		this.field('title');
		this.field('text');
		documents.forEach(function (doc) {
			this.add(doc);
		}, this);
	});
}