import type { Category } from '@/prisma/generated/prisma/client';

import { use } from 'react';
import { Container } from '@/components/shared';

import { DataTable } from '../data-table';
import { PageHeader } from '../page-header';
import { CreateCategoryForm } from './_components/create-category-form';
import { columns } from './columns';

const getCategories = async (): Promise<Category[]> => {
	const response = await fetch('http://localhost:3000/api/categories');

	if (!response.ok) {
		throw new Error('Error fetching colors');
	}

	return response.json();
};

export default function Categories() {
	const categories = use(getCategories());

	return (
		<Container className='flex flex-col h-full justify-start py-5'>
			<PageHeader
				title='Categories'
				buttonText='Add Category'
				form={<CreateCategoryForm />}
			/>
			<DataTable
				columns={columns}
				data={categories}
			/>
		</Container>
	);
};
