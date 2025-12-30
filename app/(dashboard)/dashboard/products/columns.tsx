'use client';

import { ColumnDef } from '@tanstack/react-table';
import type { Product } from '@/prisma/generated/prisma/client';

export const columns: ColumnDef<Product>[] = [
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
		accessorKey: 'description',
		header: 'Description',
	},
	{
		accessorKey: 'price',
		header: 'Price',
	},
	{
		accessorKey: 'category id',
		header: 'Category Id',
	},
	{
		accessorKey: 'color id',
		header: 'Color Id',
	},
	{
		accessorKey: 'created at',
		header: 'Created At',
	},
	{
		accessorKey: 'updated at',
		header: 'Updated At',
	},
];