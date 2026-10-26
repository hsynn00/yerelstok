'use client';

import './globals.css';
import Link from 'next/link';
import { useState } from 'react';
import { Store, User, ShieldCheck, LogOut, Gift, History, MessageSquare } from 'lucide-react';
import HeaderAndChat from '../components/HeaderAndChat';
import SmsVerificationModal from '../components/SmsVerificationModal';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<'USER' | 'MERCHANT' | 'PRIMER' | null>(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const currency = 'TL';
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [pendingRole, setPendingRole] = useState<'USER' | 'MERCHANT' | 'PRIMER'>('USER');

  // TypeScript Hata Çözümü: role parametresine tip eklendi
  const handleLoginTrigger = (role: 'USER' | 'MERCHANT' | 'PRIMER') => {
    setPendingRole(role);
    setIsLoginModalOpen(true);
    setShowProfileMenu(false);
  };

  const handleVerifiedSuccess = () => {
    setIsLoggedIn(true);
    setUserRole(pendingRole);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    setShowProfileMenu(false);
  };

  return (
    <html lang="tr">
      <body className="bg-[#f4f7fb] min-h-screen text-[#18314c] antialiased">
        {/* HEADER */}
        <header className="bg-white border-b border-[#dfe8f1] sticky top-0 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2">
            
            {/* LOGO */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <div className="w-9 h-9 rounded-xl bg-[#12355b] flex items-center justify-center text-white shadow-md">
                <Store className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-2xl text-[#12355b] tracking-tight">Var Mı</span>
            </Link>

            <div className="hidden md:flex items-center text-xs font-semibold text-[#5b6f82]">
              <span>Sanayi ve Hırdavat Esnafı Canlı Stok Arama Platformu</span>
            </div>

            {/* SAĞ PROFİL MENÜSÜ & KULLANICI GİRİŞİ */}
            <div className="relative flex items-center gap-2">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#eaf1f7] text-[#12355b] hover:bg-[#d8e5f0] transition-colors focus:ring-2 focus:ring-[#12355b] cursor-pointer"
                aria-label="Profil menüsü"
              >
                <User className="w-5 h-5" />
                <span className="text-xs font-bold hidden sm:inline">
                  {isLoggedIn ? (userRole === 'MERCHANT' ? 'Esnaf Hesabı' : userRole === 'PRIMER' ? 'Kullanıcı & Primci' : 'Kullanıcı Hesabı') : 'Kullanıcı Girişi'}
                </span>
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 top-12 w-64 bg-white rounded-2xl border border-[#dfe8f1] shadow-xl p-3 z-50 animate-in fade-in zoom-in-95 space-y-2">
                  <div className="px-2 py-1 border-b border-slate-100">
                    <p className="text-xs font-bold text-[#12355b]">
                      {isLoggedIn ? (userRole === 'MERCHANT' ? 'Esnaf Paneli Aktif' : 'Kullanıcı Profili Aktif') : 'Giriş Yapılmadı'}
                    </p>
                    <p className="text-[10px] text-[#5b6f82]">Birim: <strong className="text-[#12805c]">{currency}</strong></p>
                  </div>

                  {!isLoggedIn ? (
                    <div className="space-y-1.5 pt-1">
                      <button
                        onClick={() => handleLoginTrigger('USER')}
                        className="w-full text-left px-2.5 py-2 rounded-xl text-xs font-bold text-[#12355b] bg-[#f4f7fb] hover:bg-[#eaf1f7] flex items-center gap-2 cursor-pointer"
                      >
                        <User className="w-4 h-4 text-blue-600" /> Kullanıcı Girişi (Geçmiş & Sohbet)
                      </button>
                      <button
                        onClick={() => handleLoginTrigger('MERCHANT')}
                        className="w-full text-left px-2.5 py-2 rounded-xl text-xs font-bold text-[#12355b] bg-[#f4f7fb] hover:bg-[#eaf1f7] flex items-center gap-2 cursor-pointer"
                      >
                        <Store className="w-4 h-4 text-[#12805c]" /> Esnaf Girişi (Stok Paneli)
                      </button>
                      <button
                        onClick={() => handleLoginTrigger('PRIMER')}
                        className="w-full text-left px-2.5 py-2 rounded-xl text-xs font-bold text-[#12355b] bg-[#f4f7fb] hover:bg-[#eaf1f7] flex items-center gap-2 cursor-pointer"
                      >
                        <Gift className="w-4 h-4 text-[#f58220]" /> Kullanıcı & Prim Katıl
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-1 pt-1">
                      {userRole === 'USER' && (
                        <>
                          <Link
                            href="/history"
                            onClick={() => setShowProfileMenu(false)}
                            className="w-full text-left px-2.5 py-2 rounded-xl text-xs font-semibold text-[#18314c] hover:bg-[#f4f7fb] flex items-center gap-2"
                          >
                            <History className="w-4 h-4 text-blue-600" /> Arama Geçmişim
                          </Link>
                          <Link
                            href="/chats"
                            onClick={() => setShowProfileMenu(false)}
                            className="w-full text-left px-2.5 py-2 rounded-xl text-xs font-semibold text-[#18314c] hover:bg-[#f4f7fb] flex items-center gap-2"
                          >
                            <MessageSquare className="w-4 h-4 text-[#12805c]" /> Esnaf Sohbetlerim
                          </Link>
                          <button
                            onClick={() => { setUserRole('PRIMER'); setShowProfileMenu(false); }}
                            className="w-full text-left px-2.5 py-2 rounded-xl text-xs font-bold text-[#f58220] hover:bg-[#fff1e4] flex items-center gap-2 border-t border-slate-100 mt-1 pt-2 cursor-pointer"
                          >
                            <Gift className="w-4 h-4" /> Prim Paneline Geçiş Yap
                          </button>
                        </>
                      )}

                      {userRole === 'MERCHANT' && (
                        <Link
                          href="/esnaf"
                          onClick={() => setShowProfileMenu(false)}
                          className="w-full text-left px-2.5 py-2 rounded-xl text-xs font-bold text-[#12355b] hover:bg-[#eaf1f7] flex items-center gap-2"
                        >
                          <Store className="w-4 h-4 text-[#12805c]" /> Esnaf Stok Yönetim Paneli
                        </Link>
                      )}

                      {userRole === 'PRIMER' && (
                        <Link
                          href="/prim"
                          onClick={() => setShowProfileMenu(false)}
                          className="w-full text-left px-2.5 py-2 rounded-xl text-xs font-bold text-[#f58220] hover:bg-[#fff1e4] flex items-center gap-2"
                        >
                          <Gift className="w-4 h-4" /> Referans & Saha Prim Paneli
                        </Link>
                      )}

                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-2.5 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 flex items-center gap-2 border-t border-slate-100 mt-1 pt-2 cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" /> Çıkış Yap
                      </button>
                    </div>
                  )}

                  <div className="pt-2 border-t border-slate-100 mt-1">
                    <Link
                      href="/admin"
                      onClick={() => setShowProfileMenu(false)}
                      className="w-full text-left px-2.5 py-1.5 rounded-xl text-[11px] font-bold text-[#12355b] hover:bg-[#eaf1f7] flex items-center gap-2"
                    >
                      <ShieldCheck className="w-4 h-4 text-emerald-700" /> Yönetici Paneli (Admin)
                    </Link>
                  </div>
                </div>
              )}
            </div>

          </div>
        </header>

        <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6">{children}</main>
        <HeaderAndChat />

        <SmsVerificationModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
          onVerified={handleVerifiedSuccess}
          userType={pendingRole === 'MERCHANT' ? 'Esnaf' : pendingRole === 'PRIMER' ? 'Kullanıcı & Prim' : 'Kullanıcı'}
        />
      </body>
    </html>
  );
}