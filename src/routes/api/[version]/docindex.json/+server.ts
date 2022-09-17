// TODO: stitch together document index based on data from all the
// active packages, i.e. their "index.json" files.

import { dev } from "$app/environment";
import { base } from "$app/paths";
import { API, throwAPIError } from "$lib/api";
import { json } from "@sveltejs/kit";

import type { RequestHandler } from './$types';
export const GET: RequestHandler = async ({ params, url }) => {
    const { version } = params
    const DATAURL = dev ? "http://127.0.0.1:8000" : `${base}/data`
    const api = new API(DATAURL, "stable")
    const index = await api.loadDocumentIndex(version);
    throwAPIError(index)
    return json(index)
}