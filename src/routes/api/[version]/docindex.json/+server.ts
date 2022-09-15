
// TODO: stitch together document index based on data from all the
// active packages, i.e. their "index.json" files.

import { base } from "$app/paths"

export async function get({ params }) {
    const { version } = params

    console.log(`${base}/api/versions.json`)
    const versions = await fetch(`${base}127.0.0.1:3000/api/versions.json`).then(r => {
        console.log("Request hi")
        if (r.ok) {
            return r.json()
        } else {
            throw Error("HI")
        }
    }).catch(e => console.warn(e));
    return { body: versions, status: 200 }
}