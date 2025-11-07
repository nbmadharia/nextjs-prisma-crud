import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(_req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const numId = Number(id);
  if (Number.isNaN(numId)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  const post = await prisma.post.findUnique({ where: { id: numId } });
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
    console.log(`Fetched post with id ${id} inside`);
  return NextResponse.json(post);
}

export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const numId = Number(id);
  if (Number.isNaN(numId)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  const body = await req.json();
  const { title, content } = body;

  if (typeof title !== "string" || typeof content !== "string") {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const post = await prisma.post.update({
    where: { id: numId },
    data: { title, content },
  });
  console.log(`Post with id ${id} updated inside`);
  return NextResponse.json(post);
}

export async function DELETE(_req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const numId = Number(id);
  if (Number.isNaN(numId)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  await prisma.post.delete({ where: { id: numId } });
  console.log(`Post with id ${id} deleted inside`);
  return NextResponse.json({ ok: true });
}