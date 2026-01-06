import { prisma } from '@/shared/lib/prisma';
import { revalidatePath } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: NextRequest, context: RouteContext<'/api/products/[id]'>) {
	try {
		const params = await context.params;
		const categoryId = params.id;

		if (!categoryId) {
			return NextResponse.json({
				status: 404,
				errorMessage: 'Category not found',
			});
		}

		const color = await prisma.category.delete({
			where: {
				id: categoryId,
			},
		});

		revalidatePath('/dashboard/categories');

		return NextResponse.json(color);
	} catch (error) {
		console.error('Error deleting category', error);

		return NextResponse.json({
			status: 500,
			errorMessage: 'Internal server error',
		});
	}
}