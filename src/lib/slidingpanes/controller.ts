import { derived, writable } from "svelte/store";
import type { Writable } from 'svelte/store'

import type { DocumentID } from "$lib/documentloader";
import { computevisibility } from "$lib/utils";

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

    public viewerProps: Writable;

    // configuration
    viewerWidth: number = 650;

    // state
    private elem: Element | null;
    private elemAttrs: Writable<IElemAttrs> = writable({ scroll: 0, size: 2 * this.viewerWidth });

    constructor(viewerWidth: number) {
        this.viewerWidth = viewerWidth;
        this.viewerProps = this.makeViewerPropsStore()
    }

    connect(elem: Element) {
        this.elem = elem
        this.updateElemAttrs();
    }


    updateElemAttrs() {
        this.elemAttrs.set({ scroll: this.elem.scrollLeft, size: this.elem.clientWidth })
    }

    scrollTo(column: number) {
        this.elem.scrollTo({ left: column * this.viewerWidth + (column) * 40 })
    }

    makeViewerPropsStore() {
        return derived([this.elemAttrs], ([{ scroll, size }]) => {
            const w = this.viewerWidth;
            const n = ids.length;
            const minWidth = 40;
            return map((i) => {
                const space = computevisibility(i, w, size, scroll)
                return {
                    style: `width: ${w}px; max-width: ${w}px; left:${i * minWidth}px ;right:${-w + minWidth * (n - i)}px;`,
                    overlapped: space < w,
                    collapsed: space <= 2 * minWidth,
                    column: i,
                }
            })
        })
    }
}

