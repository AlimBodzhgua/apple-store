import type { Color } from '@/prisma/generated/prisma/client';

import { use } from 'react';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

const getColors = async (): Promise<Color[]> => {
	const response = await fetch('http://localhost:3000/api/colors', {
		method: 'GET',
		next: { tags: ['colors'] },
	});
	return response.json();
};

export function ColorSelect() {
	const colors = use(getColors());

	return (
		<div className='w-full'>
			<Label htmlFor='color' className='pl-1 mb-1'>
				Color
			</Label>
			<Select name='color'>
				<SelectTrigger id='color' className='w-full'>
					<SelectValue placeholder='Select color' />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectLabel>Colors</SelectLabel>
						{colors.map((color) => (
							<SelectItem
								value={color.id}
								key={color.hexCode}
								className='flex items-center'
							>
								<span
									className='block w-4 h-4 rounded'
									style={{ backgroundColor: color.hexCode }}
								/>
								{color.name}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	);
}
