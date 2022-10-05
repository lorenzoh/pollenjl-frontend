import { error } from '@sveltejs/kit';
import { Record, String, Union, type Static, Literal, Number, Unknown, ValidationError, Array } from 'runtypes';
import type { RuntypeBase } from 'runtypes/lib/runtype';
import { DocIndex, Document, DocVersion, DocVersions } from './types';

export const MalformedJSONError = Record({
    type: Literal('malformedjson'),
    url: String
});

export const DevServerUnavailableError = Record({
    type: Literal('devserverunavailable'),
    host: String,
    port: Number
});

export const NetworkError = Record({
    type: Literal('networkerror'),
    message: String,
    url: String,
});

export const DocNotFoundError = Record({
    type: Literal('docnotfound'),
    url: String,
    document: String,
});

export const UnknownError = Record({
    type: Literal('unknown'),
    error: Unknown,
    url: String,
});

export const SchemaError = Record({
    type: Literal('schema'),
    code: String,
    details: Unknown,
})

export const InvalidVersionError = Record({
    type: Literal('invalidversion'),
    version: String,
    versions: Array(String),
})

export const APIError = Union(
    MalformedJSONError, DevServerUnavailableError, NetworkError, DocNotFoundError,
    UnknownError, SchemaError, InvalidVersionError);
export type APIError = Static<typeof APIError>;

export const getStatusCode = (e: APIError) => APIError.match(
    _ => 502, _ => 500, _ => 500, _ => 404, _ => 500, _ => 422, _ => 404
)(e)

export class API {
    dataurl: string;
    version: string;
    documents: { [key: string]: Document };
    fetch: (u: URL | RequestInfo, init?: RequestInit) => Promise<Response>;
    docversions: DocVersions | null = null;
    pkgindexes: { [pkg: string]: DocIndex } = {};

    constructor(dataurl: string, version: string, fetchfn = fetch, documents = {}, docversions = null, pkgindexes = {}) {
        this.dataurl = dataurl;
        this.version = version;
        this.fetch = fetchfn;
        this.documents = documents;
        this.docversions = null;
        this.pkgindexes = {}
    }

    async loadVersions(): Promise<DocVersions | APIError> {
        if (this.docversions) {
            return this.docversions;
        } else {
            const docversions = await this.safeLoad('versions', DocVersions)
            if (DocVersions.guard(docversions)) {
                this.docversions = docversions
            }
            return docversions;
        }
    }

    async loadDocumentIndex(version: string): Promise<DocIndex | APIError> {
        const config = await this.loadVersionConfig(version)
        if (!DocVersion.guard(config)) { return config }
        try {
            const indexes = await Promise.all(config.dependencies.map(this.loadPackageIndex.bind(this)))
            const error = indexes.find(APIError.guard)
            if (error === undefined) {
                return Object.assign({}, ...indexes.filter(DocIndex.guard))
            } else {
                return error
            }
        } catch (e) {
            console.log(e)
            return {x: 1}
        }
    }

    async loadPackageIndex(pkg: string): Promise<DocIndex | APIError> {
        if (pkg in this.pkgindexes) {
            return this.pkgindexes[pkg]
        }
        const index = await this.safeLoad(`${pkg}/index`, DocIndex)
        if (DocIndex.guard(index)) {
            this.pkgindexes[pkg] = index
        }
        return index
    }

    async loadVersionConfig(version: string): Promise<DocVersion | APIError> {
        const versions = await this.loadVersions()
        if (DocVersions.guard(versions)) {
            if (version in versions) {
                return versions[version]
            } else {
                return { type: 'invalidversion', version, versions: Object.keys(versions) }
            }
        } else {
            return versions
        }
    }

    async loadDocument(documentId: string): Promise<Document | APIError> {
        if (documentId in this.documents) {
            return this.documents[documentId]
        }
        const doc = await this.safeLoad(documentId, Document)
        if (Document.guard(doc)) {
            this.documents[documentId] = doc
        }
        return doc
    }

    async loadDocuments(documentIds: string[]): Promise<(Document | APIError)[]> {
        return Promise.all(documentIds.map(this.loadDocument.bind(this)))
    }

    async safeLoad<T>(document: string, record: RuntypeBase<T>): Promise<T | APIError> {
        const url = `${this.dataurl}/${document}.json`
        try {
            const r = await this.fetch(url);
            if (r.ok) {
                const data = await r.json();
                return record.check(data);
            } else {
                if (r.status == 404) {
                    return { type: 'docnotfound', url, document }
                }

                throw Error("UNKNOWN NETWORK ERROR")
            }
        } catch (e) {
            const msg = e.message
            if (e instanceof SyntaxError) {
                return { url, type: 'malformedjson' };
            } else if (e instanceof ValidationError) {
                return { type: 'schema', code: e.code, details: e.details }
            } else if ('cause' in e) {

                // Network errors
                if (e.cause.code == 'ECONNREFUSED') {
                    return { type: 'devserverunavailable', host: e.cause.address, port: e.cause.port };
                } else {
                    return { type: 'networkerror', message: e.message, url }
                }
            } else if (msg.startsWith("CORS")) {
                // dev server will not set CORS header when document does not exist
                return { type: 'docnotfound', url, document }
            } else {
                console.log("Unknown error!")
                console.log(url)
                console.log(Object.keys(e))
                console.log(e.message)
                console.log(e)
                return { type: 'unknown', error: e, url }
            }
        }

    }
}

export function throwAPIError(maybeerror) {
    if (APIError.guard(maybeerror)) {
        throw error(getStatusCode(maybeerror), JSON.stringify({ message: maybeerror }));
    }
}
