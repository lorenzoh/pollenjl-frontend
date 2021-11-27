export function compare(key: string, reverse = false) {
    return (a, b) => {
        if (a[key] < b[key]) {
            return reverse ? 1 : -1;
        }
        if (a[key] > b[key]) {
            return reverse ? -1 : 1;
        }
        return 0;
    };
}

export const search = (index, searchTerm: string) => {
    if (searchTerm == '') {
        return []
    } else {
        return index.search(searchTerm).sort(compare('score'))
    }
}