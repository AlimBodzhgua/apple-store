import { use } from 'react';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import type { Category } from '@/prisma/generated/prisma/client';
import { Label } from '@/components/ui/label';

const getCategories = async (): Promise<Category[]> => {
	const response = await fetch('http://localhost:3000/api/categories', {
		method: 'GET',
		next: { tags: ['categories'] },
	});

	return response.json();
};

export function CategorySelect() {
	const categories = use(getCategories());

	return (
		<div className='w-full'>
			<Label htmlFor='category' className='pl-1 mb-1'>Category</Label>
			<Select name='category'>
				<SelectTrigger id='category' className='w-full'>
					<SelectValue placeholder='Select category' />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectLabel>Categories</SelectLabel>
						{categories.map((category) => (
							<SelectItem
								value={category.id}
								key={category.id}
								className='flex items-center'
							>
								{category.name}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	);
}
