import { error, redirect } from '@sveltejs/kit';
import { base } from '$app/paths';
import { makeDocumentCache } from '$lib/navigation';
import { API, throwAPIError } from '$lib/api';
import { DocVersion } from '$lib/types';
import { dev } from '$app/environment';

export const prerender = true;

export async function load({ params, fetch }) {
	const { version } = params;
	const DATAURL = dev ? "http://127.0.0.1:8000" : `${base}/data`
	const api = new API(DATAURL, version, fetch)
	const versions = await api.loadVersions()
	const config = await api.loadVersionConfig(version)
	if (DocVersion.guard(config)) {
		throw redirect(301, `${base}/${version}/${config.defaultDocument}`);
	} else {
		throwAPIError(config)
	}

}
