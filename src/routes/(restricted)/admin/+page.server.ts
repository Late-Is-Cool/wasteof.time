import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	if (!locals.user?.roles.includes('admin')) {
		throw redirect(303, '/');
	}
	return {};
}) satisfies PageServerLoad;
