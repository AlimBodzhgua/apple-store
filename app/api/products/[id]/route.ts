import { revalidatePath } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/shared/lib/prisma';

export async function DELETE(req: NextRequest, context: RouteContext<'/api/products/[id]'>) {
	try {
		const params = await context.params;
		const productId = params.id;

		const product = await prisma.product.findFirst({
			where: {
				id: productId,
			},
		});

		if (!product) {
			return NextResponse.json({
				status: 404,
				errorMessage: 'Category not found',
			});
		}

		const deletedProduct = await prisma.product.delete({
			where: {
				id: productId,
			},
		});

		revalidatePath('/dashboard/products');

		return NextResponse.json(deletedProduct);
	} catch (error) {
		console.error('Error deleting category', error);

		return NextResponse.json({
			status: 500,
			errorMessage: 'Internal server error',
		});
	}
}
