import type { ReactNode } from 'react';
import {
	Box as BoxIcon,
	Palette as PaletteIcon,
	Tag as TagIcon,
} from 'lucide-react';

export type SidebarItemType = {
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
		Icon: <PaletteIcon />,
	},
];
