'use client';

import { ReactNode, useActionState } from 'react';
import { createProductAction, type DashboardFormsStateType } from '@/app/actions/dashboard';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/shared/lib/utils';
import { SubmitButton } from '../submit-button';

type CreateProductProps = {
	className?: string;
	additionalFormSelectors: ReactNode;
};

const initialState: DashboardFormsStateType = {
	errors: undefined,
	success: false,
	message: '',
};

export function CraeteProductForm(props: CreateProductProps) {
	const { additionalFormSelectors, className } = props;
	const [state, formAction] = useActionState(createProductAction, initialState);

	return (
		<form action={formAction} className={cn(className)}>
			<div className='mb-4'>
				<Label htmlFor='name' className='pl-1 mb-1'>
					Name
				</Label>
				<Input name='name' id='name' placeholder='Enter name' />

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
					<Input name='slug' id='slug' placeholder='Enter slug' />
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
