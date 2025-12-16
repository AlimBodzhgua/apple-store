import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import { Header } from '@/components/shared';
import './globals.css';

const nunito = Nunito({
	subsets: ['cyrillic', 'latin'],
	variable: '--font-nunito',
	weight: ['400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
	title: 'Apple Store',
	description: 'Apple products tech store',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={nunito.className}>
				<Header />
				{children}
			</body>
		</html>
	);
}
