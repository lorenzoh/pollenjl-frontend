import { base } from '$app/paths';
import { browser, dev, prerendering } from '$app/environment';

export const csr = true;
export const prerender = true;

import type { PageLoad } from './$types';
import { API, throwAPIError } from '$lib/api';
import { DocIndex, type DocVersions } from '$lib/types';
import { SPECIAL_PAGES } from '$lib/config';

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
	if (browser || dev) {
		documentIds = [documentIds[0], ...url.searchParams.getAll('id')];
	}

	if (prerendering) {
		// TODO: handle search index
		// ids.push(searchindex);
	}

	// load all relevant documents in parallel
	await api.loadDocuments(documentIds.filter(id => !Object.keys(SPECIAL_PAGES).includes(id)));

	const {documents, docversions, pkgindexes} = api;
	return {
		apiData: {documents, docversions, pkgindexes},
		documentIds,
		docindex: (docindex as DocIndex),
		version,
		versions: (versions as DocVersions),
		dataUrl: DATAURL,
		baseUrl: `${base}/${version}`
	};
}
