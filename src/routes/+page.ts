import { redirect } from '@sveltejs/kit';
import { base } from '$app/paths';
import { dev } from '$app/environment';
import { API, throwAPIError } from '$lib/api';

export const prerender = true;

export async function load({ params, fetch }) {
	const { version } = params;
	console.log(version)
	const DATAURL = dev ? "http://127.0.0.1:8000" : `${base}/data`
	const api = new API(DATAURL, version, fetch)
	const versions = await api.loadVersions()
	console.log(versions)
	throwAPIError(versions)
	if ('stable' in versions) {
		throw redirect(301, `${base}/stable`);
	} else if ('dev' in versions) {
		throw redirect(301, `${base}/dev`);
	} else {
		throw redirect(301, `${base}/${Object.keys(versions)[0]}`)
	}
}
