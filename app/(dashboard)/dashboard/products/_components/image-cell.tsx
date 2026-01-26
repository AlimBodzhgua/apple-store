import Image from 'next/image';

import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { cn } from '@/shared/lib/utils';

type ImageCellProps = {
	imageName: string;
	productId: string;
	className?: string;
};

export function ImageCell(props: ImageCellProps) {
	const { productId, imageName, className } = props;

	return (
		<HoverCard>
			<HoverCardTrigger
				className={cn(
					'text-left font-medium hover:cursor-pointer underline-offset-3 hover:underline',
					className,
				)}
			>
				{imageName}
			</HoverCardTrigger>
			<HoverCardContent className='w-fit p-1.5'>
				<Image
					src={`/api/products/${productId}/image`}
					alt={imageName}
					width={350}
					height={260}
					className='object-cover rounded-sm'
					unoptimized
				/>
			</HoverCardContent>
		</HoverCard>
	);
}
