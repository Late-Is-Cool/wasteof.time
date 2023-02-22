import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ url, cookies }) => {
		console.log('bing');
	}
};
