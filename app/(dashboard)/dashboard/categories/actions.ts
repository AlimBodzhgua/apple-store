'use server';

import type { DashboardFormsStateType } from '../types';

import { revalidateTag, updateTag } from 'next/cache';
import { z } from 'zod';
import { prisma } from '@/shared/lib/prisma';

const categoryFormSchema = z.object({
	name: z.string().min(3, { message: 'Product name must contain at least 3 characters' }),
	description: z
		.string()
		.min(8, { message: 'Description must contain at least 8 characters' }),
});

export const createCategoryAction = async (
	prevState: DashboardFormsStateType | null,
	data: FormData,
): Promise<DashboardFormsStateType> => {
	const dataToValidate = {
		name: data.get('name'),
		description: data.get('description'),
	};

	const validationResult = categoryFormSchema.safeParse(dataToValidate);

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
				name: validationResult.data.name,
				description: validationResult.data.description,
			},
		});

		revalidateTag('categories', { expire: 30 });
		updateTag('/dashboard/categories');

		return {
			success: true,
			message: 'Category successfully created',
		};
	} catch (error) {
		console.error(error);

		const errorMsg = error instanceof Error
			? error.message
			: 'An error occurred during create category, reload the page or try it later';

		return { errors: { general: errorMsg } };
	}
};

export const updateCategoryAction = async (
	prevState: DashboardFormsStateType | null,
	data: FormData,
): Promise<DashboardFormsStateType> => {
	const id = data.get('id') as string;

	const dataToValidate = {
		name: data.get('name'),
		description: data.get('description'),
	};

	const validationResult = categoryFormSchema.safeParse(dataToValidate);

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
			where: { id },
		});

		if (!category) {
			return { success: false, message: 'Category not found' };
		}

		await prisma.category.update({
			where: {
				id: id as string,
			},
			data: {
				name: validationResult.data.name,
				description: validationResult.data.description,
			},
		});

		updateTag('/dashboard/categories');

		return {
			success: true,
			message: 'Category successfully updated',
		};
	} catch (error) {
		console.error(error);

		const errorMsg = error instanceof Error
			? error.message
			: 'An error occurred during create category, reload the page or try it later';

		return { errors: { general: errorMsg } };
	}
};
