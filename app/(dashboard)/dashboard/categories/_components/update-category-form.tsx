import { CategoryForm } from './category-form';

type UpdateCategoryFormProps = {
	id: string;
	initialName: string;
	initialDescription: string;
	onSuccess?: () => void;
	className?: string;
};

export function UpdateCategoryForm(props: UpdateCategoryFormProps) {
	const {
		id,
		initialName,
		initialDescription,
		onSuccess,
	} = props;

	return (
		<CategoryForm
			type='update'
			id={id}
			initialName={initialName}
			initialDescription={initialDescription}
			onSuccess={onSuccess}
		/>
	);
};
