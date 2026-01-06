import { type NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/shared/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function DELETE(req: NextRequest, context: RouteContext<'/api/products/[id]'>) {
	try {
		const params = await context.params;
		const productId = params.id;

		if (!productId) {
			return NextResponse.json({
				status: 404,
				errorMessage: 'Category not found',
			});
		}

		const color = await prisma.product.delete({
			where: {
				id: productId,
			},
		});

		revalidatePath('/dashboard/products');

		return NextResponse.json(color);
	} catch (error) {
		console.error('Error deleting category', error);

		return NextResponse.json({
			status: 500,
			errorMessage: 'Internal server error',
		});
	}
}
