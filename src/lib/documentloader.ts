import type { IDocumentNode } from "$lib/documents/types";

export class DocumentLoader {

    cache: Record<string, IDocumentNode>[] = []

    load(documentId: string): Promise<IDocumentNode> {
        return Promise.reject("yo")
    }
}