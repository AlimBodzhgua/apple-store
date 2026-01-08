import { ColorForm } from './color-form';

type CreateColorFormProps = {
	onSuccess?: () => void;
	className?: string;
};

export function CreateColorForm({ className, onSuccess }: CreateColorFormProps) {
	return <ColorForm type='create' onSuccess={onSuccess} className={className} />;
}
