import type { IDocumentNode } from "$lib/documents/types";
import { getTitleAttrs } from "./viewers/types";
import type { IDocumentTitle } from "./viewers/types";

export type DocumentID = string;

export interface IDocumentLoader {
    load(documentID: DocumentID): Promise<IDocumentNode>;
    hasDocument(documentID: DocumentID): boolean;
    getTitle(documentID: DocumentID): IDocumentTitle;
    get(documentID: DocumentID): IDocumentNode;
}


export class HTTPDocumentLoader implements IDocumentLoader {

    cache: { [id: DocumentID]: IDocumentNode } = {};
    basePath: string;
    dataPath: string;
    version: string | null;
    attributes = {}
    fetch = fetch;

    constructor(
        basePath: string,
        version: string,
        dataPath: string = `${basePath}/data/${version}`,
        cache = {}) {

        this.basePath = basePath;
        this.version = version;
        this.dataPath = dataPath;
    }

    async load(documentId: DocumentID): Promise<IDocumentNode> {
        if (documentId in this.cache) {
            const doc = this.cache[documentId];
            return Promise.resolve(doc)
        }
        else {
            return this.fetch(this.getDataHref(documentId)).then(response => {
                if (!response.ok) {
                    return Promise.reject({ status: response.status, statusText: response.statusText });
                } else {
                    return response.json()
                }
            }).then(responseJson => {
                this.cache[documentId] = responseJson
                return (responseJson as IDocumentNode)
            }).catch(errorJson => {
                return Promise.reject(errorJson)
            })
        }
    }

    hasDocument(documentId: DocumentID) {
        return (documentId in this.cache)
    }

    get(documentId: DocumentID): IDocumentNode | null {
        return this.cache[documentId]
    }

    getTitle(documentId: DocumentID): IDocumentTitle {
        if (this.hasDocument('attributes')) {
            const attrs = this.get('attributes')[documentId]
            if (attrs) {
                return { kind: attrs.tag, text: attrs.title }
            };
        }
        if (this.hasDocument(documentId) && documentId.startsWith('documents')) {
            const doc = this.get(documentId)
            if (doc.attributes.title != null) {
                return { kind: 'document', text: doc.attributes.title }
            }
        }
        return getTitleAttrs(documentId)
    }


    getHref(documentId: DocumentID, isInteractive = false): string {
        if (isInteractive) {
            return `${this.basePath}/${this.version}/i?id=${documentId}`
        } else {
            return `${this.basePath}/${this.version}/${documentId}`
        }
    }

    getDataHref(documentId: DocumentID) {
        return `${this.dataPath}/${documentId}.json`
    }
}