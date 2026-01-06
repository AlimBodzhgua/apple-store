import { ColorForm } from './color-form';

type CreateColorFormProps = {
	className?: string;
};

export function CreateColorForm({ className }: CreateColorFormProps) {
	return <ColorForm type='create' className={className} />;
}
