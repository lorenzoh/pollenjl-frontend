import { derived, writable } from "svelte/store";
import type { Readable, Writable } from 'svelte/store'

import type { DocumentID } from "$lib/documentloader";
import { computevisibility } from "$lib/utils";
import { isNode } from "$lib/documents/types";

interface IElemAttrs {
    scroll: number,
    size: number,
}

export class ViewerController {


    /* interface: 
        - update all open documents
        - close a document at an index
        - open a document at an index
        - scroll to a document
    
   */

    public documentIds: Writable<DocumentID[]>;
    public viewerProps: Writable;

    // configuration
    viewerWidth: number = 650;

    // state
    private elem: Element | null;
    private elemAttrs: Writable<IElemAttrs> = writable({ scroll: 0, size: 2 * this.viewerWidth });

    private _scrollTriggerStore: Readable<null>

    constructor(docIds: DocumentID[], viewerWidth: number) {
        this.documentIds = writable(docIds);
        this.viewerWidth = viewerWidth;
        this.viewerProps = this.makeViewerPropsStore()
    }

    connect(elem: Element) {
        this.elem = elem
        // set up scrolling callback
        /*this._scrollTriggerStore = derived(this.elemAttrs, ({ scroll, }) => {
            elem.scrollTo({ left: scroll });
        })*/
        // sync to element's state
        this.updateElemAttrs();
    }


    updateElemAttrs() {
        this.elemAttrs.set({ scroll: this.elem.scrollLeft, size: this.elem.clientWidth })
    }

    openDocument(id: DocumentID, column: number, keepRest = false) {
        this.documentIds.update(ids => {
            if (ids.includes(id)) {
                return ids
            } else {
                const newIds = [
                    ...ids.slice(0, column),
                    id,
                    ...(keepRest ? ids.slice(column) : [])
                ]
                return newIds
            }
        });
    }


    scrollToDocument(id: DocumentID) {
        this.documentIds.update(ids => {
            if (ids.includes(id)) {
                const c = ids.findIndex(x => x == id)
                this.scrollTo(c)
            }
            return ids
        })
    }

    closeDocument(id: DocumentID) {
        this.documentIds.update(ids => {
            if (ids.includes(id)) {
                const c = ids.findIndex(x => x == id)
                return [...ids.slice(0, c), ...ids.slice(c + 1)]
            }
            return ids
        })
    }

    scrollTo(column: number) {
        this.elem.scrollTo({ left: column * this.viewerWidth + (column) * 40 })
    }

    makeViewerPropsStore() {
        return derived([this.elemAttrs, this.documentIds], ([{ scroll, size }, ids]) => {
            const w = this.viewerWidth;
            const n = ids.length;
            const minWidth = 40;
            return ids.map((id, i) => {
                const space = computevisibility(i, w, size, scroll)
                return {
                    style: `width: ${w}px; max-width: ${w}px; left:${i * minWidth}px ;right:${-w + minWidth * (n - i)}px;`,
                    documentId: id,
                    overlapped: space < w,
                    collapsed: space <= 2 * minWidth,
                    column: i,
                }
            })
        })
    }
}
