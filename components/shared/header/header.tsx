'use server';

import type { FC } from 'react';
import { ShoppingCart as ShoppingCartIcon } from 'lucide-react';
import { headers } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/shared/container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { auth } from '@/shared/lib/auth';
import { cn } from '@/shared/lib/utils';
import { UserDropdownMenu } from '../user-dropdown-menu';

type HeaderProps = {
	className?: string;
};

export const Header: FC<HeaderProps> = async ({ className }) => {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	return (
		<header className={cn(className)}>
			<Container className='flex py-4 gap-4'>
				<Link href='/' className='flex justify-center items-center gap-2 mr-4 w-[20%]'>
					<Image
						src='/apple-logo.svg'
						alt='Apple logo icon'
						width={30}
						height={30}
					/>
					<h1 className='text-2xl font-extrabold'>
						Apple
						<span className='text-gray-400'>Store</span>
					</h1>
				</Link>
				<Input placeholder='Пойск товаров' className='w-[60%]' />
				<div className='flex gap-2 items-center w-[20%]'>
					{session ? (
						<UserDropdownMenu />
					) : (
						<Button asChild>
							<Link href='/signIn'>Login</Link>
						</Button>
					)}
					<Button className='ml-2'>
						<ShoppingCartIcon />
					</Button>
				</div>
			</Container>
		</header>
	);
};
