
export interface IDocumentNode {
    tag: string,
    attributes: { [k: string]: any },
    children: Document[],
}

export interface IDocumentLeaf {
    mimes: { [k: string]: string },
}

export type IDocument = IDocumentLeaf | IDocumentNode

export function isNode(document: IDocument): document is IDocumentNode {
    return (document as IDocumentNode).tag !== undefined
}

export function isLeaf(document: IDocument): document is IDocumentLeaf {
    return !isNode(document)
}

export interface Backlink {
    tag: string,
    docid: string,
    title: string,
}