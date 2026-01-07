'use client';

import { useActionState } from 'react';
import { SelectColorDropdown } from '@/components/shared';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { FormMode } from '@/shared/constants/form';
import { cn } from '@/shared/lib/utils';

import type { DashboardFormsStateType } from '../../types';
import { SubmitButton } from '../../submit-button';
import { createColorAction, updateColorAction } from '../actions';

type UpdateColorFormProps = {
	type: typeof FormMode.update;
	id: string;
	initialName: string;
	initialSlug: string;
	initialHexCode: string;
	className?: string;
};

type CreateColorFormProps = {
	type: typeof FormMode.create;
	className?: string;
};

type ColorFormProps = CreateColorFormProps | UpdateColorFormProps;

const initialState: DashboardFormsStateType = {
	errors: undefined,
	success: false,
	message: '',
};

const mapToColorFormActions = {
	update: updateColorAction,
	create: createColorAction,
} as const;

export function ColorForm(props: ColorFormProps) {
	const {
		type,
		className,
	} = props;
	const [state, formAction] = useActionState(mapToColorFormActions[type], initialState);

	return (
		<form action={formAction} className={cn(className)}>
			{type === 'update' && (
				<div className='mb-3'>
					<Label className='pl-1 mb-1'>Id</Label>
					<Input
						name='id'
						defaultValue={props.id}
						className='read-only:bg-gray-200 read-only:cursor-not-allowed pointer-events-none'
						readOnly
					/>
				</div>
			)}
			<div className='flex gap-5 w-full mb-3'>
				<div className='flex flex-col gap-1 w-[50%]'>
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

				<div className='flex flex-col gap-1 w-[50%]'>
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
			</div>
			<div className='flex gap-4'>
				<div className='flex w-full justify-between gap-4 items-end'>
					<div className='w-full'>
						<Label htmlFor='hexCode' className='pl-1 mb-1'>
							Hex Code
						</Label>
						<Input
							name='hexCode'
							id='hexCode'
							placeholder='Enter hex code'
							defaultValue={type === 'update' ? props.initialHexCode : undefined}
						/>
						{state.errors?.hexCode && (
							<div className='text-red-400 w-full text-left pl-1 mt-2'>
								{state.errors.hexCode}
							</div>
						)}
					</div>
					<SelectColorDropdown className={state.errors?.hexCode && 'mb-8'} />
				</div>
			</div>

			{state.errors?.general && (
				<div className='text-red-400 w-full text-left'>{state.errors.general}</div>
			)}

			<SubmitButton />
		</form>
	);
}
