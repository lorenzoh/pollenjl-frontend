import data from '../../dev/function.json';

export async function get({ params }) {
	const { symbolid } = params;

	return {
		body: data
	};
}
