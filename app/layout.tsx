'use client';

import './globals.css';
import Link from 'next/link';
import { useState } from 'react';
import { Store, Search, Gift, Home, UserCheck, LogIn, LogOut, ShieldCheck } from 'lucide-react';
import HeaderAndChat from '../components/HeaderAndChat';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Geçici oturum durumu (Firebase Auth bağlandığında otomatik güncellenecek)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('Ahmet Y.');

  const handleLogout = () => {
    setIsLoggedIn(false);
    alert('Çıkış yapıldı.');
  };

  return (
    <html lang="tr">
      <body className="bg-slate-50 min-h-screen text-slate-800 relative">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            {/* LOGO */}
            <Link href="/" className="flex items-center gap-2 font-black text-xl text-emerald-800">
              <Store className="w-6 h-6 text-emerald-700" />
              YerelStok
            </Link>

            {/* ORTA MENÜ */}
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

            {/* SAĞ TARAF: GİRİŞ / ÇIKIŞ & DOĞRULAMA BUTONLARI */}
            <div className="flex items-center gap-2">
              {!isLoggedIn ? (
                <>
                  <button
                    onClick={() => setIsLoggedIn(true)} // Test için doğrudan giriş yaptırır
                    className="px-3 py-2 border border-emerald-700 text-emerald-700 hover:bg-emerald-50 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <LogIn className="w-3.5 h-3.5" /> Giriş Yap
                  </button>
                  <Link
                    href="/verify"
                    className="px-3 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" /> Doğrula & Kaydol
                  </Link>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-700 flex items-center gap-1 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
                    <UserCheck className="w-3.5 h-3.5 text-emerald-600" /> {userName}
                  </span>
                  <button
                    onClick={handleLogout}
                    title="Çıkış Yap"
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main>{children}</main>

        {/* AI CANLI STOK SOHBET BOTU */}
        <HeaderAndChat />
      </body>
    </html>
  );
}