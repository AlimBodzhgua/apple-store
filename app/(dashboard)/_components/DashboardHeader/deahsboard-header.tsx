import type { FC } from 'react';
import { cn } from '@/shared/lib/utils';
import { Container } from '@/components/shared';
import { UserDropdownMenu } from '@/components/shared/user-dropdown-menu';

type DashboardHeaderProps = {
	className?: string;
};

export const DashboardHeader: FC<DashboardHeaderProps> = (props) => {
	const { className } = props;

	return (
		<header className={cn('bg-gray-400 w-full min-h-15', className)}>
			<Container className='flex justify-end items-center py-1 h-full'>
				<UserDropdownMenu variant='outline'/>
			</Container>
		</header>
	);
};
