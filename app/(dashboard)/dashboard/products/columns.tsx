'use client';

import { useRouter } from 'next/navigation';
import { Trash as TrashIcon, SquarePen as SquarePenIcon } from 'lucide-react';
import type { ColumnDef } from '@tanstack/react-table';
import type { Product } from '@/prisma/generated/prisma/client';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { UpdateProductForm } from './update-product-form';

const removeProduct = async (id: string): Promise<Product[]> => {
	const response = await fetch(`http://localhost:3000/api/products/${id}`, {
		method: 'DELETE',
	});

	if (!response.ok) throw new Error('Error fetching colors');

	return response.json();
};

const createDateColumn = (
	accessorKey: 'createdAt' | 'updatedAt',
	header: string,
): ColumnDef<Product> => {
	const dateFormatter = new Intl.DateTimeFormat('en-US', {
		dateStyle: 'medium',
		timeStyle: 'short',
	});

	return {
		accessorKey,
		header,
		cell: ({ row }) => {
			const dateValue = parseFloat(row.getValue(accessorKey));
			const formattedDate = dateFormatter.format(dateValue);

			return <div className='text-right font-medium'>{formattedDate}</div>;
		},
	};
};

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
		cell: ({ row }) => {
			const price = parseFloat(row.getValue('price'));

			const formatter = new Intl.NumberFormat('en-US', {
				style: 'currency',
				currency: 'USD',
			});

			const formattedPrice = formatter.format(price);

			return <div className='text-right font-medium'>{formattedPrice}</div>;
		},
	},
	{
		accessorKey: 'categoryId',
		header: 'Category Id',
	},
	{
		accessorKey: 'colorId',
		header: 'Color Id',
	},
	createDateColumn('createdAt', 'Created At'),
	createDateColumn('updatedAt', 'Updated At'),
	{
		id: 'actions',
		header: 'Actions',
		enableHiding: false,
		cell: ({ row }) => {
			const productId: string = row.getValue('id');
			const name: string = row.getValue('name');
			const slug: string = row.getValue('slug');
			const price: number = row.getValue('price');
			const description: string = row.getValue('description');
			const router = useRouter();

			const onRemove = async () => {
				await removeProduct(productId);
				router.refresh();
			};

			return (
				<div className='flex gap-2'>
					<Button
						size='xs'
						variant='outline'
						onClick={onRemove}
						className='hover:text-red-500 hover:border-red-500'
					>
						<TrashIcon />
					</Button>

					<Dialog>
						<DialogTrigger asChild>
							<Button
								size='xs'
								variant='outline'
								className='hover:text-blue-500 hover:border-blue-500'
							>
								<SquarePenIcon />
							</Button>
						</DialogTrigger>
						<DialogContent className='sm:max-w-[425px]'>
							<DialogHeader>
								<DialogTitle>Edit product</DialogTitle>
								<DialogDescription>
									Make changes to selected product here. Click save when
									you&apos;re done.
								</DialogDescription>
							</DialogHeader>
							<UpdateProductForm
								id={productId}
								initialName={name}
								initialSlug={slug}
								initialDescription={description}
								initialPrice={price}
							/>
						</DialogContent>
					</Dialog>
				</div>
			);
		},
	},
];
