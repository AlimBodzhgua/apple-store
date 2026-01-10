'use client';

import type { ColumnDef } from '@tanstack/react-table';
import type { Color } from '@/prisma/generated/prisma/client';

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

import { DeleteConfirmAlert } from '../delete-confirm-alert';
import { UpdateColorForm } from './_components/update-color-form';

const removeColor = async (id: string): Promise<Color[]> => {
	const response = await fetch(`http://localhost:3000/api/colors/${id}`, {
		method: 'DELETE',
	});

	if (!response.ok) {
		throw new Error('Error fetching colors');
	}

	return response.json();
};

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
		accessorKey: 'hexCode',
		header: 'Hex Code',
		cell: ({ row }) => {
			const hexCode: string = row.getValue('hexCode');

			return (
				<div className='flex items-center text-right font-medium'>
					<span
						className='h-3.5 w-3.5 block rounded mr-3'
						style={{ backgroundColor: hexCode }}
					/>
					{hexCode}
				</div>
			);
		},
	},
	{
		id: 'actions',
		header: 'Actions',
		enableHiding: false,
		cell: ({ row }) => {
			const colorId: string = row.getValue('id');
			const name: string = row.getValue('name');
			const slug: string = row.getValue('slug');
			const hexCode: string = row.getValue('hexCode');

			const router = useRouter();

			const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

			const toggleModalOpened = useCallback(() => {
				setIsModalOpened((prev) => !prev);
			}, []);

			const onRemove = async () => {
				try {
					await removeColor(colorId);
					router.refresh();
					toast.success('Color succesfully deleted', { position: 'top-center' });
				} catch {
					toast.error('Error deleteing color', {
						position: 'top-center',
						description:
							'Something went wrong trying to delete the color, reload the page or try againt later',
					});
				}
			};

			return (
				<div className='flex gap-2'>
					<DeleteConfirmAlert
						title='Are you sure you want to delete this color?'
						description='This action cannot be undone and will permanently delete color data.'
						onDelete={onRemove}
					>
						<Button
							size='xs'
							variant='outline'
							className='hover:text-red-500 hover:border-red-500'
						>
							<TrashIcon />
						</Button>
					</DeleteConfirmAlert>

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
								<DialogTitle>Edit color</DialogTitle>
								<DialogDescription>
									Make changes to selected color here. Click save when
									you&apos;re done.
								</DialogDescription>
							</DialogHeader>
							<UpdateColorForm
								id={colorId}
								initialHexCode={hexCode}
								initialName={name}
								initialSlug={slug}
								onSuccess={toggleModalOpened}
							/>
						</DialogContent>
					</Dialog>
				</div>
			);
		},
	},
];
