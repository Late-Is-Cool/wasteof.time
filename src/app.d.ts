// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import Pocketbase from 'pocketbase';
import { User } from '$lib/types';
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			pb: Pocketbase;
			user: User | undefined;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
