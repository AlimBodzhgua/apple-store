'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/shared/lib/utils';
import { ReactNode, useState } from 'react';

type PageHeaderProps = {
	form: ReactNode;
	title: string;
	buttonText: string;
	className?: string;
};

export function PageHeader(props: PageHeaderProps) {
	const {
		title,
		buttonText,
		form,
		className,
	} = props;
	const [showForm, setShowForm] = useState<boolean>(false);

	const toggleShowForm = () => setShowForm((prev) => !prev);

	return (
		<>
			<div className={cn('flex justify-between items-center my-5 py-2 box-shadow-2', className)}>
				<h1 className='text-2xl font-bold'>{title}</h1>

				<Button onClick={toggleShowForm} className='bg-blue-500 hover:bg-blue-600'>
					{buttonText}
					<span className='text-2xl'>+</span>
				</Button>
			</div>

			{showForm && form}
		</>
	);
}