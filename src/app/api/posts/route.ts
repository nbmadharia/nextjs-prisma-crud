import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    const posts = await prisma.post.findMany();
    console.log('Fetched posts outside');
    return NextResponse.json(posts);
}

export async function POST(request: Request) {
    const body = await request.json();
    const post = await prisma.post.create({
        data: body,
    });
    console.log(`Post created with id ${post.id} outside`);
    return NextResponse.json(post, { status: 201 });

}

export async function PUT(request: Request) {
    const body = await request.json();
    const { id } = body;
    const post = await prisma.post.update({
        where: { id },
        data: body,
    });
    console.log(`Post with id ${id} updated outside`);
    return NextResponse.json(post);
}

export async function DELETE(request: Request) {
    const { id } = await request.json();
    await prisma.post.delete({
        where: { id },
    });
    console.log(`Post with id ${id} deleted outside`);
    return NextResponse.json({ message: 'Post deleted out' });
}