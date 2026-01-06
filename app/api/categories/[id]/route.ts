import { prisma } from '@/shared/lib/prisma';
import { type NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function DELETE(req: NextRequest, context: RouteContext<'/api/products/[id]'>) {
	try {
		const params = await context.params;
		const categoryId = params.id;

		const category = await prisma.category.findFirst({
			where: {
				id: categoryId,
			}
		})

		if (!category) {
			return NextResponse.json({
				status: 404,
				errorMessage: 'Category not found',
			});
		}

		const deletedCategory = await prisma.category.delete({
			where: {
				id: categoryId,
			},
		});

		revalidatePath('/dashboard/categories');

		return NextResponse.json(deletedCategory);
	} catch (error) {
		console.error('Error deleting category', error);

		return NextResponse.json({
			status: 500,
			errorMessage: 'Internal server error',
		});
	}
}