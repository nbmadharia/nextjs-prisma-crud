import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    const posts = await prisma.post.findMany();
    return NextResponse.json(posts);
}

export async function POST(request: Request) {
    const body = await request.json();
    const post = await prisma.post.create({
        data: body,
    });
    return NextResponse.json(post, { status: 201 });
}

export async function PUT(request: Request) {
    const body = await request.json();
    const { id } = body;
    const post = await prisma.post.update({
        where: { id },
        data: body,
    });
    return NextResponse.json(post);
}

export async function DELETE(request: Request) {
    const { id } = await request.json();
    await prisma.post.delete({
        where: { id },
    });
    return NextResponse.json({ message: 'Post deleted' });
}