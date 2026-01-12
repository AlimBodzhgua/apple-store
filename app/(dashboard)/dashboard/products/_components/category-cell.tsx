import type { Category } from '@/prisma/generated/prisma/client';

import { useEffect, useState } from 'react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/shared/lib/utils';

type CategoryCellProps = {
	categoryId: string;
	className?: string;
};

export function CategoryCell(props: CategoryCellProps) {
	const { categoryId, className } = props;
	const [category, setCategory] = useState<Category | undefined>();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		const getColor = async (): Promise<Category | undefined> => {
			setIsLoading(true);

			try {
				const response = await fetch(`http://localhost:3000/api/categories/${categoryId}`);

				if (!response.ok) {
					throw new Error('Error fetching color');
				}
				const color = response.json();

				return color;
			} catch (error) {
				console.error(error);
			} finally {
				setIsLoading(false);
			}
		};

		getColor().then(setCategory);
	}, [categoryId]);

	return (
		<HoverCard>
			<HoverCardTrigger
				className={cn(
					'text-left font-medium hover:cursor-pointer underline-offset-3 hover:underline',
					className,
				)}
			>
				{categoryId}
			</HoverCardTrigger>
			<HoverCardContent className='w-fit p-2.5'>
				{isLoading
					? <Skeleton className='h-[24px] w-[150px] rounded' />
					: (
						<div className='font-medium text-center'>
							{category?.name}
						</div>
				)}
			</HoverCardContent>
		</HoverCard>
	);
};
