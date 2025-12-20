import { signOutUserAction } from '@/app/actions/auth';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogOut as LogOutIcon } from 'lucide-react';

export const UserDropdownMenu = () => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' size='sm'>
					<Avatar>
						<AvatarImage src='avatar.png' />
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className='w-24 text-center shadow-2xs mt-1 px-2'
				align='center'
			>
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
	);
};
