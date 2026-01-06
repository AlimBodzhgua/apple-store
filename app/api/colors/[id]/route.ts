import { type NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/shared/lib/prisma';

export async function DELETE(req: NextRequest, context: RouteContext<'/api/colors/[id]'>) {
	try {
		const params = await context.params;
		const colorId = params.id;

		const color = await prisma.color.findFirst({
			where: {
				id: colorId,
			}
		})

		if (!color) {
			return NextResponse.json({
				status: 404,
				errorMessage: 'Color not found',
			});
		}

		const deletedColor = await prisma.color.delete({
			where: {
				id: colorId,
			},
		});

		revalidatePath('/dashboard/colors');

		return NextResponse.json(deletedColor);
	} catch (error) {
		console.error('Error deleting color', error);

		return NextResponse.json({
			status: 500,
			errorMessage: 'Internal server error',
		});
	}
}
