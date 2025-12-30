import {
	ColorPicker,
	ColorPickerEyeDropper,
	ColorPickerFormat,
	ColorPickerHue,
	ColorPickerSelection,
} from '@/components/ui/color-picker';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '../ui/button';

export const SelectColorDropdown = () => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button className='bg-blue-500 hover:bg-blue-600'>
					Select Color <span>&#9660;</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='border-0 h-80' align='end'>
				<ColorPicker className='max-w-sm rounded-md border bg-background p-4 shadow-sm'>
					<ColorPickerSelection />
					<div className='flex items-center gap-4'>
						<ColorPickerEyeDropper />
						<ColorPickerHue />
					</div>
					<ColorPickerFormat />
				</ColorPicker>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
