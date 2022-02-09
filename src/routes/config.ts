import { REPONAME } from '$lib/config'


/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ }) {
    return {
        body: { ...loadconfig(), env: process.env },
        status: 200,
    }
}

/*

Things that components need to do via some context
- get the absolute URL to a (static/interactive) ([default]) document page with the same version
    - absolute: `SearchWidget`, `OpenTabs`, `ReferenceStatic`, `LinkTree`, 
- get the URL to auxiliary data
    - `Header` needs URL to link tree data and corpus data
- control the viewers (interactive only)
    - `Viewer` scrolls to its document when titlebar is clicked
    - `OpenTabs` scrolls to or removes a document
    - it is set by `Viewers`
    - `ReferenceInteractive` opens a new document
    - `LinkTree` sets to a single new document
- get the title of a document
    - `OpenTabs` -> pass in Loader
- find out if the interactive or static viewer is used
    - `Header` and `LinkTree` show a different link -> pass in
    - `Header` conditionally shows a button -> pass in
    - `Reference` dispatches on it -> context under Viewers

We can factor out the following components:

- Viewer manipulation is decoupled from everything else, since it is only needed in interactive viewer

- Document-related functionality needs a context; this is independent of isInteractive
    - load(documentId): loading a document (and caching it)
    - getUrl(documentId, isInteractive = false): getting some url for a document or its data
    - getDataUrl(documentId): getting url to document's JSON data
    - getTitle(documentId): getting the title of a document

- interactive or nah
*/

/* State that needs to be accessed by pages */
export interface IConfig {
    CI: boolean;
    // the URL that the docs are hosted under i.e. '/MyRepo' (no trailing '/'!)
    basePath: string;
}

function loadconfig(): IConfig {

    const dev = process.env.NODE_ENV === 'development';
    const CI = process.env.CI === 'true';
    return {
        CI,
        basePath: !dev ? `/${REPONAME}` : ''
    }
}