'use client';

import { useActionState } from 'react';
import { createCategoryAction, updateCategoryAction, type DashboardFormsStateType } from '@/app/actions/dashboard';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/shared/lib/utils';
import { SubmitButton } from '../submit-button';

type UpdateCategoryFormProps = {
	type: 'update';
	id: string;
	initialName: string;
	initialDescription: string;
	className?: string;
}

type CreateCategoryFormProps = {
	type: 'create';
	className?: string;
};

type CategoryFormProps = CreateCategoryFormProps | UpdateCategoryFormProps;


const matpToCategoryAction = {
	create: createCategoryAction,
	update: updateCategoryAction,
}

const initialState: DashboardFormsStateType = {
	errors: undefined,
	success: false,
	message: '',
};

export function CategoryForm(props: CategoryFormProps) {
	const { type, className } = props;
	const [state, formAction] = useActionState(matpToCategoryAction[type], initialState);

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
