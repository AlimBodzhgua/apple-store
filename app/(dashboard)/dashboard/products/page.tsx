import { Container } from '@/components/shared';
import { CraeteProductForm } from './create-product-form';
import { PageHeader } from '../page-header';
import { ProductFormSelectors } from './product-form-selectors';

export default function Products() {
	return (
		<Container className='flex flex-col h-full justify-start py-5'>
			<PageHeader
				title='Products'
				buttonText='Add Product'
				form={<CraeteProductForm additionalFormSelectors={<ProductFormSelectors />} />}
			/>
		</Container>
	);
}