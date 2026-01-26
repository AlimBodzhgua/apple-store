'use client';

import type { ColumnDef } from '@tanstack/react-table';
import type { Product } from '@/prisma/generated/prisma/client';

import { SquarePen as SquarePenIcon, Trash as TrashIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';

import { DeleteConfirmAlert } from '../_components/delete-confirm-alert';
import { formatCurrency, formatDate } from '../utils';
import { CategoryCell } from './_components/category-cell';
import { ColorCell } from './_components/color-cell';
import { ImageCell } from './_components/image-cell';
import { UpdateProductForm } from './_components/update-product-form';

const removeProduct = async (id: string): Promise<Product[]> => {
	const response = await fetch(`http://localhost:3000/api/products/${id}`, {
		method: 'DELETE',
	});

	if (!response.ok) {
		throw new Error('Error fetching products');
	}

	return response.json();
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
		accessorKey: 'image',
		header: 'Image',
		cell: ({ row }) => (
			<ImageCell imageName={row.original.imageName!} productId={row.original.id} />
		),
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
		cell: ({ row }) => (
			<div className='text-left font-medium'>{formatCurrency(row.original.price)}</div>
		),
	},
	{
		accessorKey: 'categoryId',
		header: 'Category Id',
		cell: ({ row }) => <CategoryCell categoryId={row.original.categoryId} />,
	},
	{
		accessorKey: 'colorId',
		header: 'Color Id',
		cell: ({ row }) => <ColorCell colorId={row.original.colorId} />,
	},
	{
		accessorKey: 'createdAt',
		header: 'Created At',
		cell: ({ row }) => (
			<div className='text-left font-medium'>{formatDate(row.original.createdAt)}</div>
		),
	},
	{
		accessorKey: 'updatedAt',
		header: 'Updated At',
		cell: ({ row }) => (
			<div className='text-left font-medium'>{formatDate(row.original.updatedAt)}</div>
		),
	},
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

			const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

			const router = useRouter();

			const onRemove = async () => {
				try {
					await removeProduct(productId);
					router.refresh();
					toast.success('Category successfully deleted');
				} catch {
					toast.error('Error deleting color', {
						position: 'top-center',
						description:
							'Something went wrong trying to delete the color, reload the page or try against later',
					});
				}
			};

			const toggleModalOpened = useCallback(() => {
				setIsModalOpened((prev) => !prev);
			}, []);

			return (
				<div className='flex gap-2'>
					<DeleteConfirmAlert
						title='Are you sure you want to delete this product?'
						description='This action cannot be undone and will permanently delete product data.'
						onDelete={onRemove}
					>
						<Button
							size='xs'
							variant='outline'
							className='hover:text-red-500 hover:border-red-500'
						>
							<TrashIcon size={15} />
						</Button>
					</DeleteConfirmAlert>

					<Dialog open={isModalOpened} onOpenChange={setIsModalOpened}>
						<DialogTrigger asChild>
							<Button
								size='xs'
								variant='outline'
								className='hover:text-blue-500 hover:border-blue-500'
							>
								<SquarePenIcon size={15} />
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
								onSuccess={toggleModalOpened}
							/>
						</DialogContent>
					</Dialog>
				</div>
			);
		},
	},
];
