import { base } from '$app/paths';
import { dev } from '$app/env';



/** @type {import('./[...documentId].json').RequestHandler} */
export async function get({ params, fetch }) {
    const { version, documentId } = params

    const dataUrl: string = dev ? 'http://127.0.0.1:8000' : `${base}/data/${version}`
    const { body, status } = await loadDocument(dataUrl, documentId, fetch);
    if (status >= 400) {
        console.log('Failed to load document from /api endpoint: ', { body, status, version, documentId, dataUrl })
    }
    return { body, status }
}

export async function loadDocument(dataUrl: string, id: string, fetchfn) {
    const documentUrl = `${dataUrl}/${id}.json`;
    let ret = {}
    await fetchfn(documentUrl).then(async r => {
        if (r.ok) {
            await r.json().then(j => {
                ret = { body: j, status: r.status }
            }).catch(e => {
                ret = { body: { errorMessage: e }, status: 401 }
            })
        } else {
            ret = { body: { errorMessage: r.statusText }, status: r.status }
        }
    }).catch(e => {
        ret = { body: { errorMessage: e }, status: 500 }
    })
    return ret
}