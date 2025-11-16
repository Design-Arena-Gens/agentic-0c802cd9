"use client";
import { useMemo, useState } from 'react';
import { Tag } from '@/lib/types';
import { CustomizerDrawer } from './CustomizerDrawer';

export function TagOverlay({
  imageUrl,
  tags,
  postId,
  ambassadorId,
  title,
}: {
  imageUrl: string;
  tags: Tag[];
  postId: string;
  ambassadorId: string;
  title?: string;
}) {
  const [openTagId, setOpenTagId] = useState<string | null>(null);
  const openTag = useMemo(() => tags.find(t => t.id === openTagId) || null, [tags, openTagId]);

  return (
    <div className="img-wrap">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="img" src={imageUrl} alt={title || 'post'} />

      {tags.map((t) => (
        <button
          key={t.id}
          className="tag"
          style={{ left: `${t.x}%`, top: `${t.y}%` }}
          onClick={() => setOpenTagId(t.id)}
          title={`${t.product.name} ? ${t.product.priceEur.toFixed(2)}?`}
        >
          {t.product.name}
        </button>
      ))}

      <CustomizerDrawer
        tag={openTag}
        open={!!openTag}
        onClose={() => setOpenTagId(null)}
        ambassadorId={ambassadorId}
        postId={postId}
      />
    </div>
  );
}
