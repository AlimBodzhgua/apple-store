'use server';

import { revalidateTag, updateTag } from 'next/cache';
import { z } from 'zod';
import { prisma } from '@/shared/lib/prisma';
import type { DashboardFormsStateType } from '../types';

const categoryFormSchema = z.object({
	name: z.string().min(3, { message: 'Product name must contain at leat 3 characters' }),
	description: z
		.string()
		.min(8, { message: 'Description must contain at leat 8 characters' }),
});

export const createCategoryAction = async (
	prevState: DashboardFormsStateType | null,
	data: FormData,
): Promise<DashboardFormsStateType> => {
	const name = data.get('name');
	const description = data.get('description');

	const validationResult = categoryFormSchema.safeParse({ name, description });

	if (!validationResult.success) {
		const flatten = z.flattenError(validationResult.error);

		return {
			errors: {
				name: flatten.fieldErrors.name,
				description: flatten.fieldErrors.description,
			},
		};
	}

	try {
		await prisma.category.create({
			data: {
				name: name as string,
				description: description as string,
			},
		});

		revalidateTag('categories', { expire: 30 });
		updateTag('/dashboard/categories');

		return {
			success: true,
			message: 'Category succesfully created',
		};
	} catch (error) {
		let errorMsg =
			'An error occurred during create category, reload the page or try it later';

		if (error instanceof Error) {
			errorMsg = error.message;
		}

		return { errors: { general: errorMsg } };
	}
};

export const updateCategoryAction = async (
	prevState: DashboardFormsStateType | null,
	data: FormData,
): Promise<DashboardFormsStateType> => {
	console.log(data);
	const id = data.get('id');
	const name = data.get('name');
	const description = data.get('description');

	const validationResult = categoryFormSchema.safeParse({ name, description });

	if (!validationResult.success) {
		const flatten = z.flattenError(validationResult.error);

		return {
			errors: {
				name: flatten.fieldErrors.name,
				description: flatten.fieldErrors.description,
			},
		};
	}

	try {
		const category = await prisma.category.findFirst({
			where: {
				id: id as string,
			},
		});

		if (!category) {
			return {
				success: false,
				message: 'Category not found',
			};
		}

		await prisma.category.update({
			where: {
				id: id as string,
			},
			data: {
				name: name as string,
				description: description as string,
			},
		});

		updateTag('/dashboard/categories');

		return {
			success: true,
			message: 'Category succesfully updated',
		};
	} catch (error) {
		let errorMsg = 'An error occurred during create category, reload the page or try it later';

		if (error instanceof Error) {
			errorMsg = error.message;
		}

		return { errors: { general: errorMsg } };
	}
};