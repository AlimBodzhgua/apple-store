'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SquarePen as SquarePenIcon, Trash as TrashIcon } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';
import type { Category } from '@/prisma/generated/prisma/client';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { UpdateCategoryForm } from './_components/update-category-form';

const removeCategory = async (id: string): Promise<Category[]> => {
	const response = await fetch(`http://localhost:3000/api/categories/${id}`, {
		method: 'DELETE',
	});

	if (!response.ok) throw new Error('Error fetching colors');

	return response.json();
}

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
	{
		id: 'actions',
		header: 'Actions',
		enableHiding: false,
		cell: ({ row }) => {
			const categoryId: string = row.getValue('id');
			const name: string = row.getValue('name');
			const description: string = row.getValue('description');

			const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

			const router = useRouter();

			const toggleModalOpened = useCallback(() => {
				setIsModalOpened((prev) => !prev);
			}, []);

			const onRemove = async () => {
				await removeCategory(categoryId);
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

					<Dialog open={isModalOpened} onOpenChange={setIsModalOpened}>
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
									<DialogTitle>Edit category</DialogTitle>
									<DialogDescription>
										Make changes to selected category here. Click save when
										you&apos;re done.
									</DialogDescription>
								</DialogHeader>
								<UpdateCategoryForm
									id={categoryId}
									initialName={name}
									initialDescription={description}
									onSuccess={toggleModalOpened}
								/>
							</DialogContent>
					</Dialog>
				</div>
			);
		},
	}
];