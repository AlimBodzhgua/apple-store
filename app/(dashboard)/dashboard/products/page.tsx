import type { Product } from '@/prisma/generated/prisma/client';

import { use } from 'react';
import { Container } from '@/components/shared';

import { PageHeader } from '../_components/page-header';
import { SearchableDataTable } from '../_components/searchable-data-table';
import { CreateProductForm } from './_components/create-product-form';
import { columns } from './columns';

const getProducts = async (): Promise<Product[]> => {
	const response = await fetch('http://localhost:3000/api/products');

	if (!response.ok) {
		throw new Error('Error fetching products');
	}

	return response.json();
};

export default function Products() {
	const products = use(getProducts());

	return (
		<Container className='flex flex-col justify-start py-5'>
			<PageHeader
				title='Products'
				buttonText='Add Product'
				form={<CreateProductForm />}
			/>
			<SearchableDataTable
				data={products}
				columns={columns}
			/>
		</Container>
	);
};
