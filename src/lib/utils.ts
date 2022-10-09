export function shortenfilename(file: string) {
	const parts = file.split('/');
	const idx = parts.findIndex((p) => p == 'src');
	if (idx == -1) {
		return file;
	}
	return parts.slice(idx + 1, parts.length).join('/');
}

export function shortenfilenamekeepmodule(file: string) {
	const parts = file.split('/');
	const idx = parts.findIndex((p) => p == 'src');
	if (idx < 1) {
		return file;
	}
	return parts.slice(idx - 1, parts.length).join('/');
}


export async function loaddocument(documents, docid: string, documentroot: string) {
	const url = `${documentroot}/${docid}.json`;
	const request = await fetch(url);
	const document = request.json();
	documents[docid] = await document;
	return document;
}

export function computevisibility(
	position: number,
	viewerwidth: number,
	containerwidth: number,
	scroll: number
) {
	const start = position * viewerwidth;
	const end = start + viewerwidth;
	// visible start and end points
	const startvis = Math.max(scroll, start);
	const endvis = Math.min(scroll + containerwidth, end);

	const w = endvis - startvis;
	return w;
}

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