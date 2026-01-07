'use server';

import { revalidateTag, updateTag } from 'next/cache';
import { z } from 'zod';
import { prisma } from '@/shared/lib/prisma';
import type { DashboardFormsStateType } from '../types';

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
		let errorMsg = 'An error occurred during create color, reload the page or try it later';

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
		let errorMsg = 'An error occurred during create color, reload the page or try it later';

		if (error instanceof Error) {
			errorMsg = error.message;
		}

		return { errors: { general: errorMsg } };
	}
};