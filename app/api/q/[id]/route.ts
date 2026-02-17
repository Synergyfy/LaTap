import { NextRequest, NextResponse } from 'next/server';
import { redirectService } from '@/lib/redirect-service';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const destination = redirectService.getDestination(id);

    if (destination) {
        return NextResponse.redirect(destination, 302);
    }

    return new NextResponse('Redirection target not found', { status: 404 });
}
