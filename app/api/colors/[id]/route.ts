import { type NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/shared/lib/prisma';
import { revalidatePath, revalidateTag, updateTag } from 'next/cache';

export async function DELETE(req: NextRequest, context: RouteContext<'/api/colors/[id]'>) {
	try {
		const params = await context.params;
		const colorId = params.id;

		if (!colorId) {
			return NextResponse.json({
				status: 404,
				errorMessage: 'Color not found',
			});
		}

		const color = await prisma.color.delete({
			where: {
				id: colorId,
			},
		});

		revalidatePath('/dashboard/colors');

		return NextResponse.json(color);
	} catch (error) {
		console.error('Error deleting color', error);

		return NextResponse.json({
			status: 500,
			errorMessage: 'Internal server error',
		});
	}
}
