import { dev, prerendering } from '$app/env';
import ViewerDocumentation from '$lib/viewers/documentation/ViewerDocumentation.svelte';
import ViewerDocument from '$lib/viewers/ViewerDocument.svelte';
import ViewerSourceFile from '$lib/viewers/ViewerSourceFile.svelte';

import TagCode from '$lib/documents/tags/TagCode.svelte';
import TagPre from '$lib/documents/tags/TagPre.svelte';
import TagReference from '$lib/documents/tags/TagReference.svelte';

export const REPONAME = 'DataLoaders.jl'

// # URLs

// The base URL the app is run under
export const BASE: string = (dev || prerendering) ? '' : ''//`/${REPONAME}/test`;
// Root URL of static assets
export const ASSETS = BASE;
// URL to documents
export const DOCUMENTS = dev ? '/pollendata' : `${ASSETS}/pollendata`;
// URL to document corpus to use for building a search index
export const CORPUSURL = `${ASSETS}/documents.json`
export const LINKTREEURL = `${ASSETS}/linktree.json`

export const REPOURL = 'https://github.com/lorenzoh/DataLoaders.jl'

// # Other
// ID of document to redirect to if the root is opened
export const DEFAULTDOC = 'documents/README.md';

// # Display
// Width (in px) of documents in columnar viewer
export const VIEWERWIDTH: number = 650


// Tags
export const TAGS = {
    // tag viewers
    pre: TagPre,
    code: TagCode,
    codeblock: TagPre,
    reference: TagReference,
    // document viewers
    documentation: ViewerDocumentation,
    sourcefile: ViewerSourceFile,
    document: ViewerDocument,
}

export const STATICTAGS = {
    ...TAGS,
}

export const INTERACTIVETAGS = {
    ...TAGS,
}