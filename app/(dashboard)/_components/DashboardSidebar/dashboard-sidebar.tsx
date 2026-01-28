'use client';

import type { FC } from 'react';

import {
	LayoutDashboard as LayoutDashboardIcon,
	PanelLeftOpen as PanelLeftOpenIcon,
	PanelRightOpen as PanelRightOpenIcon,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/shared/lib/utils';

import { SIDEBAR_LOCALSTORAGE_KEY } from '../../dashboard/constants';
import { SidebarItem } from './sidebar-item';
import { sidebarList } from './sidebar-list';

type DashboardSidebarProps = {
	className?: string;
};

export const DashboardSidebar: FC<DashboardSidebarProps> = () => {
	const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

	useEffect(() => {
		const collapsed = localStorage.getItem(SIDEBAR_LOCALSTORAGE_KEY);

		setIsCollapsed(!!collapsed);
	}, []);

	const toggleIsCollapsed = () => {
		setIsCollapsed((prev) => !prev);

		if (!isCollapsed) {
			localStorage.setItem(SIDEBAR_LOCALSTORAGE_KEY, 'collapsed');
		} else {
			localStorage.removeItem(SIDEBAR_LOCALSTORAGE_KEY);
		}
	};

	return (
		<aside
			className={cn(
				'h-screen w-[220] text-amber-50 bg-gray-950 py-5 px-4 relative transition-all',
				isCollapsed && 'w-[80]',
			)}
		>
			<Link
				href='/'
				className='flex justify-center transition-opacity items-center mb-10 hover:opacity-85'
			>
				<Image
					src='/apple-logo-white.svg'
					alt='Apple logo icon'
					width={25}
					height={25}
					className={cn('transition-transform w-0', isCollapsed && 'w-fit')}
				/>
				<h1
					className={cn(
						'text-2xl font-extrabold transition-transform overflow-hidden',
						isCollapsed && 'w-0',
					)}
				>
					<span>Apple</span>
					<span className='text-gray-400'>Store</span>
				</h1>
			</Link>

			<div
				className={cn(
					'flex items-center gap-2 my-6',
					isCollapsed && 'justify-center gap-0',
				)}
			>
				<LayoutDashboardIcon />
				<h1
					className={cn(
						'text-2xl font-bold overflow-hidden transition-all',
						isCollapsed && 'w-0',
					)}
				>
					Dashboard
				</h1>
			</div>
			<ul>
				{sidebarList.map((item) => (
					<SidebarItem key={item.path} item={item} collapsed={isCollapsed} />
				))}
			</ul>
			<Button
				onClick={toggleIsCollapsed}
				className='absolute top-3 -right-11 rounded-bl-none rounded-tl-none'
			>
				{isCollapsed ? <PanelLeftOpenIcon /> : <PanelRightOpenIcon />}
			</Button>
		</aside>
	);
};
