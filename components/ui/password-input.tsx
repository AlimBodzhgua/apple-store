'use client';
import type { ComponentProps, FC } from 'react';
import { Eye as EyeIcon, EyeOffIcon } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/shared/lib/utils';
import { Button } from './button';
import { Input } from './input';

type PaswordInputProps = {
	className?: string;
};

export const PasswordInput: FC<PaswordInputProps & ComponentProps<'input'>> = (props) => {
	const { className, ...otherProps } = props;
	const [isHidden, setIsHidden] = useState<boolean>(true);

	const onToggleIsHidden = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setIsHidden((prev) => !prev);
	};

	return (
		<div className='flex relative w-full h-full'>
			<Input
				type={isHidden ? 'password' : 'text'}
				className={cn('pr-10', className)}
				{...otherProps}
			/>
			<Button variant='ghost' className='absolute right-0' onClick={onToggleIsHidden}>
				{isHidden ? <EyeIcon /> : <EyeOffIcon />}
			</Button>
		</div>
	);
};
