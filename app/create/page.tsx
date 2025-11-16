"use client";
import { useMemo, useRef, useState } from 'react';
import { Tag } from '@/lib/types';
import { uid } from '@/lib/utils';

export default function CreatePage() {
  const [imageUrl, setImageUrl] = useState<string>('https://images.unsplash.com/photo-1475178626620-a4d074967452?q=80&w=1600&auto=format&fit=crop');
  const [title, setTitle] = useState<string>('Mon look');
  const [tags, setTags] = useState<Tag[]>([]);
  const [productName, setProductName] = useState('T-shirt');
  const [price, setPrice] = useState<number>(29.9);
  const [colors, setColors] = useState<string>('noir, blanc');
  const [sizes, setSizes] = useState<string>('S, M, L, XL');
  const containerRef = useRef<HTMLDivElement>(null);

  const placeTag = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xPct = ((e.clientX - rect.left) / rect.width) * 100;
    const yPct = ((e.clientY - rect.top) / rect.height) * 100;
    const t: Tag = {
      id: uid('tag'),
      x: Math.max(2, Math.min(98, Math.round(xPct))),
      y: Math.max(2, Math.min(98, Math.round(yPct))),
      product: {
        id: uid('prod'),
        name: productName,
        priceEur: Number(price) || 0,
        options: {
          colors: colors.split(',').map((s) => s.trim()).filter(Boolean),
          sizes: sizes.split(',').map((s) => s.trim()).filter(Boolean),
        },
      },
      defaultSelection: { color: colors.split(',')[0]?.trim(), size: sizes.split(',')[0]?.trim() },
    };
    setTags((prev) => [...prev, t]);
  };

  const submit = async () => {
    const payload = {
      imageUrl,
      title,
      tags,
      author: { id: 'amb_creator', name: 'Vous' },
      refCode: 'amb_creator',
    };
    const res = await fetch('/api/posts', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    const json = await res.json();
    if (json?.post?.id) {
      window.location.href = `/p/${json.post.id}`;
    }
  };

  const canSubmit = useMemo(() => imageUrl && tags.length > 0, [imageUrl, tags.length]);

  return (
    <div className="col" style={{ gap: 16 }}>
      <h2 className="section-title">Cr?er un post</h2>
      <div className="row" style={{ gap: 16, alignItems: 'flex-start' }}>
        <div className="card" style={{ flex: 1, minWidth: 320 }}>
          <div className="img-wrap" ref={containerRef} onClick={placeTag} title="Cliquez pour placer un tag">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="img" src={imageUrl} alt="preview" />
            {tags.map((t) => (
              <span key={t.id} className="tag" style={{ left: `${t.x}%`, top: `${t.y}%` }}>{t.product.name}</span>
            ))}
          </div>
          <div className="card-body">
            <div className="help">Astuce: D?finissez d'abord les infos produit, puis cliquez sur l'image pour placer le tag.</div>
          </div>
        </div>
        <div className="card" style={{ width: 360 }}>
          <div className="card-body col" style={{ gap: 10 }}>
            <label className="col">
              <span className="help">Titre</span>
              <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} />
            </label>
            <label className="col">
              <span className="help">Image URL</span>
              <input className="input" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://..." />
            </label>
            <hr style={{ borderColor: 'rgba(255,255,255,.08)', width: '100%' }} />
            <div className="row" style={{ justifyContent: 'space-between' }}>
              <strong>Produit</strong>
              <span className="help">S'applique au prochain tag</span>
            </div>
            <label className="col">
              <span className="help">Nom</span>
              <input className="input" value={productName} onChange={(e) => setProductName(e.target.value)} />
            </label>
            <label className="col">
              <span className="help">Prix (?)</span>
              <input className="input" type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
            </label>
            <label className="col">
              <span className="help">Couleurs (s?par?es par des virgules)</span>
              <input className="input" value={colors} onChange={(e) => setColors(e.target.value)} />
            </label>
            <label className="col">
              <span className="help">Tailles (s?par?es par des virgules)</span>
              <input className="input" value={sizes} onChange={(e) => setSizes(e.target.value)} />
            </label>
            <button className="button primary" disabled={!canSubmit} onClick={submit}>Publier</button>
            <div className="help">Tags: {tags.length}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
