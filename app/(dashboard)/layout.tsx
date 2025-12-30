import { DashboardSidebar, DashboardHeader } from '@/components/shared';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Dashboard',
	description: 'Admin panel',
};

export default function RootLayout({
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
