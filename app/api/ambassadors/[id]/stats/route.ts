import { NextResponse } from 'next/server';
import { getStatsForAmbassador } from '@/lib/store';

export async function GET(_req: Request, ctx: { params: { id: string } }) {
  const id = ctx.params.id;
  const stats = getStatsForAmbassador(id);
  return NextResponse.json({ id, ...stats });
}
