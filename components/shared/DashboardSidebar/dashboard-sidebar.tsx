import type { FC } from 'react';
import { LayoutDashboard as LayoutDashboardIcon } from 'lucide-react';
import Link from 'next/link';
import { sidebarList } from './sidebar-list';

type DashboardSidebarProps = {
	className?: string;
};

export const DashboardSidebar: FC<DashboardSidebarProps> = () => {
	return (
		<aside className='h-screen w-[220] text-amber-50 bg-gray-950 py-5 px-4'>
			<Link href='/' className='flex justify-center items-center mb-10'>
				<h1 className='text-2xl font-extrabold'>
					Apple<span className='text-gray-400'>Store</span>
				</h1>
			</Link>

			<div className='flex items-center gap-2 my-6'>
				<LayoutDashboardIcon />
				<h1 className='text-2xl font-bold'>Dashboard</h1>
			</div>
			<ul>
				{sidebarList.map((item) => (
					<li key={item.path}>
						<Link
							href={'/dashboard' + item.path}
							className='flex items-center p-1 gap-2 my-3 text-[1.2rem] rounded-2xl hover:text-gray-950 hover:bg-amber-50'
						>
							{item.Icon}
							{item.name}
						</Link>
					</li>
				))}
			</ul>
		</aside>
	);
};