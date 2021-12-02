import { writable } from "svelte/store";


export function documentIdsStore(initial: string[] = []) {
    const { set, subscribe, update } = writable(initial);

    function set_(documentIds) {
        set(documentIds);
        setquery(documentIds);
    }
    function update_(f) {
        update(ids => {
            const ids_ = f(ids)
            setquery(ids_);
            return ids_
        });
    }
    function setquery(documentIds) {
        if (window && history) {

            // all but the first document ID are synced to the query parameter 'id'
            const query = new URLSearchParams()
            documentIds.slice(1).forEach(id => {
                query.append("id", id)
            })
            const qs = (documentIds.length > 1) ? '?' + query.toString() : ''


            history.pushState(null, '',  qs)
        }
    }

    return {
        subscribe, update: update_, set: set_
    }
}