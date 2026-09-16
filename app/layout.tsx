import './globals.css';
import Link from 'next/link';
import { Store, Search, Gift, Home } from 'lucide-react';

export const metadata = {
  title: 'YerelStok - Yakındaki Esnaf Stokları',
  description: 'Sanayi ve hırdavat esnafının canlı stok arama platformu',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className="bg-slate-50 min-h-screen text-slate-800">
        {/* ÜST GEZİNTİ MENÜSÜ (NAVBAR) */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 font-black text-xl text-emerald-800">
              <Store className="w-6 h-6 text-emerald-700" />
              YerelStok
            </Link>

            <nav className="flex items-center gap-1 md:gap-2">
              <Link href="/" className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 flex items-center gap-1.5 transition-all">
                <Home className="w-4 h-4" /> <span className="hidden sm:inline">Ana Sayfa</span>
              </Link>
              <Link href="/arama" className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 flex items-center gap-1.5 transition-all">
                <Search className="w-4 h-4 text-emerald-700" /> <span>Stok Ara</span>
              </Link>
              <Link href="/esnaf" className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 flex items-center gap-1.5 transition-all">
                <Store className="w-4 h-4 text-emerald-700" /> <span>Esnaf Paneli</span>
              </Link>
              <Link href="/prim" className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 flex items-center gap-1.5 transition-all">
                <Gift className="w-4 h-4 text-emerald-700" /> <span>Prim Kazan</span>
              </Link>
            </nav>
          </div>
        </header>

        {/* SAYFA İÇERİKLERİ */}
        <main>{children}</main>
      </body>
    </html>
  );
}