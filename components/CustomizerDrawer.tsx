"use client";
import { useState } from 'react';
import { Tag } from '@/lib/types';
import { formatPriceEur } from '@/lib/utils';

export function CustomizerDrawer({
  tag,
  open,
  onClose,
  ambassadorId,
  postId,
}: {
  tag: Tag | null;
  open: boolean;
  onClose: () => void;
  ambassadorId: string;
  postId: string;
}) {
  const [color, setColor] = useState<string | undefined>(tag?.defaultSelection?.color);
  const [size, setSize] = useState<string | undefined>(tag?.defaultSelection?.size);
  const product = tag?.product;

  if (!open || !tag || !product) return null;

  const colors = product.options.colors;
  const sizes = product.options.sizes;

  const buy = async () => {
    try {
      const res = await fetch('/api/click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId, tagId: tag.id, ambassadorId, selection: { color, size } }),
      });
      const json = await res.json();
      if (json?.deepLink) {
        window.open(json.deepLink, '_blank');
      }
    } finally {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <div className="section-title">{product.name}</div>
          <div className="pill">{formatPriceEur(product.priceEur)}</div>
        </div>

        <div className="col" style={{ gap: 12 }}>
          <div>
            <div className="help">Couleur</div>
            <div className="row" style={{ gap: 10, marginTop: 6 }}>
              {colors.map((c) => (
                <div
                  key={c}
                  className={"color-dot" + (color === c ? ' selected' : '')}
                  style={{ background: colorToCss(c) }}
                  onClick={() => setColor(c)}
                  title={c}
                />
              ))}
            </div>
          </div>
          <div>
            <div className="help">Taille</div>
            <div className="row" style={{ gap: 8, marginTop: 6, flexWrap: 'wrap' as const }}>
              {sizes.map((s) => (
                <button
                  key={s}
                  className="button"
                  style={{ padding: '6px 10px', borderRadius: 8, borderColor: size === s ? 'rgba(255,255,255,.5)' : undefined }}
                  onClick={() => setSize(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="row" style={{ justifyContent: 'flex-end', marginTop: 16, gap: 8 }}>
          <button className="button" onClick={onClose}>Annuler</button>
          <button className="button primary" onClick={buy}>Acheter et personnaliser</button>
        </div>
        <div className="help" style={{ marginTop: 8 }}>
          Le lien inclura votre code ambassadeur pour attribution.
        </div>
      </div>
    </div>
  );
}

function colorToCss(name: string): string {
  const map: Record<string, string> = {
    noir: '#111827',
    blanc: '#e5e7eb',
    bleu: '#3b82f6',
    gris: '#6b7280',
    vert: '#10b981',
    rouge: '#ef4444',
    rose: '#f472b6',
  };
  return map[name] || name;
}
