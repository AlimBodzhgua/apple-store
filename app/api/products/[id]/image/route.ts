import type { NextRequest } from 'next/server';
import { prisma } from '@/shared/lib/prisma';

export async function GET(req: NextRequest, context: RouteContext<'/api/products/[id]/image'>) {
	const params = await context.params;
	const id = params.id;

	const product = await prisma.product.findUnique({
		where: { id },
		select: { imageData: true, imageType: true, imageName: true },
	});

	if (!product?.imageData) {
		return new Response('Image not found', { status: 404 });
	}

	return new Response(product.imageData, {
		headers: {
			'Content-Type': product.imageType || 'image/jpeg',
		},
	});
}
