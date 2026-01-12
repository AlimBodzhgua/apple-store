import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { prisma } from '@/shared/lib/prisma';

export async function GET(req: NextRequest) {
	try {
		const productId = req.nextUrl.searchParams.get('id');

		if (productId) {
			const product = await prisma.product.findFirst({
				where: {
					id: productId,
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

		const products = await prisma.product.findMany();

		return NextResponse.json(products);
	} catch (error) {
		console.error('Error fetching products', error);

		return NextResponse.json({
			status: 500,
			errorMessage: 'Internal server error',
		});
	}
}
