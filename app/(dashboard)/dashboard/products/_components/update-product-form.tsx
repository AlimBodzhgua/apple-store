import { ProductForm } from './product-form';

type UpdateProductFormProps = {
	id: string;
	initialName: string;
	initialSlug: string;
	initialDescription: string;
	initialPrice: number;
};

export function UpdateProductForm(props: UpdateProductFormProps) {
	const {
		id,
		initialName,
		initialSlug,
		initialDescription,
		initialPrice,
	} = props;

	return (
		<ProductForm
			type='update'
			id={id}
			initialName={initialName}
			initialDescription={initialDescription}
			initialPrice={initialPrice}
			initialSlug={initialSlug}
			initialCategoryId={'123'}
			initialColorId={'456'}
			additionalFormSelectors={<></>}
		/>
	);
}