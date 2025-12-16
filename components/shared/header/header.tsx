import type { FC } from 'react';
import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '../../ui/input';
import { Container } from '../container';

type HeaderProps = {
	className?: string;
};

export const Header: FC<HeaderProps> = ({ className }) => {
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
					<Button>Login</Button>
					<Button>
						<ShoppingCart />
					</Button>
				</div>
			</Container>
		</header>
	);
};
