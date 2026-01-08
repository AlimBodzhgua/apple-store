import { CategoryForm } from './category-form';

type CreateCategoryFormProps = {
	onSuccess?: () => void;
	className?: string;
};

export function CreateCategoryForm({ className, onSuccess }: CreateCategoryFormProps) {
	return <CategoryForm type='create' onSuccess={onSuccess} className={className} />;
}
