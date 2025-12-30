'use client';

import { ColumnDef } from '@tanstack/react-table';
import type { Category } from '@/prisma/generated/prisma/client';

export const columns: ColumnDef<Category>[] = [
	{
		accessorKey: 'id',
		header: 'id',
	},
	{
		accessorKey: 'name',
		header: 'Name',
	},
	{
		accessorKey: 'description',
		header: 'Description',
	},
];