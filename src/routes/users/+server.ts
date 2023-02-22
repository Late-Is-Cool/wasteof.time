import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals }) => {
	return new Response(
		(await (await locals.pb.collection('users').getFullList()).length).toString()
	);
};
