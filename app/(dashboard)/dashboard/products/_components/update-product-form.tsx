import { ProductForm } from './product-form';

type UpdateProductFormProps = {
	id: string;
	initialName: string;
	initialSlug: string;
	initialDescription: string;
	initialPrice: number;

	onSuccess?: () => void;
	className?: string;
};

export function UpdateProductForm(props: UpdateProductFormProps) {
	const {
		id,
		initialName,
		initialSlug,
		initialDescription,
		initialPrice,
		onSuccess,
		className,
	} = props;

	return (
		<ProductForm
			type='update'
			id={id}
			initialName={initialName}
			initialDescription={initialDescription}
			initialPrice={initialPrice}
			initialSlug={initialSlug}
			additionalFormSelectors={<></>}
			onSuccess={onSuccess}
			className={className}
		/>
	);
};
