import type { Metadata } from 'next';
import { Header } from '@/components/shared';

export const metadata: Metadata = {
	title: 'Apple Store',
	description: 'Apple products tech store',
};

export default function MainLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<main lang='en'>
			<Header />
			{children}
		</main>
	);
}
