

const INDICES = {}


function loadStorkIndex(indexUrl: string) {

}




export interface Excerpt {
    fields: any
    score: number
    text: string
    internal_annotations: any[]
    highlight_ranges: any[]
}
export interface Entry {
    url: string
    title: string
    fields: any
}

export interface SearchResult {
    entry: Entry
    excerpts: Excerpt[]
    score: number
    title_highlight_ranges: any[]
}

export interface SearchResults {
    total_hit_count: number
    url_prefix: string
    results: SearchResult[]
}

export interface Stork {
    initialize(): Promise<void>
    downloadIndex(name: string, url: string, options?: StorkDownloadOptions): Promise<void>
    search(index: string, term: string): 
}

export interface StorkDownloadOptions {

}
