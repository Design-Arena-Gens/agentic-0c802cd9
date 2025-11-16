import { NextResponse } from 'next/server';
import { recordClick } from '@/lib/store';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { postId, tagId, ambassadorId, selection } = body || {};
    if (!postId || !tagId || !ambassadorId) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }
    const { deepLink } = recordClick({ postId, tagId, ambassadorId, selection });
    return NextResponse.json({ ok: true, deepLink });
  } catch (e) {
    return NextResponse.json({ error: 'Bad Request' }, { status: 400 });
  }
}
