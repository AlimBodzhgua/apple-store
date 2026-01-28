'use client';

import type { SidebarItemType } from './sidebar-list';

import Link from 'next/link';
import { cn } from '@/shared/lib/utils';

type SidebarItemProps = {
	item: SidebarItemType;
	collapsed?: boolean;
	className?: string;
};

export function SidebarItem(props: SidebarItemProps) {
	const {
		item,
		collapsed,
		className,
	} = props;

	return (
		<li key={item.path}>
			<Link
				href={`/dashboard${item.path}`}
				className={cn(
					'flex items-center p-1 gap-2 my-3 text-[1.2rem] rounded-2xl hover:text-gray-950 hover:bg-amber-50',
					collapsed && 'justify-center gap-0',
					className,
				)}
			>
				{item.Icon}
				<div
					className={cn(
						'transition-transform w-full overflow-hidden',
						collapsed && 'w-0',
					)}
				>
					{item.name}
				</div>
			</Link>
		</li>
	);
};
