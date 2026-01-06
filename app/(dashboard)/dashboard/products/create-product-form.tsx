import { ProductForm } from './product-form';
import { ProductFormSelectors } from './product-form-selectors';

type CreateProductFormProps = {
	className?: string;
};

export function CreateProductForm({ className }: CreateProductFormProps) {
	return (
		<ProductForm
			type='create'
			className={className}
			additionalFormSelectors={<ProductFormSelectors />}
		/>
	)
}
