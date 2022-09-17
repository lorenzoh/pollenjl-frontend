import { Array, Number, Record, String, Dictionary, type Static, Unknown, Union, Lazy, Literal } from 'runtypes'



// Definitions for documents

export const Tree = Lazy(() => Union(Node, Leaf))
export type Tree = Static<typeof Tree>

export const Node = Record({
    tag: String,
    attributes: Dictionary(Unknown, String),
    children: Array(Tree),
})
export type Node = Static<typeof Node>

const Mimes = Union(
    Literal("text/html"),
    Literal("text/plain"),
    Literal("image/jpeg"),
    Literal("image/png"),
)

export const Leaf = Union(String, Record({ mimes: Dictionary(String, Mimes) }))
export type Leaf = Static<typeof Leaf>

/* A top-level document that is written by the Pollen.jl backend. */

/* Backlink information that is included both as an attribute on documents,
 and as an attribute in every packages `DocIndex`. */
export const Backlink = Record({ tag: String, title: String, docid: String })

export const DocumentAttributes = Record({
    title: String,
    backlinks: Array(Backlink),
})

export const Document = Node.extend({
    tag: Union(Literal('documentation'), Literal('document'), Literal('sourcefile')),
    attributes: DocumentAttributes
})
export type Document = Static<typeof Document>

// Extended interfaces for :reference documents
export const RefKind = Union(
    Literal('struct'), Literal('function'), Literal('module'), Literal('abstract type'), Literal('const'))
export const RefAttributes = DocumentAttributes.extend({
    kind: RefKind,
    module_id: String,
    package_id: String,
    symbol_id: String,
})
export const RefDocument = Document.extend({})
export type RefDocument = Static<typeof RefDocument>

// Documentation version information, i.e. contents of versions.json

export const DocVersion = Record({
    dependencies: Array(String),
    title: String,
    linktree: Dictionary(Unknown, String),
    columnWidth: Number,
    defaultDocument: String,
}).asReadonly()
export type DocVersion = Static<typeof DocVersion>

export const DocVersions = Dictionary(DocVersion, String)
export type DocVersions = Static<typeof DocVersions>

export const DocIndex = Dictionary(Record({ title: String, tag: String, backlinks: Array(Backlink) }), String)
export type DocIndex = Static<typeof DocIndex>