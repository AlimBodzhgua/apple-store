'use client';

import type { DashboardFormsStateType } from '../../types';
import type { FormMode } from '@/shared/constants/form';

import { useActionState, useEffect } from 'react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/shared/lib/utils';

import { SubmitButton } from '../../_components/submit-button';
import { createCategoryAction, updateCategoryAction } from '../actions';

type UpdateCategoryFormProps = {
	type: typeof FormMode.update;
	id: string;
	initialName: string;
	initialDescription: string;
	onSuccess?: () => void;
	className?: string;
};

type CreateCategoryFormProps = {
	type: typeof FormMode.create;
	onSuccess?: () => void;
	className?: string;
};

type CategoryFormProps = CreateCategoryFormProps | UpdateCategoryFormProps;

const matpToCategoryAction = {
	create: createCategoryAction,
	update: updateCategoryAction,
} as const;

const initialState: DashboardFormsStateType = {
	errors: undefined,
	success: false,
	message: '',
};

export function CategoryForm(props: CategoryFormProps) {
	const {
		type,
		onSuccess,
		className,
	} = props;
	const [state, formAction] = useActionState(matpToCategoryAction[type], initialState);

	useEffect(() => {
		if (state.success && onSuccess) {
			onSuccess();

			toast.success(state.message, { position: 'top-center' });
		}
	}, [onSuccess, state]);

	return (
		<form className={cn(className)} action={formAction} autoFocus={false}>
			{type === 'update' && (
				<div className='mb-3'>
					<Label className='pl-1 mb-1'>id</Label>
					<Input
						name='id'
						defaultValue={props.id}
						className='read-only:bg-gray-200 read-only:cursor-not-allowed pointer-events-none'
						readOnly
					/>
				</div>
			)}
			<div className='mb-3'>
				<Label htmlFor='name' className='pl-1 mb-1'>
					Name
				</Label>
				<Input
					name='name'
					id='name'
					placeholder='Enter name'
					className='mb-3'
					defaultValue={type === 'update' ? props.initialName : undefined}
					autoFocus
				/>

				{state.errors?.name && (
					<div className='text-red-400 w-full text-left pl-1'>
						{state.errors.name}
					</div>
				)}
			</div>

			<div className='mb-3'>
				<Label htmlFor='description' className='pl-1 mb-1'>
					Description
				</Label>
				<Textarea
					name='description'
					id='description'
					placeholder='Enter category description'
					className='mb-3'
					defaultValue={type === 'update' ? props.initialDescription : undefined}
				/>

				{state.errors?.description && (
					<div className='text-red-400 w-full text-left pl-1'>
						{state.errors.description}
					</div>
				)}
			</div>

			{state.errors?.general && (
				<div className='text-red-400 w-full text-left pl-1'>
					{state.errors.general}
				</div>
			)}

			<SubmitButton />
		</form>
	);
}
