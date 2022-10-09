import type { API } from "$lib/api"
import type { SvelteComponent } from "svelte"
import type { Readable, Writable } from "svelte/store"
import type { DocIndex, DocVersions } from "./types"

export interface AppContext {
    config: AppConfig
    stores: {
        documentIds: Writable<string[]>,
        preferMultiColumn: Writable<boolean>,
        multiColumn: Readable<boolean>,
    }
    api: API,
    data: {
        docindex: DocIndex,
        versions: DocVersions,
    }
}

interface AppConfig {
    urls: AppConfigUrls
    views: Record<string, SvelteComponent>
    specialviews: Record<string, SvelteComponent>
    version: string
    debug: boolean
}

interface AppConfigUrls {
    base: string,
    data: string,
}

export const CtxPollen = {};