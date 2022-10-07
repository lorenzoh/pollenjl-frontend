import { Array, Number, Record, String, Dictionary, type Static, Unknown, Union, Lazy, Literal, Boolean } from 'runtypes'



// Definitions for documents


export const Node = Record({
    tag: String,
    attributes: Dictionary(Unknown, String),
    children: Array(Lazy(() => Tree)),
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

export const Tree = Union(Node, Leaf)
export type Tree = Static<typeof Tree>

/* A top-level document that is written by the Pollen.jl backend. */

/* Backlink information that is included both as an attribute on documents,
 and as an attribute in every packages `DocIndex`. */
export const Backlink = Record({ tag: String, title: String, docid: String })
export type Backlink = Static<typeof Backlink>

export const DocumentAttributes = Record({
    title: String,
    backlinks: Array(Backlink),
})

export const Document = Node.extend({
    tag: Union(Literal('documentation'), Literal('document'), Literal('sourcefile')),
    attributes: DocumentAttributes
})
export type Document = Static<typeof Document>

// Interfaces for ModuleInfo structs

export const RefKind = Union(
    Literal('struct'), Literal('function'), Literal('module'), Literal('abstract type'), Literal('const'))

export const SymbolInfo = Record({
    id: String,
    kind: RefKind,
    module_id: String,
    name: String,
    parent_module_id: String.optional(),
    public: Boolean,
})
export type SymbolInfo = Static<typeof SymbolInfo>

export const MethodInfo = Record({
    symbol_id: String,
    module_id: String,
    file: String,
    line: Number.withConstraint(n => n > 0),
    signature: String,
})
export type MethodInfo = Static<typeof MethodInfo>

export const FileInfo = Record({
    package_id: String,
    file: String,
})


// Extended interfaces for documents

export const SrcAttributes = DocumentAttributes.extend({
    path: String,
    module_id: String,
    package_id: String,
})
export type SrcAttributes = Static<typeof SrcAttributes>

export const RefAttributes = DocumentAttributes.extend({
    kind: RefKind,
    module_id: String,
    package_id: String,
    symbol_id: String,
    exported: Boolean,
})
export type RefAttributes = Static<typeof RefAttributes>

export const RefAttributesModule = RefAttributes.extend({
    kind: Literal('module'),
    symbols: Array(SymbolInfo),
    files: Array(FileInfo),
})
export type RefAttributesModule = Static<typeof RefAttributesModule>

export const RefAttributesFunction = RefAttributes.extend({
    kind: Literal('function'),
    methods: Array(MethodInfo),
})
export type RefAttributesFunction = Static<typeof RefAttributesFunction>


export const RefDocument = Document.extend({attributes: RefAttributes})
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