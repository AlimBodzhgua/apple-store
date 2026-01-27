'use server';

import type { DashboardFormsStateType } from '../types';

import { revalidateTag, updateTag } from 'next/cache';
import { z } from 'zod';
import { prisma } from '@/shared/lib/prisma';

const colorFormSchema = z.object({
	name: z.string().min(4, { message: 'Color name must contain at least 4 characters' }),
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
	const dataToValidate = {
		name: data.get('name'),
		slug: data.get('slug'),
		hexCode: data.get('hexCode'),
	};

	const validationResult = colorFormSchema.safeParse(dataToValidate);

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
				name: validationResult.data.name,
				slug: validationResult.data.slug,
				hexCode: validationResult.data.hexCode,
			},
		});

		revalidateTag('colors', { expire: 30 });
		updateTag('/dashboard/colors');

		return {
			success: true,
			message: 'Color successfully created',
		};
	} catch (error) {
		console.error(error);

		const errorMsg = error instanceof Error
			? error.message
			: 'An error occurred during create category, reload the page or try it later';

		return { errors: { general: errorMsg } };
	}
};

export const updateColorAction = async (
	prevState: DashboardFormsStateType | null,
	data: FormData,
): Promise<DashboardFormsStateType> => {
	const id = data.get('id') as string;

	const dataToValidate = {
		name: data.get('name'),
		slug: data.get('slug'),
		hexCode: data.get('hexCode'),
	};

	const validationResult = colorFormSchema.safeParse(dataToValidate);

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
			where: { id },
		});

		if (!color) {
			return { success: false, message: 'Color not found' };
		}

		await prisma.color.update({
			where: { id },
			data: {
				name: validationResult.data.name,
				slug: validationResult.data.slug,
				hexCode: validationResult.data.hexCode,
			},
		});

		updateTag('/dashboard/colors');

		return {
			success: true,
			message: 'Color successfully updated',
		};
	} catch (error) {
		console.error(error);

		const errorMsg = error instanceof Error
			? error.message
			: 'An error occurred during create category, reload the page or try it later';

		return { errors: { general: errorMsg } };
	}
};
