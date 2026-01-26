'use server';

import type { DashboardFormsStateType } from '../types';
import type { Product } from '@/prisma/generated/prisma/client';

import { updateTag } from 'next/cache';
import { z } from 'zod';
import { prisma } from '@/shared/lib/prisma';

const baseProductSchema = z.object({
	name: z.string().min(3, { message: 'Product name must contain at least 3 characters' }),
	price: z.coerce.number().positive('Price must be positive number'),
	description: z
		.string()
		.min(8, { message: 'Description must contain at least 8 characters' }),
	slug: z
		.string()
		.regex(
			/^[a-z0-9]+(?:-[a-z0-9]+)*$/,
			'Invalid slug format. Slugs must contain only lowercase characters and hyphens, and cannot start or end with a hyphen.',
		),
});

const createProductFormSchema = baseProductSchema.extend({
	colorId: z.string().min(1, { message: 'Color id is required field' }),
	categoryId: z.string().min(1, { message: 'Category id is required field' }),
	file: z
		.instanceof(File, { message: 'File is required' })
		.refine((file) => file.size > 0, { message: 'File not chosen or empty' })
		.refine((file) => file.size <= 1 * 1024 * 1024, { message: 'Max file size is 1 MB' }),
});

const updateProductFormSchema = baseProductSchema.extend({
	file: z.union([
		z.instanceof(File).optional(),
		z.instanceof(File)
			.refine((file) => file.size > 0, { message: 'File not chosen or empty' })
			.refine((file) => file.size <= 1 * 1024 * 1024, { message: 'Max file size is 1 MB' }),
	]),
});

export const createProductAction = async (
	prevState: DashboardFormsStateType | null,
	data: FormData,
): Promise<DashboardFormsStateType> => {
	const dataToValidate = {
		name: data.get('name'),
		slug: data.get('slug'),
		description: data.get('description'),
		price: data.get('price'),
		colorId: data.get('color'),
		categoryId: data.get('category'),
		file: data.get('image'),
	};

	const validationResult = createProductFormSchema.safeParse(dataToValidate);

	if (!validationResult.success) {
		const flatten = z.flattenError(validationResult.error);

		return {
			errors: {
				name: flatten.fieldErrors.name,
				slug: flatten.fieldErrors.slug,
				description: flatten.fieldErrors.description,
				price: flatten.fieldErrors.price,
				file: flatten.fieldErrors.file,
				colorId: flatten.fieldErrors.colorId,
				categoryId: flatten.fieldErrors.categoryId,
			},
		};
	}

	const file = validationResult.data.file as File;
	const arrayBuffer = await file.arrayBuffer();
	const imageData = new Uint8Array(arrayBuffer);

	try {
		await prisma.product.create({
			data: {
				name: validationResult.data.name,
				slug: validationResult.data.slug,
				description: validationResult.data.description,
				price: validationResult.data.price,
				colorId: validationResult.data.colorId,
				categoryId: validationResult.data.categoryId,
				imageData,
				imageType: validationResult.data.file.type,
				imageName: validationResult.data.file.name,
			},
		});

		updateTag('/dashboard/products');

		return {
			success: true,
			message: 'Product successfully created',
		};
	} catch (error) {
		console.error(error);

		const errorMsg = error instanceof Error
			? error.message
			: 'An error occurred during create category, reload the page or try it later';

		return { errors: { general: errorMsg } };
	}
};

export const updateProductAction = async (
	prevState: DashboardFormsStateType | null,
	data: FormData,
): Promise<DashboardFormsStateType> => {
	const id = data.get('id') as string;

	const dataToValidate = {
		name: data.get('name'),
		slug: data.get('slug'),
		description: data.get('description'),
		price: data.get('price'),
		colorId: data.get('color'),
		categoryId: data.get('category'),
		file: data.get('image'),
	};

	const validationResult = updateProductFormSchema.safeParse(dataToValidate);

	if (!validationResult.success) {
		const flatten = z.flattenError(validationResult.error);

		return {
			errors: {
				name: flatten.fieldErrors.name,
				slug: flatten.fieldErrors.slug,
				description: flatten.fieldErrors.description,
				price: flatten.fieldErrors.price,
				file: flatten.fieldErrors.file,
			},
		};
	}

	try {
		const product = await prisma.product.findFirst({
			where: { id },
		});

		if (!product) {
			return { success: false, message: 'Product not found' };
		}

		let updateData: Partial<Product> = {
			name: validationResult.data.name,
			slug: validationResult.data.slug,
			description: validationResult.data.description,
			price: validationResult.data.price,
		};

		const file = validationResult.data.file as File;

		if (file && file instanceof File && file.size > 0) {
			const arrayBuffer = await file.arrayBuffer();
			const uint8Array = new Uint8Array(arrayBuffer);

			updateData = {
				...updateData,
				imageData: uint8Array,
				imageType: file.type,
				imageName: file.name,
			};
		}

		await prisma.product.update({
			where: { id },
			data: updateData,
		});

		updateTag('/dashboard/products');

		return {
			success: true,
			message: 'Product successfully updated',
		};
	} catch (error) {
		console.error(error);

		const errorMsg = error instanceof Error
			? error.message
			: 'An error occurred during create category, reload the page or try it later';

		return { errors: { general: errorMsg } };
	}
};
