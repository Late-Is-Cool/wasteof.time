import type { Actions } from './$types';
import { fail, error } from '@sveltejs/kit';
import { TURNSTILE_SECRET_SITE_KEY } from '$env/static/private';
import { validateData } from '$lib/utils';
import { usernameExists } from '$lib/helpers';
import { registerUser } from '$lib/schemas';

interface TokenValidateResponse {
	'error-codes': string[];
	success: boolean;
	action: string;
	cdata: string;
}

async function validateToken(token: string, secret: string) {
	const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
		method: 'POST',
		headers: {
			'content-type': 'application/json'
		},
		body: JSON.stringify({
			response: token,
			secret: secret
		})
	});

	const data: TokenValidateResponse = await response.json();

	return {
		turnstileSuccess: data.success,
		turnstileError: data['error-codes']?.length ? data['error-codes'][0] : null
	};
}

export const actions = {
	default: async ({ request, locals }) => {
		const form = await request.formData();
		const { formData, errors } = await validateData(form, registerUser);

		const { turnstileSuccess, turnstileError } = await validateToken(
			<string>form.get('cf-turnstile-response'),
			TURNSTILE_SECRET_SITE_KEY
		);

		if (!turnstileSuccess) {
			return fail(400, {
				turnstileError: turnstileError || 'Invalid Captcha'
			});
		}

		if (errors) {
			return fail(400, {
				data: formData,
				formError: errors.fieldErrors
			});
		}

		try {
			console.log(await usernameExists(locals.pb, formData?.username));
			if (await usernameExists(locals.pb, formData?.username)) {
				console.log('yea');
				return fail(400, {
					data: formData,
					usernameExists: true
				});
			}
			console.log('bruh!');
			await locals.pb.collection('users').create({
				...formData,
				passwordConfirm: formData.password,
				displayName: formData.username,
				biography: "I'm wasting time boooo"
			});
			await locals.pb.collection('users').authWithPassword(formData.username, formData.password);
		} catch (err) {
			console.log(err, ':(');
			throw error(500, 'Something happened...');
		}
	}
} satisfies Actions;
