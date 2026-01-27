import type { Color } from '@/prisma/generated/prisma/client';

import { use } from 'react';
import { Container } from '@/components/shared';

import { PageHeader } from '../_components/page-header';
import { SearchableDataTable } from '../_components/searchable-data-table';
import { CreateColorForm } from './_components/create-color-form';
import { columns } from './columns';

const getColors = async (): Promise<Color[]> => {
	const response = await fetch('http://localhost:3000/api/colors', {
		method: 'GET',
	});

	if (!response.ok) {
		throw new Error('Error fetching colors');
	}

	return response.json();
};

export default function Colors() {
	const colors = use(getColors());

	return (
		<Container className='flex flex-col justify-start py-5'>
			<PageHeader title='Colors' buttonText='Add Color' form={<CreateColorForm />} />
			<SearchableDataTable columns={columns} data={colors} />
		</Container>
	);
};
