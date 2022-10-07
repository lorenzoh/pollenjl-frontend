import { base } from '$app/paths';
import { browser, dev, prerendering } from '$app/environment';

export const csr = true;
export const prerender = true;

import type { PageLoad } from './$types';
import { API, throwAPIError } from '$lib/api';
import type { DocVersions } from '$lib/types';

export const load: PageLoad = async ({ params, fetch, url }) => {
	const { version, documentId } = params;
	const DATAURL = dev ? "http://127.0.0.1:8000" : `${base}/data`
	const api = new API(DATAURL, version, fetch)

	const versions = await api.loadVersions()
	throwAPIError(versions)
	const docindex = await api.loadDocumentIndex(version)
	throwAPIError(docindex)
	const config = (versions as DocVersions)[version]

	// In the browser, we parse additional document Ids from the query string,
	// which cannot be done during prerendering.
	let documentIds: string[] =
		documentId == '' ? [config.defaultDocument] : [documentId];
	if (browser) {
		documentIds = [documentIds[0], ...url.searchParams.getAll('id')];
	}

	if (prerendering) {
		//TODO: handle search index
		//ids.push(searchindex);
	}

	// load all relevant documents in parallel
	await Promise.all(documentIds.map(api.loadDocument.bind(api)))

	console.log(config)
	return {
		api,
		documentIds,
		docindex,
		versions,
		config,
		dataUrl: DATAURL,
		baseUrl: `${base}/${version}`
	};
}
