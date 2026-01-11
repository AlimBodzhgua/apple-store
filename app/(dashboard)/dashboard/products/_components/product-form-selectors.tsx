import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/shared/lib/utils';

import { CategorySelect } from './category-select';
import { ColorSelect } from './color-select';

type ProductFormSelectorsProps = {
	className?: string;
};

export function ProductFormSelectors({ className }: ProductFormSelectorsProps) {
	return (
		<div className={cn('flex justify-between gap-8 mb-4', className)}>
			<Suspense fallback={<Skeleton className='h-[30px] w-[260px] rounded mt-5' />}>
				<ColorSelect />
			</Suspense>

			<Suspense fallback={<Skeleton className='h-[30px] w-[260px] rounded mt-5' />}>
				<CategorySelect />
			</Suspense>
		</div>
	);
};
