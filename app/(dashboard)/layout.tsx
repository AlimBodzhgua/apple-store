import type { Metadata } from 'next';
import { DashboardHeader } from './_components/DashboardHeader/deahsboard-header';
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
		<main className='flex'>
			<DashboardSidebar />
			<div className='flex flex-col w-full'>
				<DashboardHeader />
				{children}
			</div>
		</main>
	);
}
