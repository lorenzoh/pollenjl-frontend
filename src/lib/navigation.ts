
export function getDocIdsFromUrl(url: URL, baseUrl: string): string[] {
    let id = url.pathname.slice(baseUrl.length + 1, url.pathname.length)
    return [id, ...url.searchParams.getAll('id')]
}

export function getHrefFromIds(baseUrl: string, ids: string[], isMultiColumn: boolean, focus = null): string {
    if (!isMultiColumn) {
        let id;
        if (focus !== null) {
            id = ids[focus];
        }
        else {
            id = ids[0];
        }
        return `${baseUrl}/${id}`
    }
    let href;
    if (ids.length == 1) {
        href = `${baseUrl}/${ids[0]}`;
    } else {
        const rest = ids.slice(1, ids.length).join('&id=');
        href = `${baseUrl}/${ids[0]}?id=${rest}`;
        if (focus !== null) {
            href = `${href}&focus=${focus}`
        }
    }
    return href
}

export const makeDocumentCache = (dataUrl: string, cache, fetchfn = fetch) => {
    return {
        load: async (id: string) => {
            if (!(id in cache)) {
                const url = `${dataUrl}/${id}.json`
                console.log(`Loading uncached doc ${url}`)
                await fetchfn(url).then(async r => {
                    if (r.ok) {
                        cache[id] = await r.json()
                    } else {
                        console.error(`${r.status}: Could not load "${id} from URL "${url}"`)
                        return Promise.reject({})
                    }
                }).catch(e => console.error(e))
            }
            return cache[id];
        },
        documents: cache,
    }
}