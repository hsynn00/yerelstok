import Link from 'next/link';
import { Search, Store, Gift } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 text-center py-12">
      <div className="space-y-3">
        <h1 className="text-4xl font-extrabold text-slate-800">
          Yakınınızdaki Esnafın Stoklarını Anında Bulun
        </h1>
        <p className="text-slate-600 max-w-xl mx-auto text-sm">
          YerelStok ile sanayi ve hırdavat esnafının canlı stoklarına erişin, aradığınız ürünü dükkan dükkan gezmeden bulun.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
        <Link href="/arama" className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-emerald-600 transition-all block group">
          <Search className="w-8 h-8 text-emerald-700 mb-3 group-hover:scale-110 transition-transform" />
          <h2 className="font-bold text-slate-800 text-lg">Stok & Dükkan Ara</h2>
          <p className="text-xs text-slate-500 mt-1">Harita üzerinden yakındaki canlı stokları inceleyin.</p>
        </Link>

        <Link href="/esnaf" className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-emerald-600 transition-all block group">
          <Store className="w-8 h-8 text-emerald-700 mb-3 group-hover:scale-110 transition-transform" />
          <h2 className="font-bold text-slate-800 text-lg">Esnaf Paneli</h2>
          <p className="text-xs text-slate-500 mt-1">Dükkanınızı kaydedin, stoklarınızı canlıya alın.</p>
        </Link>

        <Link href="/prim" className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-emerald-600 transition-all block group">
          <Gift className="w-8 h-8 text-emerald-700 mb-3 group-hover:scale-110 transition-transform" />
          <h2 className="font-bold text-slate-800 text-lg">Prim Kazan</h2>
          <p className="text-xs text-slate-500 mt-1">Reklamları izleyin, platform içi puan ve prim toplayın.</p>
        </Link>
      </div>
    </div>
  );
}