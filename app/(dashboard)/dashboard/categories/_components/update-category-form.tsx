import { CategoryForm } from './category-form';

type UpdateCategoryFormProps = {
	id: string;
	initialName: string;
	initialDescription: string;
	className?: string;
};

export function UpdateCategoryForm(props: UpdateCategoryFormProps) {
	const {
		id,
		initialName,
		initialDescription,
	} = props;

	return <CategoryForm
		type='update'
		id={id}
		initialName={initialName}
		initialDescription={initialDescription}
	/>;
}