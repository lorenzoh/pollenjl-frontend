import { error, redirect } from '@sveltejs/kit';
import { base } from '$app/paths';
import { makeDocumentCache } from '$lib/navigation';

export const prerender = true;

export async function load({ params, fetch}) {
	const { version } = params;

	const versions = await fetch(`${base}/api/versions.json`).then(r => r.json())
	if (!(version in versions)) {
		throw error(404, `Invalid version: "${version}". Available versions are: ${JSON.stringify(Object.keys(versions))}`)
	}
	
	const dataUrl = `${base}/api/${version}`;
	throw redirect(301, `${base}/${version}/Pollen@stable/ref/Pollen.Leaf`);
	//throw redirect(301, `${base}/${version}/${versions[version].defaultDocument}`);
}
