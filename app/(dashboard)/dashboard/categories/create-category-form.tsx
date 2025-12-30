'use client';

import { useActionState } from 'react';
import { createCategoryAction, type DashboardFormsStateType } from '@/app/actions/dashboard';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/shared/lib/utils';
import { SubmitButton } from '../submit-button';

type CreateCategoryFormProps = {
	className?: string;
};

const initialState: DashboardFormsStateType = {
	errors: undefined,
	success: false,
	message: '',
};

export function CraeteCategoryForm({ className }: CreateCategoryFormProps) {
	const [state, formAction] = useActionState(createCategoryAction, initialState);

	return (
		<form className={cn(className)} action={formAction}>
			<Label htmlFor='name' className='pl-1 mb-1'>
				Name
			</Label>
			<Input name='name' id='name' placeholder='Enter name' className='mb-3' />

			{state.errors?.name && (
				<div className='text-red-400 w-full text-left'>{state.errors.name}</div>
			)}

			<Label htmlFor='description' className='pl-1 mb-1'>
				Description
			</Label>
			<Textarea
				name='description'
				id='description'
				placeholder='Enter category description'
				className='mb-3'
			/>

			{state.errors?.description && (
				<div className='text-red-400 w-full text-left'>{state.errors.description}</div>
			)}

			{state.errors?.general && (
				<div className='text-red-400 w-full text-left'>{state.errors.general}</div>
			)}

			<SubmitButton />
		</form>
	);
}
