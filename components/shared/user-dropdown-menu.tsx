import type { FC } from 'react';
import { LogOut as LogOutIcon, User as UserIcon } from 'lucide-react';
import { signOutUserAction } from '@/app/actions/auth';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type UserDropdownMenuType = {
	variant?: 'outline' | 'secondary' | 'ghost' | 'destructive';
};

export const UserDropdownMenu: FC<UserDropdownMenuType> = (props) => {
	const { variant } = props;

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant={variant}>
					<UserIcon />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='border-0' align='center'>
				<DropdownMenuGroup>
					<Button
						variant={variant}
						onClick={signOutUserAction}
						className='w-full flex gap-2 mb-0.5'
						size='sm'
					>
						Profile <UserIcon />
					</Button>
					<Button
						variant={variant}
						onClick={signOutUserAction}
						className='w-full flex gap-2'
						size='sm'
					>
						Logout <LogOutIcon />
					</Button>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
