import type { Navigation } from "@sveltejs/kit";
import { derived, type Readable } from "svelte/store";
import type { AppContext } from "./context";

export function getDocIdsFromUrl(url: URL, baseUrl: string): string[] {
    let id = url.pathname.slice(baseUrl.length + 1, url.pathname.length - 5)
    return [id, ...url.searchParams.getAll('id')]
}


export function subscribeHref(app: AppContext, updateIds = (ids) => [ids, null]): Readable<string> {
    return derived([app.stores.documentIds, app.stores.multiColumn], ([ids_, is_multi]) => {
        let [ids, column] = updateIds(ids_);
        return buildHrefFromIds(app.config.urls.base, ids, is_multi, column);
    });
}


function buildHrefFromIds(baseUrl: string, ids: string[], isMultiColumn: boolean, focus = null): string {
    if (!isMultiColumn) {
        let id;
        if (focus !== null) {
            id = ids[focus];
        }
        else {
            id = ids[ids.length - 1];
        }
        return `${baseUrl}/${id}.html`
    }
    let href;
    if (ids.length == 1) {
        href = `${baseUrl}/${ids[0]}.html`;
    } else {
        const rest = ids.slice(1, ids.length).join('&id=');
        href = `${baseUrl}/${ids[0]}.html?id=${rest}`;
        if (focus !== null) {
            href = `${href}&focus=${focus}`
        }
    }
    return href
}


export function afterNavigateHandler(
    appContext: AppContext,
    { to }: Navigation,
    scrollfn: { (column: number,): void }) {
    const { debug } = appContext.config

    if (to.url.searchParams.has('focus')) {
        const targetcolumn = parseInt(to.url.searchParams.get('focus'));
        debug && console.log('Scrolling to colum', targetcolumn);
        scrollfn(targetcolumn);
    }
}
export async function beforeNavigateHandler(
    appContext: AppContext,
    { to, cancel }: Navigation & { cancel: () => void },
    documentIds: string[],
    multiColumn: boolean) {

    const { debug, urls, specialviews } = appContext.config
    if (to === null) {
        debug && console.log('Navigation without target');
        return;
    }

    if (multiColumn) {
        // **Multi-column view**
        // We intercept SvelteKit's client-side router, cancelling its
        // navigation. Instead we parse document ids from the URL.
        // One id is given by the href, and optionally others are given as
        // `id` query arguments.

        const newIds = [...new Set(getDocIdsFromUrl(to.url, urls.base))];
        // We only navigate if the opened documents have changed
        if (documentIds != newIds) {
            history.pushState(null, '', to.url);
            debug && console.log('Navigating to ids', newIds);
            // Preload and cache documents before updating the ids to avoid
            // a loading phase.
            await appContext.api.loadDocuments(newIds.filter((id) => !Object.keys(specialviews).includes(id)));
            appContext.stores.documentIds.set(newIds);
        }

        if (to.url.searchParams.has('focus')) {
            // TODO: scroll in afterNavigate
            const targetcolumn = parseInt(to.url.searchParams.get('focus'));
            debug && console.log('Scrolling to colum', targetcolumn);
            //scrollToColumn(targetcolumn);
        }

        cancel();
    } else {
        // **Single-column view**
        // This is basically like regular navigation, but with a twist to
        // make SvelteKit's client-side router work without messing up the DOM.
        // This is needed so that SvelteKit does not reuse DOM nodes for
        // the document. Doing that messes up the DOM as it is not properly
        // hydrated. This basically clears the DOM before navigation occurs.
        const [newId] = getDocIdsFromUrl(to.url, urls.base);
        if (!(newId in specialviews)) {
            await appContext.api.loadDocument(newId);
        }
        //documentIds = [];
        appContext.stores.documentIds.set([newId])
    }

}