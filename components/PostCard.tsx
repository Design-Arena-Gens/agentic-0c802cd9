import Link from 'next/link';
import { Post } from '@/lib/types';
import { TagOverlay } from './TagOverlay';
import { formatPriceEur } from '@/lib/utils';

export function PostCard({ post, ambassadorId }: { post: Post; ambassadorId?: string }) {
  const amb = ambassadorId || post.refCode || post.author.id;
  return (
    <article className="card">
      <div className="img-wrap">
        <TagOverlay imageUrl={post.imageUrl} tags={post.tags} postId={post.id} ambassadorId={amb} title={post.title} />
      </div>
      <div className="card-body">
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <div className="col">
            <strong>{post.title || 'Look'}</strong>
            <span className="help">par {post.author.name}</span>
          </div>
          <Link href={`/p/${post.id}`} className="pill">Voir le post</Link>
        </div>
        <div className="row" style={{ marginTop: 8, gap: 8, flexWrap: 'wrap' as const }}>
          {post.tags.slice(0, 3).map((t) => (
            <span key={t.id} className="pill" title={t.product.name}>
              {t.product.name} ? {formatPriceEur(t.product.priceEur)}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
