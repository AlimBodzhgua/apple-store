import { CategoryForm } from './category-form';

type CreateCategoryFormProps = {
	className?: string;
};

export function CreateCategoryForm({ className }: CreateCategoryFormProps) {
	return <CategoryForm type='create' className={className} />;
}
