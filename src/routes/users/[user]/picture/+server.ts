import type { RequestHandler } from './$types';
import { createAvatar } from '@dicebear/core';
import { thumbs } from '@dicebear/collection';
import type { User } from '$lib/types';

export const GET: RequestHandler = async ({ params, locals, fetch }) => {
	const pbUserList = await locals.pb.collection('users').getFullList(undefined, {
		$autoCancel: false
	});
	const pbUser = pbUserList.find(
		(data) => data?.username.toLowerCase() === params.user.toLowerCase()
	) as User;

	let userAvatar: string | Blob = await createAvatar(thumbs, {
		seed: params.user,
		backgroundColor: ['ffffff']
	}).toString();

	let type = 'image/svg+xml';

	if (pbUser && pbUser.avatar) {
		const pbAvatar = await locals.pb.getFileUrl(pbUser, pbUser.avatar);
		userAvatar = await (await fetch(pbAvatar)).blob();
		type = userAvatar.type;
	}

	// console.log(userAvatar, mimeType);

	return new Response(userAvatar, {
		headers: {
			'Content-Type': type
		}
	});
};
