import { PostCard } from '@/components/PostCard';

export default async function Page({ searchParams }: { searchParams?: Record<string, string | string[] | undefined> }) {
  const ref = (searchParams?.ref as string) || '';
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/posts`, { cache: 'no-store' });
  const data = await res.json();
  const posts = data.posts as any[];

  return (
    <div className="col" style={{ gap: 16 }}>
      <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 className="section-title">Fil d'inspiration</h2>
        <span className="help">Cliquez sur un tag pour personnaliser et acheter</span>
      </div>
      <div className="grid">
        {posts.map((p) => (
          <PostCard key={p.id} post={p} ambassadorId={ref || undefined} />
        ))}
      </div>
      <div className="footer-space" />
    </div>
  );
}
