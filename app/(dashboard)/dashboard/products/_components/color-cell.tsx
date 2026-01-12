import type { Color } from '@/prisma/generated/prisma/client';

import { useEffect, useState } from 'react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/shared/lib/utils';

type ColorCellProps = {
	colorId: string;
	className?: string;
};

export function ColorCell(props: ColorCellProps) {
	const { colorId, className } = props;
	const [color, setColor] = useState<Color>();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		const getColor = async (): Promise<Color | undefined> => {
			setIsLoading(true);
			try {
				const response = await fetch(`http://localhost:3000/api/colors/${colorId}`);

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

		getColor().then(setColor);
	}, [colorId]);

	return (
		<HoverCard>
			<HoverCardTrigger
				className={cn(
					'text-left font-medium hover:cursor-pointer underline-offset-3 hover:underline',
					className,
				)}
			>
				{colorId}
			</HoverCardTrigger>
			<HoverCardContent className='w-fit p-2.5'>
				{isLoading
					? <Skeleton className='h-[24px] w-[150px] rounded' />
					: (
						<div className='flex flex-row items-center gap-2'>
							<span
								className='h-3.5 w-3.5 block rounded'
								style={{ backgroundColor: color?.hexCode }}
							/>
							{color?.name}
						</div>
				)}
			</HoverCardContent>
		</HoverCard>
	);
};
