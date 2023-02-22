import type { LayoutServerLoad } from './$types';
import { serializeNonPOJOs } from '$lib/utils';
import type { Message } from '$lib/types';

export const load = (async ({ locals }) => {
	const messageList = await locals.pb.collection('messages').getFullList(undefined, {
		filter: `sentTo.username = "${locals.user?.username}"`,
		$autoCancel: false
	});

	return {
		user: locals.user,
		messages: locals.user ? serializeNonPOJOs<Message[]>(messageList as Message[]) : []
	};
}) satisfies LayoutServerLoad;
