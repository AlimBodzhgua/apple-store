'use client';

import { useActionState } from 'react';
import { FormStateType, signInUserAction } from '@/app/actions/auth';
import { PasswordInput } from '@/components/ui/password-input';
import { Container } from '@/components/shared/container';
import { Input } from '@/components/ui/input';
import { cn } from '@/shared/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import { SubmitButton } from '../submit-button';

type SignInProps = {
	className?: string;
};

const initialState: FormStateType = {
    errors: {},
    success: false,
    message: ''
};

export default function SignIn({ className }: SignInProps) {
	const [state, formAction] = useActionState(signInUserAction, initialState);

	return (
		<div className={cn(className, 'text-center')}>
			<Container>
				<form
					className='flex items-center justify-center gap-10 w-full mb-3 my-30'
					action={formAction}
				>
					<Image
						src='/apple-products.jpg'
						alt='apple products'
						width={265}
						height={120}
						className='rounded'
					/>
					<div className='flex flex-col justify-center items-center gap-4 w-[40%]'>
						<h1 className='text-2xl font-bold'>Sign In</h1>
						<Input placeholder='Email' name='email' type='email' />
						{state.errors?.email && (
							<div className='text-red-400 w-full text-left'>
								{state.errors.email}
							</div>
						)}

						<PasswordInput placeholder='Password' name='password' />
						{state.errors?.password && (
							<div className='text-red-400 w-full text-left'>
								{state.errors.password}
							</div>
						)}

						{state.errors?.general && (
							<div className='text-red-400 w-full text-left'>
								{state.errors.general}
							</div>
						)}

						<SubmitButton text='Sign In	' />
						<div>
							Dont have an account? <Link href='/signUp'>sign up</Link>
						</div>
					</div>
				</form>
			</Container>
		</div>
	);
}
