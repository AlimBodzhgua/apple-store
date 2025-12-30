'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/shared/lib/utils';
import { useFormStatus } from 'react-dom';

type SubmitButtonProps = {
	className?: string;
};

export function SubmitButton({ className }: SubmitButtonProps) {
	const { pending } = useFormStatus();

	return (
		<Button
			type='submit'
			className={cn(className, 'w-full my-4 bg-blue-500 hover:bg-blue-600')}
			disabled={pending}
		>
			{pending ? 'Loading' : 'Save'}
		</Button>
	);
}