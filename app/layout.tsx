import './globals.css';
import type { Metadata } from 'next';
import { Nav } from '@/components/Nav';

export const metadata: Metadata = {
  title: 'StyleLink by Signeed Club',
  description: 'R?seau social de mode Tag-to-Customize',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <Nav />
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
