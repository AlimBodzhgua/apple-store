'use server';

import { z } from 'zod';
import { revalidateTag, updateTag } from 'next/cache';
import { prisma } from '@/shared/lib/prisma';
import type { FormStateType } from '@/shared/types';

export type DashboardFormsStateErrors = {
	name?: string[];
	slug?: string[];
	description?: string[];
	price?: string[];
	hexCode?: string[];
	colorId?: string[];
	categoryId?: string[];
	general?: string;
};

export type DashboardFormsStateType = FormStateType<DashboardFormsStateErrors>;

const colorFormSchema = z.object({
	name: z.string().min(4, { message: 'Color name must contain at leat 4 characters' }),
	slug: z
		.string()
		.min(4, { message: 'Slug must contain at least 4 characters.' })
		.regex(
			/^[a-z0-9]+(?:-[a-z0-9]+)*$/,
			'Invalid slug format. Slugs must contain only lowercase characters and hyphens, and cannot start or end with a hyphen.',
		),
	hexCode: z
		.string()
		.regex(
			/^#[0-9A-Fa-f]{6}$/,
			'Invalid hex format. Copy hex code from color select menu including # symbol',
		),
});

export const createColorAction = async (
	prevState: DashboardFormsStateType | null,
	data: FormData,
): Promise<DashboardFormsStateType> => {
	const name = data.get('name');
	const slug = data.get('slug');
	const hexCode = data.get('hexCode');

	const validationResult = colorFormSchema.safeParse({ name, slug, hexCode });

	if (!validationResult.success) {
		const flatten = z.flattenError(validationResult.error);

		return {
			errors: {
				name: flatten.fieldErrors.name,
				slug: flatten.fieldErrors.slug,
				hexCode: flatten.fieldErrors.hexCode,
			},
		};
	}

	try {
		await prisma.color.create({
			data: {
				name: name as string,
				slug: slug as string,
				hexCode: hexCode as string,
			},
		});

		revalidateTag('colors', { expire: 30 });
		updateTag('/dashboard/colors');

		return {
			success: true,
			message: 'Color succesfully created',
		};
	} catch (error) {
		let errorMsg =
			'An error occurred during create color, reload the page or try it later';

		if (error instanceof Error) {
			errorMsg = error.message;
		}

		return { errors: { general: errorMsg } };
	}
};

export const updateColorAction = async (
	prevState: DashboardFormsStateType | null,
	data: FormData,
): Promise<DashboardFormsStateType> => {
	console.log(data);
	const id = data.get('id');
	const name = data.get('name');
	const slug = data.get('slug');
	const hexCode = data.get('hexCode');

	const validationResult = colorFormSchema.safeParse({ name, slug, hexCode });

	if (!validationResult.success) {
		const flatten = z.flattenError(validationResult.error);

		return {
			errors: {
				name: flatten.fieldErrors.name,
				slug: flatten.fieldErrors.slug,
				hexCode: flatten.fieldErrors.hexCode,
			},
		};
	}

	try {
		const color = await prisma.color.findFirst({
			where: {
				id: id as string,
			},
		});

		if (!color) {
			return {
				success: false,
				message: 'Color not found',
			};
		}

		await prisma.color.update({
			where: {
				id: id as string,
			},
			data: {
				name: name as string,
				slug: slug as string,
				hexCode: hexCode as string,
			},
		});

		return {
			success: true,
			message: 'Color succesfully created',
		};
	} catch (error) {
		let errorMsg =
			'An error occurred during create color, reload the page or try it later';

		if (error instanceof Error) {
			errorMsg = error.message;
		}

		return { errors: { general: errorMsg } };
	}
};

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