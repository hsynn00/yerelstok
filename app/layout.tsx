'use client';

import './globals.css';
import Link from 'next/link';
import { useState } from 'react';
import { Store, Search, Gift, Home, User, LogIn, ShieldCheck, Settings, LogOut, HelpCircle, DollarSign, Euro } from 'lucide-react';
import HeaderAndChat from '../components/HeaderAndChat';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [currency, setCurrency] = useState<'TL' | 'USD' | 'EUR'>('TL');

  return (
    <html lang="tr">
      <body className="bg-[#f4f7fb] min-h-screen text-[#18314c] antialiased">
        {/* HEADER */}
        <header className="bg-white border-b border-[#dfe8f1] sticky top-0 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2">
            
            {/* LOGO - VAR MI */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <div className="w-9 h-9 rounded-xl bg-[#12355b] flex items-center justify-center text-white shadow-md">
                <Store className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-2xl text-[#12355b] tracking-tight">Var Mı</span>
            </Link>

            {/* NAV BAR */}
            <nav className="hidden md:flex items-center gap-1">
              <Link href="/" className="px-3 py-2 rounded-xl text-xs font-semibold text-[#5b6f82] hover:bg-[#eaf1f7] hover:text-[#12355b] flex items-center gap-1.5 transition-all">
                <Home className="w-4 h-4" /> Ana Sayfa
              </Link>
              <Link href="/arama" className="px-3 py-2 rounded-xl text-xs font-semibold text-[#5b6f82] hover:bg-[#eaf1f7] hover:text-[#12355b] flex items-center gap-1.5 transition-all">
                <Search className="w-4 h-4 text-[#12805c]" /> Stok Ara
              </Link>
              <Link href="/esnaf" className="px-3 py-2 rounded-xl text-xs font-semibold text-[#5b6f82] hover:bg-[#eaf1f7] hover:text-[#12355b] flex items-center gap-1.5 transition-all">
                <Store className="w-4 h-4 text-[#12805c]" /> Esnaf Paneli
              </Link>
              <Link href="/prim" className="px-3 py-2 rounded-xl text-xs font-semibold text-[#5b6f82] hover:bg-[#eaf1f7] hover:text-[#12355b] flex items-center gap-1.5 transition-all">
                <Gift className="w-4 h-4 text-[#f58220]" /> Prim Kazan
              </Link>
            </nav>

            {/* SAĞ PROFİL MENÜSÜ & PARA BİRİMİ SEÇİMİ */}
            <div className="relative flex items-center gap-2">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="w-10 h-10 rounded-xl bg-[#eaf1f7] text-[#12355b] flex items-center justify-center hover:bg-[#d8e5f0] transition-colors focus:ring-2 focus:ring-[#12355b]"
                aria-label="Profil menüsü"
              >
                <User className="w-5 h-5" />
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 top-12 w-64 bg-white rounded-2xl border border-[#dfe8f1] shadow-xl p-3 z-50 animate-in fade-in zoom-in-95 space-y-2">
                  <div className="px-2 py-1 border-b border-slate-100">
                    <p className="text-xs font-bold text-[#12355b]">Saha Primcisi</p>
                    <p className="text-[10px] text-[#5b6f82]">Aktif Para Birimi: <strong className="text-[#12805c]">{currency}</strong></p>
                  </div>

                  {/* PARA BİRİMİ DEĞİŞTİRME */}
                  <div className="bg-slate-50 p-1.5 rounded-xl border border-slate-200 flex justify-between gap-1 text-[11px] font-bold">
                    <button
                      onClick={() => setCurrency('TL')}
                      className={`flex-1 py-1 rounded-lg transition-colors ${currency === 'TL' ? 'bg-[#12355b] text-white' : 'text-[#5b6f82]'}`}
                    >
                      ₺ TL
                    </button>
                    <button
                      onClick={() => setCurrency('USD')}
                      className={`flex-1 py-1 rounded-lg transition-colors ${currency === 'USD' ? 'bg-[#12355b] text-white' : 'text-[#5b6f82]'}`}
                    >
                      $ USD
                    </button>
                    <button
                      onClick={() => setCurrency('EUR')}
                      className={`flex-1 py-1 rounded-lg transition-colors ${currency === 'EUR' ? 'bg-[#12355b] text-white' : 'text-[#5b6f82]'}`}
                    >
                      € EUR
                    </button>
                  </div>

                  <div className="space-y-1 pt-1">
                    <Link
                      href="/settings"
                      onClick={() => setShowProfileMenu(false)}
                      className="w-full text-left px-2.5 py-2 rounded-xl text-xs font-semibold text-[#18314c] hover:bg-[#f4f7fb] flex items-center gap-2"
                    >
                      <Settings className="w-4 h-4 text-slate-500" /> Hesap Ayarları
                    </Link>
                    <Link
                      href="/support"
                      onClick={() => setShowProfileMenu(false)}
                      className="w-full text-left px-2.5 py-2 rounded-xl text-xs font-semibold text-[#18314c] hover:bg-[#f4f7fb] flex items-center gap-2"
                    >
                      <HelpCircle className="w-4 h-4 text-slate-500" /> İletişim & Destek
                    </Link>
                    <Link
                      href="/admin"
                      onClick={() => setShowProfileMenu(false)}
                      className="w-full text-left px-2.5 py-2 rounded-xl text-xs font-bold text-[#12355b] hover:bg-[#eaf1f7] flex items-center gap-2 border-t border-slate-100 mt-1 pt-2"
                    >
                      <ShieldCheck className="w-4 h-4 text-emerald-700" /> Yönetici Paneli
                    </Link>
                  </div>
                </div>
              )}
            </div>

          </div>
        </header>

        <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6">{children}</main>
        <HeaderAndChat />
      </body>
    </html>
  );
}