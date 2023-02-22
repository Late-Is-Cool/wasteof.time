import type Pocketbase from 'pocketbase';

export const usernameExists = async (pb: Pocketbase, username: string) => {
	try {
		const users = await pb.collection('users').getFullList();
		const user = users.find((data) => data?.username.toLowerCase() === username.toLowerCase());
		if (!user) {
			return false;
		} else {
			return true;
		}
	} catch (err) {
		console.error(err);
		return true;
	}
};
