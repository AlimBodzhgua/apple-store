import { ColorForm } from './color-form';

type UpdateColorFormProps = {
	id: string;
	initialName: string;
	initialSlug: string;
	initialHexCode: string;
	className?: string;
};

export function UpdateColorForm(props: UpdateColorFormProps) {
	const { id, initialName, initialHexCode, initialSlug } = props;

	return (
		<ColorForm
			type='update'
			id={id}
			initialHexCode={initialHexCode}
			initialName={initialName}
			initialSlug={initialSlug}
		/>
	);
}
