import { getSiteContent } from '$lib/server/directus';

export async function load() {
	return {
		site: await getSiteContent()
	};
}
