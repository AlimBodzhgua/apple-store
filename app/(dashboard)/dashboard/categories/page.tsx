import { Container } from '@/components/shared';
import { CraeteCategoryForm } from './create-category-form';
import { PageHeader } from '../page-header';

export default function Categories() {
	return (
		<Container className='flex flex-col h-full justify-start py-5'>
			<PageHeader
				title='Categories'
				buttonText='Add Category'
				form={<CraeteCategoryForm />}
			/>
		</Container>
	);
}
