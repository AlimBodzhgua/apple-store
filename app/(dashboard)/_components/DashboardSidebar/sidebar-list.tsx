import type { ReactNode } from 'react';
import {
	Box as BoxIcon,
	Palette as PalleteIcon,
	Tag as TagIcon,
} from 'lucide-react';

type SidebarItemType = {
	path: string;
	name: string;
	Icon: ReactNode;
};

export const sidebarList: SidebarItemType[] = [
	{
		path: '/products',
		name: 'Products',
		Icon: <BoxIcon />,
	},
	{
		path: '/categories',
		name: 'Categories',
		Icon: <TagIcon />,
	},
	{
		path: '/colors',
		name: 'Colors',
		Icon: <PalleteIcon />,
	},
];
