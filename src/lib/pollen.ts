/*
Functionality related to documents exported by Pollen.jl.
*/

import { DOCUMENTS } from "$lib/config";


export function getDocumentUrl(documentId: string) {
    return `${DOCUMENTS}/${documentId}.json`
}