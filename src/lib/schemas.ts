import { z } from 'zod';

export const registerUser = z.object({
	username: z
		.string({ required_error: 'Username is required.' })
		.regex(/^[a-zA-Z\-_0-9]*$/, {
			message: 'Username can only have letters, numbers, dashes, and underscores.'
		})
		.min(3, { message: 'Username must be 3 to 20 characters long.' })
		.max(20, { message: 'Username must be 3 to 20 characters long.' })
		.trim(),
	password: z
		.string({ required_error: 'Password is required.' })
		.min(8, { message: 'Password must be 8 to 200 characters long.' })
		.max(200, { message: 'Password must be 8 to 200 characters long.' })
});

export const loginUser = z.object({
	username: z.string({ required_error: 'Username is required' }),
	password: z.string({ required_error: 'Password is required' })
});
