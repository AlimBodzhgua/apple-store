'use server';

import { auth } from '@/shared/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import z from 'zod';

export type FormStateErrors = {
	email?: string[];
	password?: string[];
	name?: string[];
	general?: string;
}

export type FormStateType = {
    errors?: FormStateErrors;
    success?: boolean;
    message?: string;
};

const signUpFormSchema = z.object({
	email: z.email('Incorrect email format'),
	password: z.string().min(4, { message: 'Password must contain at least 4 characters.' }),
	name: z.string().min(3, { message: 'Name must contain at least 3 characters.' }),
});

export const signUpUserAction = async (
	prevState: FormStateType | null,
	data: FormData,
): Promise<FormStateType> => {
	const email = data.get('email');
	const password = data.get('password');
	const name = data.get('name');

	const validationResult = signUpFormSchema.safeParse({ email, password, name });

	if (!validationResult.success) {
		const flatten = z.flattenError(validationResult.error);

		return {
			errors: {
				email: flatten.fieldErrors.email,
				password: flatten.fieldErrors.password,
				name: flatten.fieldErrors.name,
			},
		};
	}

	try {
		await auth.api.signUpEmail({
			body: {
				email: email as string,
				password: password as string,
				name: name as string,
			},
		});

	} catch (error) {
		let errorMsg = 'An error occurred during sign up, reload the page or try it later';
		
		if (error instanceof Error) {
			errorMsg = error.message;
		}
		
		return { errors: { general: errorMsg } };
	}
	
	redirect('/');
};

const signInFormSchema = z.object({
	email: z.email('Incorrect email format'),
	password: z.string().min(4, { message: 'Password must contain at least 4 characters.' }),
});

export const signInUserAction = async (
	prevState: FormStateType | null,
	data: FormData,
): Promise<FormStateType> => {
	const email = data.get('email');
	const password = data.get('password');

	const validationResult = signInFormSchema.safeParse({ email, password });

	if (!validationResult.success) {
		const flattened = z.flattenError(validationResult.error);

		return {
			errors: {
				email: flattened.fieldErrors.email,
				password: flattened.fieldErrors.password,
			},
		};
	}

	try {
		await auth.api.signInEmail({
			body: {
				email: email as string,
				password: password as string,
			},
		});

	} catch (error) {
		let errorMsg = 'An error occurred during sign in, reload the page or try it later';

		if (error instanceof Error) {
			errorMsg = error.message;
		}

		return { errors: { general: errorMsg } };
	}
	
	redirect('/');
};

export const signOutUserAction = async () => {
	await auth.api.signOut({
		headers: await headers(),
	})
}