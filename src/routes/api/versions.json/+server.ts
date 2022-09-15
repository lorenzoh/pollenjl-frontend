import { base } from '$app/paths';
import { dev } from '$app/env';

// Endpoint that loads the versions.json file stored in the root of
// the data/ folder.

export async function get({ }) {
    const url: string = dev ? 'http://127.0.0.1:8000/versions.json' : `${base}/data/versions.json`

    const { body, status } = await fetch(url).then(async r => {
        if (r.ok) {
            return { body: await r.json(), status: r.status }
        }
    })
    console.log(url)
    return { body, status}
}
