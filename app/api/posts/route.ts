import { NextResponse } from 'next/server';
import { addPost, listPosts } from '@/lib/store';
import { Post } from '@/lib/types';

export async function GET() {
  const posts = listPosts();
  return NextResponse.json({ posts });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { imageUrl, tags = [], author, title, refCode } = body || {};
    if (!imageUrl || !author?.id || !author?.name) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }
    const post = addPost({ imageUrl, tags, author, title, refCode: refCode || author.id } as Post);
    return NextResponse.json({ post }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: 'Bad Request' }, { status: 400 });
  }
}
