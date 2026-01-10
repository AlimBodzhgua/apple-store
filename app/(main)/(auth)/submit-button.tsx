'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/shared/lib/utils';

type SubmitButtonProps = {
	text: string;
	className?: string;
};

export function SubmitButton(props: SubmitButtonProps) {
	const { text, className } = props;
	const { pending } = useFormStatus();

	return (
		<Button type='submit' className={cn('w-full', className)} disabled={pending}>
			{pending ? 'Loading...' : text}
		</Button>
	);
}
