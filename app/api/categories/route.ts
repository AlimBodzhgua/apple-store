import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { prisma } from '@/shared/lib/prisma';

export async function GET(req: NextRequest) {
	try {
		const categoryId = req.nextUrl.searchParams.get('id');

		if (categoryId) {
			const product = await prisma.category.findFirst({
				where: {
					id: categoryId,
				},
			});

			if (product) {
				return NextResponse.json({
					status: 404,
					errorMessage: 'Product not found',
				});
			}

			return NextResponse.json(product);
		}

		const categories = await prisma.category.findMany();

		return NextResponse.json(categories);
	} catch (error) {
		console.error('Error fetcing products', error);

		return NextResponse.json({
			status: 500,
			errorMessage: 'Internal server error',
		});
	}
}
