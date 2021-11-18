import type { Writable } from "svelte/store";

/*

Navigates to reference `documentId` from current `position`.
If the document is not already opened, it is added to the store
`documentIds` at position `position + 1`.
In either case, the view is navigated to the newly opened document


*/
export function navigateToDocument(documentIds: Writable<string[]>, scroll: Writable<number>, documentId: string, position: number) {
    let newPosition = 0
    documentIds.update(ids => {
        let [ids_, pos] = ensureDocumentId(ids, documentId, position);
        newPosition = pos;
        return ids_
    })
    setTimeout(() => {
        scroll.update(n => { console.log(n); return newPosition * 700 })
    }, 50)

}

function ensureDocumentId(documentIds: string[], docid: string, position) {
    if (documentIds.includes(docid)) {
        const idx = documentIds.findIndex(id => id == docid)
        return [documentIds, idx];
    } else {
        return [[
            ...documentIds.slice(0, position + 1),
            docid,
        ], position + 1];

    }
}

