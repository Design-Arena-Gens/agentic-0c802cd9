import Link from 'next/link';

export function Nav() {
  return (
    <header className="header">
      <div className="header-inner container">
        <div className="brand">
          <span className="badge">StyleLink</span>
          <span>by Signeed Club</span>
        </div>
        <nav className="nav-links">
          <Link href="/" className="nav-link">Fil</Link>
          <Link href="/create" className="nav-link">Cr?er</Link>
          <Link href="/dashboard" className="nav-link">Mon?tisation</Link>
        </nav>
      </div>
    </header>
  );
}
