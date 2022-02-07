/*
Functionality related to documents exported by Pollen.jl.
*/

import { BASE, DOCUMENTS } from "$lib/config";


export function getDocumentUrl(version: string, documentId: string) {
    return `${DOCUMENTS}/${version}/${documentId}.json`
}

export function getDocumentHref(version: string, documentId: string) {
    return `${BASE}/docs/${version}/${documentId}`
}

export function getDocumentHrefInteractive(version: string, documentId: string) {
    return `${BASE}/docs/${version}/interactive?id=${documentId}`
}

export function getLinkTreeUrl(version: string) {
    return `${DOCUMENTS}/${version}/linktree.json`
}

export function getCorpusUrl(version: string) {
    return `${DOCUMENTS}/${version}/documents.json`
}