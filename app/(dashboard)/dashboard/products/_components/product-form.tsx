'use client';

import type { ReactNode } from 'react';
import type { DashboardFormsStateType } from '../../types';
import type { FormMode } from '@/shared/constants/form';

import { useActionState, useEffect } from 'react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/shared/lib/utils';

import { SubmitButton } from '../../_components/submit-button';
import { createProductAction, updateProductAction } from '../actions';

type UpdateProductFormProps = {
	type: typeof FormMode.update;
	id: string;
	initialName: string;
	initialSlug: string;
	initialDescription: string;
	initialPrice: number;

	onSuccess?: () => void;
	additionalFormSelectors?: ReactNode;
	className?: string;
};

type CreateProductFormProps = {
	type: typeof FormMode.create;

	onSuccess?: () => void;
	className?: string;
	additionalFormSelectors?: ReactNode;
};

type ProductFormProps = CreateProductFormProps | UpdateProductFormProps;

const mapToProductFormActions = {
	update: updateProductAction,
	create: createProductAction,
} as const;

const initialState: DashboardFormsStateType = {
	errors: undefined,
	success: false,
	message: '',
};

export function ProductForm(props: ProductFormProps) {
	const {
		type,
		onSuccess,
		additionalFormSelectors,
		className,
	} = props;
	const [state, formAction] = useActionState(mapToProductFormActions[type], initialState);

	useEffect(() => {
		if (state.success && onSuccess) {
			onSuccess();

			toast.success(state.message, { position: 'top-center' });
		}
	}, [onSuccess, state]);

	return (
		<form action={formAction} className={cn(className)}>
			{type === 'update' && (
				<div className='mb-4'>
					<Label className='pl-1 mb-1'>
						id
					</Label>
					<Input
						name='id'
						defaultValue={props.id}
						className='read-only:bg-gray-200 read-only:cursor-not-allowed pointer-events-none'
						readOnly
					/>
				</div>
			)}
			<div className='mb-4'>
				<Label htmlFor='name' className='pl-1 mb-1'>
					Name
				</Label>
				<Input
					name='name'
					id='name'
					placeholder='Enter name'
					defaultValue={type === 'update' ? props.initialName : undefined}
					autoFocus
				/>

				{state.errors?.name && (
					<div className='text-red-400 w-full text-left pl-1 mt-2'>
						{state.errors.name}
					</div>
				)}
			</div>
			<div className='flex justify-between items-center gap-5 mb-4'>
				<div className='w-[50%]'>
					<Label htmlFor='slug' className='pl-1 mb-1'>
						Slug
					</Label>
					<Input
						name='slug'
						id='slug'
						placeholder='Enter slug'
						defaultValue={type === 'update' ? props.initialSlug : undefined}

					/>
					{state.errors?.slug && (
						<div className='text-red-400 w-full text-left pl-1 mt-2'>
							{state.errors.slug}
						</div>
					)}
				</div>

				<div className='w-[50%]'>
					<Label htmlFor='price' className='pl-1 mb-1'>
						Price
					</Label>
					<div className='relative'>
						<Input
							name='price'
							id='price'
							placeholder='Price'
							type='number'
							className='pr-6'
							defaultValue={type === 'update' ? props.initialPrice : undefined}
						/>
						<span className='absolute top-2 right-2 text-muted-foreground text-sm font-bold'>
							$
						</span>
					</div>

					{state.errors?.price && (
						<div className='text-red-400 w-full text-left pl-1 mt-2'>
							{state.errors.price}
						</div>
					)}
				</div>
			</div>

			<div className='mb-4'>
				<Label htmlFor='description' className='pl-1 mb-1'>
					Description
				</Label>
				<Textarea
					name='description'
					id='description'
					placeholder='Enter product description'
					defaultValue={type === 'update' ? props.initialDescription : undefined}
				/>
				{state.errors?.description && (
					<div className='text-red-400 w-full text-left pl-1 mt-2'>
						{state.errors.description}
					</div>
				)}
			</div>

			{additionalFormSelectors}

			{state.errors?.categoryId && (
				<div className='text-red-400 w-full text-left pl-1 mt-2'>
					{state.errors.categoryId}
				</div>
			)}
			{state.errors?.colorId && (
				<div className='text-red-400 w-full text-left pl-1 mt-2'>
					{state.errors.colorId}
				</div>
			)}

			<SubmitButton />
		</form>
	);
}
