import { loginUser } from '$lib/schemas';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { validateData } from '$lib/utils';

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const form = await request.formData();
		const { formData, errors } = await validateData(form, loginUser);

		if (errors) {
			return fail(400, {
				data: formData,
				formError: errors.fieldErrors
			});
		}

		try {
			await locals.pb.collection('users').authWithPassword(formData.username, formData.password);
		} catch (e) {
			console.log(e);
			return fail(400, {
				data: formData,
				credentials: true
			});
		}
	}
};
