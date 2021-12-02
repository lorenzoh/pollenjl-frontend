export function compare(keys: string[], reverse = false) {
    return (o1, o2) => {
        if (keys.length == 0) {
            return 0
        }
        const a = o1[keys[0]]
        const b = o2[keys[0]]

        if (a < b) {
            return reverse ? 1 : -1;
        }
        if (a > b) {
            return reverse ? -1 : 1;
        }
        return compare(keys.slice(1), reverse)(o1, o2);
    };
}

export const search = (index, searchTerm: string) => {
    if (searchTerm == '') {
        return []
    } else {
        return index.search(searchTerm).sort(compare('score'))
    }
}