import {
	LogOut as LogOutIcon,
	User as UserIcon,
} from 'lucide-react';
import { signOutUserAction } from '@/app/actions/auth';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';


export const UserDropdownMenu = () => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button>
					<UserIcon />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='border-0' align='center'>
				<DropdownMenuGroup>
					<Button onClick={signOutUserAction} size='sm' className='w-full flex gap-2 mb-0.5'>
						Profile <UserIcon />
					</Button>
					<Button onClick={signOutUserAction} size='sm' className='w-full flex gap-2'>
						Logout <LogOutIcon />
					</Button>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
