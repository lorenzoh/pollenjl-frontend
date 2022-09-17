import { base } from '$app/paths';
import { dev } from '$app/environment';

import type { RequestHandler } from './$types';
import { error, json } from '@sveltejs/kit';


export const GET: RequestHandler = async ({ params }) => {
    const { version, documentId } = params
    if (version == 'favicon.ico') {
        throw error(404, "Wha")
    }
    const dataUrl: string = dev ? 'http://127.0.0.1:8000' : `${base}/data/${version}`
    /*const { body, status } = await loadDocument(dataUrl, documentId, fetch);
    if (status >= 400) {
        console.log('Failed to load document from /api endpoint: ', { body, status, version, documentId, dataUrl })
    }*/

    /* Possible responses:

    - 200: All good :)
    - 503: The Pollen.jl server cannot be accessed
    - 502: The Pollen.jl server returned an invalid response, i.e. a malformed JSON
    - 404: The document does not exist on the Pollen.jl server

    */
    const documentUrl = `${dataUrl}/${documentId}.json`;

    const body = await fetch(documentUrl)
            .then(r => {
            if (r.status == 200) {
                return r
            }
            throw (error(500, "hi"))
        }).then(async r => {
            return await r.json()
        })
        .catch(e => {
            if (e instanceof SyntaxError) {
                return error(502, `Malformed JSON: ${e}`)
            }
            throw error(500, "WHa")
        })

    if (body instanceof Error) {
        throw body
    } else {
        return json(body)
    }
}