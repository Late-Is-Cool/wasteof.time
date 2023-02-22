import { Record } from 'pocketbase';

interface User extends Record {
	id: string;
	username: string;
	email?: string;
	displayName?: string;
	avatar?: string;
	roles: ['beta', 'verified', 'admin', 'banned'];
	followers: User[];
	following: User[];
}

//

interface Message extends Record {
	id: string;
	content: string;
	sentTo?: User;
	read: boolean;
}
