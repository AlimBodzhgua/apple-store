import { Container } from '@/components/shared';
import { CreateColorForm } from './create-color-form';
import { PageHeader } from '../page-header';

export default function Colors() {
	return (
		<Container className='flex flex-col h-full justify-start py-5'>
			<PageHeader title='Colors' buttonText='Add Color' form={<CreateColorForm />} />
		</Container>
	);
}
