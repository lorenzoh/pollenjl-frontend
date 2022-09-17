import { dev } from "$app/environment"
import { base } from "$app/paths"


export const getDataUrl = (version: string) => {
    return dev ? 'http://127.0.0.1:8000' : `${base}/data/${version}`
}

export const getAPIUrl = (version: string) => {
    return `${base}/api/${version}`
}