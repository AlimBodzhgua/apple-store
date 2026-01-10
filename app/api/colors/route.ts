import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { prisma } from '@/shared/lib/prisma';

export async function GET(req: NextRequest) {
	try {
		const colorId = req.nextUrl.searchParams.get('id');

		if (colorId) {
			const color = await prisma.color.findFirst({
				where: {
					id: colorId,
				},
			});

			if (!color) {
				return NextResponse.json({
					status: 404,
					errorMessage: 'Color not found',
				});
			}

			return NextResponse.json(color);
		}

		const colors = await prisma.color.findMany();

		return NextResponse.json(colors);
	} catch (error) {
		console.error('Error fetching colors', error);

		return NextResponse.json({
			status: 500,
			errorMessage: 'Internal server error',
		});
	}
};
