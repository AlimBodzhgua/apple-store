'use client';

import { useActionState } from 'react';
import { createColorAction, type DashboardFormsStateType } from '@/app/actions/dashboard';
import { SelectColorDropdown } from '@/components/shared';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/shared/lib/utils';
import { SubmitButton } from '../submit-button';

type CraeteColorFormProps = {
	className?: string;
};

const initialState: DashboardFormsStateType = {
	errors: undefined,
	success: false,
	message: '',
};

export function CreateColorForm({ className }: CraeteColorFormProps) {
	const [state, formAction] = useActionState(createColorAction, initialState);

	return (
		<form action={formAction} className={cn(className)}>
			<div className='flex gap-5 w-full mb-3'>
				<div className='flex flex-col gap-1 w-[50%]'>
					<Label htmlFor='name' className='pl-1 mb-1'>
						Name
					</Label>
					<Input name='name' id='name' placeholder='Enter name' />
				</div>
				{state.errors?.name && (
					<div className='text-red-400 w-full text-left'>{state.errors.name}</div>
				)}

				<div className='flex flex-col gap-1 w-[50%]'>
					<Label htmlFor='slug' className='pl-1 mb-1'>
						Slug
					</Label>
					<Input name='slug' id='slug' placeholder='Enter slug' />
				</div>
				{state.errors?.slug && (
					<div className='text-red-400 w-full text-left'>{state.errors.slug}</div>
				)}
			</div>
			<div className='flex gap-4'>
				<div className='flex w-full justify-between items-end gap-4'>
					<div className='w-full'>
						<Label htmlFor='hexCode' className='pl-1 mb-1'>
							Hex Code
						</Label>
						<Input name='hexCode' id='hexCode' placeholder='Enter hex code' />
					</div>
					{state.errors?.hexCode && (
						<div className='text-red-400 w-full text-left'>
							{state.errors.hexCode}
						</div>
					)}

					<SelectColorDropdown />
				</div>
			</div>

			{state.errors?.general && (
				<div className='text-red-400 w-full text-left'>{state.errors.general}</div>
			)}

			<SubmitButton />
		</form>
	);
}
