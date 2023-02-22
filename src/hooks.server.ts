import { type Handle, redirect } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import pocketbase from '$lib/pocketbase';
import { dev } from '$app/environment';
import { serializeNonPOJOs } from '$lib/utils';
import type { User } from '$lib/types';

const auth = (async ({ event, resolve }) => {
	event.locals.pb = pocketbase;
	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	try {
		event.locals.pb.authStore.isValid && (await event.locals.pb.collection('users').authRefresh());
	} catch (_) {
		event.locals.pb.authStore.clear();
	}

	if (event.locals.pb.authStore.isValid) {
		event.locals.user = serializeNonPOJOs<User>(event.locals.pb.authStore.model as User);
	} else {
		event.locals.user = undefined;
	}

	const response = await resolve(event);

	response.headers.append(
		'set-cookie',
		event.locals.pb.authStore.exportToCookie({ secure: !dev, sameSite: 'lax' })
	);

	return response;
}) satisfies Handle;

const protectedRoutesCheck = (async ({ event, resolve }) => {
	if (event.route.id?.startsWith('/(restricted)') && !event.locals.user) {
		throw redirect(303, '/login');
	} else if (
		event.route.id?.startsWith('/(auth)') &&
		!event.route.id?.startsWith('/(auth)/logout') &&
		event.locals.user
	) {
		throw redirect(303, '/');
	}
	return await resolve(event);
}) satisfies Handle;

export const handle = sequence(auth, protectedRoutesCheck);
