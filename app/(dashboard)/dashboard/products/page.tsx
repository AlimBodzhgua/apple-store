import { use } from 'react';
import type { Product } from '@/prisma/generated/prisma/client';
import { Container } from '@/components/shared';

import { PageHeader } from '../page-header';
import { DataTable } from '../data-table';
import { CreateProductForm } from './create-product-form';
import { columns } from './columns';

const getProducts = async (): Promise<Product[]> => {
	const response = await fetch('http://localhost:3000/api/products');

	if (!response.ok) throw new Error('Error fetching products');

	return response.json();
};


export default function Products() {
	const products = use(getProducts());
	
	return (
		<Container className='flex flex-col h-full justify-start py-5'>
			<PageHeader
				title='Products'
				buttonText='Add Product'
				form={<CreateProductForm />}
			/>
			<DataTable columns={columns} data={products}/>
		</Container>
	);
}