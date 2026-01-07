'use server';
import { z } from 'zod';
import { updateTag } from 'next/cache';
import { prisma } from '@/shared/lib/prisma';
import type { DashboardFormsStateType } from '../types';

const productFormSchema = z.object({
	name: z.string().min(3, { message: 'Product name must contain at leat 3 characters' }),
	slug: z
		.string()
		.regex(
			/^[a-z0-9]+(?:-[a-z0-9]+)*$/,
			'Invalid slug format. Slugs must contain only lowercase characters and hyphens, and cannot start or end with a hyphen.',
		),
	description: z
		.string()
		.min(8, { message: 'Description must contain at leat 8 characters' }),
	price: z.coerce.number().positive('Price must be positive number'),
	colorId: z.string().min(1, { message: 'Color id is required field' }),
	categoryId: z.string().min(1, { message: 'Category id is required field' }),
});

export const createProductAction = async (
	prevState: DashboardFormsStateType | null,
	data: FormData,
): Promise<DashboardFormsStateType> => {
	const name = data.get('name');
	const slug = data.get('slug');
	const description = data.get('description');
	const price = data.get('price');

	const colorId = data.get('color');
	const categoryId = data.get('category');

	const validationResult = productFormSchema.safeParse({
		name,
		slug,
		description,
		price,

		colorId,
		categoryId,
	});

	if (!validationResult.success) {
		const flatten = z.flattenError(validationResult.error);

		return {
			errors: {
				name: flatten.fieldErrors.name,
				slug: flatten.fieldErrors.slug,
				description: flatten.fieldErrors.description,
				price: flatten.fieldErrors.price,

				colorId: flatten.fieldErrors.colorId,
				categoryId: flatten.fieldErrors.categoryId,
			},
		};
	}

	updateTag('/dashboard/products');

	try {
		await prisma.product.create({
			data: {
				name: name as string,
				slug: slug as string,
				description: description as string,
				price: Number(price),
				colorId: colorId as string,
				categoryId: categoryId as string,
			},
		});

		return {
			success: true,
			message: 'Product succesfully created',
		};
	} catch (error) {
		let errorMsg =
			'An error occurred during create product, reload the page or try it later';

		if (error instanceof Error) {
			errorMsg = error.message;
		}

		return { errors: { general: errorMsg } };
	}
};



export const updateProductAction = async (
	prevState: DashboardFormsStateType | null,
	data: FormData,
): Promise<DashboardFormsStateType> => {
	const id = data.get('id');
	const name = data.get('name');
	const slug = data.get('slug');
	const description = data.get('description');
	const price = data.get('price');

	
	try {
		const product = await prisma.product.findFirst({
			where: {
				id: id as string,
			},
		});
		
		if (!product) {
			return {
				success: false,
				message: 'Category not found',
			};
		}
		
		const validationResult = productFormSchema.safeParse({
			name,
			slug,
			description,
			price,
			categoryId: product.categoryId,
			colorId: product.colorId,
		});
	
		if (!validationResult.success) {
			const flatten = z.flattenError(validationResult.error);
	
			return {
				errors: {
					name: flatten.fieldErrors.name,
					slug: flatten.fieldErrors.slug,
					description: flatten.fieldErrors.description,
					price: flatten.fieldErrors.price,
				},
			};
		}

		await prisma.product.update({
			where: {
				id: id as string,
			},
			data: {
				name: name as string,
				slug: slug as string,
				description: description as string,
				price: Number(price),
			},
		});

		updateTag('/dashboard/products');

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