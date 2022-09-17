import { base } from '$app/paths';
import { dev } from '$app/environment';

// Endpoint that loads the versions.json file stored in the root of
// the data/ folder.
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
    const url: string = dev ? 'http://127.0.0.1:8000/versions.json' : `${base}/data/versions.json`

    const { body, status } = await fetch(url).then(async r => {
        if (r.ok) {
            return { body: await r.json(), status: r.status }
        }
    })
    return json(body)
}
