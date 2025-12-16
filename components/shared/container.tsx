import { cn } from '@/shared/lib/utils';
import { FC, ReactNode } from 'react';

type ContainerProps = {
	children: ReactNode;
	className?: string;
};

export const Container: FC<ContainerProps> = (props) => {
	const { children, className } = props;

	return <div className={cn('w-full max-w-[1250px] my-0  m-auto  py-0 px-5', className)}>{children}</div>;
};
