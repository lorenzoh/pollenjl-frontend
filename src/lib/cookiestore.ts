import { browser } from "$app/environment"
import { writable, type Writable } from "svelte/store"

export function localStorageStore<T>(key: string, defaultValue: T = null): Writable<T> {
    if (browser) {
        let value = window.localStorage.getItem(key)
        const initialValue = value === undefined ? defaultValue : JSON.parse(value)

        const { subscribe, set, update } = writable(initialValue)
        const newSet = val => {
            window.localStorage.setItem(key, JSON.stringify(val))
            return set(val);
        }
        return {
            subscribe,
            set: newSet,
            update: f => {
                return update(val => { newSet(f(val)); });
            },
        }
    } else {
        return writable(defaultValue);
    }
}