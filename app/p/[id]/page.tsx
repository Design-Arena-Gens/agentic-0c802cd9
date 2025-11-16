import { PostCard } from '@/components/PostCard';

export default async function PostDetail({ params, searchParams }: { params: { id: string }, searchParams?: Record<string, string | string[] | undefined> }) {
  const ref = (searchParams?.ref as string) || '';
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/posts`, { cache: 'no-store' });
  const data = await res.json();
  const post = (data.posts as any[]).find(p => p.id === params.id);
  if (!post) {
    return <div className="col"><h2>Introuvable</h2><div className="help">Ce post n'existe pas.</div></div>;
  }
  return (
    <div className="col" style={{ gap: 16 }}>
      <PostCard post={post} ambassadorId={ref || undefined} />
    </div>
  );
}
