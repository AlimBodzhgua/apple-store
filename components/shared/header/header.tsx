import type { FC } from 'react';
import { LogOut as LogOutIcon, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { signOutUserAction } from '@/app/actions/auth';
import { cn } from '@/shared/lib/utils';
import { auth } from '@/shared/lib/auth';
import { Button } from '@/components/ui/button';
import { headers } from 'next/headers';

import { Input } from '../../ui/input';
import { Container } from '../container';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenuGroup } from '@/components/ui/dropdown-menu';

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
				<div className='flex justify-center items-center gap-2 mr-4 w-[20%]'>
					<Image
						src='/apple-logo.svg'
						alt='Apple logo icon'
						width={30}
						height={30}
					/>
					<h1 className='text-2xl font-extrabold'>
						Apple <span className='text-gray-400'>Store</span>
					</h1>
				</div>
				<Input placeholder='Пойск товаров' className='w-[60%]' />
				<div className='flex gap-2 items-center w-[20%]'>
					{session ? (
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant='ghost' size='sm'>
									<Avatar>
										<AvatarImage src='avatar.png'/>
									</Avatar>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent className='w-24 text-center shadow-2xs mt-1 px-2' align='center'>
								<DropdownMenuGroup>
										<Button onClick={signOutUserAction} size='sm' className='w-full mb-0.5'>
											Profile
										</Button>
										<Button onClick={signOutUserAction} size='sm' className='w-full'>
											Logout <LogOutIcon />
										</Button>
								</DropdownMenuGroup>
							</DropdownMenuContent>
						</DropdownMenu>
					) : (
						<Button asChild>
							<Link href='/signIn'>Login</Link>
						</Button>
					)}
					<Button className='ml-2'>
						<ShoppingCart />
					</Button>
				</div>
			</Container>
		</header>
	);
};
