import { ProductForm } from './product-form';
import { ProductFormSelectors } from './product-form-selectors';

type CreateProductFormProps = {
	onSuccess?: () => void;
	className?: string;
};

export function CreateProductForm({ onSuccess, className }: CreateProductFormProps) {
	return (
		<ProductForm
			type='create'
			onSuccess={onSuccess}
			className={className}
			additionalFormSelectors={<ProductFormSelectors />}
		/>
	);
}
