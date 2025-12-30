'use client';

import { ColumnDef } from '@tanstack/react-table';
import type { Color } from '@/prisma/generated/prisma/client';

export const columns: ColumnDef<Color>[] = [
	{
		accessorKey: 'id',
		header: 'id',
	},
	{
		accessorKey: 'name',
		header: 'Name',
	},
	{
		accessorKey: 'slug',
		header: 'Slug',
	},
	{
		accessorKey: 'hex code',
		header: 'Hex Code',
	},
];