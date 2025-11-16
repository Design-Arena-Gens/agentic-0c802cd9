import { formatPriceEur } from '@/lib/utils';

export default async function Dashboard({ searchParams }: { searchParams?: Record<string, string | string[] | undefined> }) {
  const amb = (searchParams?.amb as string) || 'amb_demo';
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/ambassadors/${amb}/stats`, { cache: 'no-store' });
  const stats = await res.json();
  return (
    <div className="col" style={{ gap: 16 }}>
      <h2 className="section-title">Mon?tisation</h2>
      <div className="row" style={{ gap: 16, flexWrap: 'wrap' as const }}>
        <div className="card" style={{ padding: 16, minWidth: 220 }}>
          <div className="help">Ambassadeur</div>
          <div style={{ fontSize: 20, fontWeight: 700 }}>{stats.id}</div>
        </div>
        <div className="card" style={{ padding: 16, minWidth: 220 }}>
          <div className="help">Clics</div>
          <div style={{ fontSize: 20, fontWeight: 700 }}>{stats.clicks}</div>
        </div>
        <div className="card" style={{ padding: 16, minWidth: 220 }}>
          <div className="help">Revenu attribu? (est.)</div>
          <div style={{ fontSize: 20, fontWeight: 700 }}>{formatPriceEur(stats.revenueEur || 0)}</div>
        </div>
        <div className="card" style={{ padding: 16, minWidth: 220 }}>
          <div className="help">Commission (taux {Math.round((stats.rate || 0.1) * 100)}%)</div>
          <div style={{ fontSize: 20, fontWeight: 700 }}>{formatPriceEur(stats.estimatedCommissionEur || 0)}</div>
        </div>
      </div>
      <div className="help">Astuce: Ajoutez ?amb=votre_id ? l'URL pour visualiser vos stats.</div>
    </div>
  );
}
