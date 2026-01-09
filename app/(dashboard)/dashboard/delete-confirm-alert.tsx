import type { ReactNode } from 'react';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

type DeleteConfigrmAlertProps = {
	onDelete: () => void;

	children: ReactNode;
	title?: string;
	description?: string;
};

export function DeleteConfirmAlert(props: DeleteConfigrmAlertProps) {
	const { onDelete, children, title, description } = props;

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						{title ? title : 'Are you absolutely sure?'}
					</AlertDialogTitle>
					<AlertDialogDescription>
						{description
							? description
							: 'This action cannot be undone. This will permanently delete data.'}
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction
						onClick={onDelete}
						className='bg-red-500 hover:bg-red-600'
					>
						Delete
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
