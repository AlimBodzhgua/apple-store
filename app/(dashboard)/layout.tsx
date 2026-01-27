import type { Metadata } from 'next';
import { DashboardHeader } from './_components/DashboardHeader/dashboard-header';
import { DashboardSidebar } from './_components/DashboardSidebar/dashboard-sidebar';

export const metadata: Metadata = {
	title: 'Dashboard',
	description: 'Admin panel',
};

export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<main className='flex h-screen overflow-hidden'>
			<DashboardSidebar />
			<div className='flex flex-1 flex-col'>
				<DashboardHeader />
				<div className='flex-1 overflow-y-auto'>
					{children}
				</div>
			</div>
		</main>
	);
}
