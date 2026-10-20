'use client';

import { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  Users,
  Package,
  Search,
  Activity,
  CheckCircle2,
  XCircle,
  MessageSquare,
  Megaphone,
  Ban,
  LayoutGrid,
  Building2,
  LogOut
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState(false);

  // Örnek Admin Verileri
  const [verifications, setVerifications] = useState([
    { id: 1, name: 'Arda Yapı Market', doc: 'Vergi levhası ve VKN doğrulaması bekliyor.', status: 'PENDING' },
    { id: 2, name: 'Usta Elektrik', doc: 'T.C. Kimlik ve dükkan ruhsatı yüklendi.', status: 'PENDING' },
  ]);

  const [announcement, setAnnouncement] = useState('');
  const [replyText, setReplyText] = useState('');
  const [toastMsg, setToastMsg] = useState('');

  const triggerToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const handleVerifyAction = (id, action) => {
    setVerifications(verifications.map(v => v.id === id ? { ...v, status: action } : v));
    triggerToast(action === 'APPROVED' ? 'Esnaf kaydı onaylandı.' : 'Esnaf kaydı reddedildi.');
  };

  const handleSendAnnouncement = (e) => {
    e.preventDefault();
    if (!announcement.trim()) return;
    setAnnouncement('');
    triggerToast('Duyuru tüm kullanıcılara yayınlandı.');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center p-4">
        <div className="bg-white p-6 rounded-2xl border border-[#dfe8f1] shadow-md max-w-sm w-full space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="p-3 bg-[#12355b] text-white rounded-xl">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-extrabold text-base text-[#12355b]">YerelStok Admin</h1>
              <p className="text-xs text-[#5b6f82]">Yönetici Kontrol Merkezi</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-3 text-xs">
            <div>
              <label className="block text-[#18314c] font-bold mb-1">Yönetici Şifresi</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#12355b]"
              />
            </div>

            {loginError && (
              <p className="text-rose-600 font-bold text-[11px]">Hatalı şifre! (Varsayılan: admin123)</p>
            )}

            <button
              type="submit"
              className="w-full py-2.5 bg-[#12355b] hover:bg-[#0d2744] text-white font-bold rounded-xl transition-colors cursor-pointer"
            >
              Giriş Yap
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      {/* ÜST BİLGİ & ÇIKIŞ BAR KARTI */}
      <div className="bg-[#12355b] text-white p-6 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold text-[#dbeafe] uppercase tracking-wider">Platform Yönetimi</span>
          <h1 className="text-2xl font-black text-white mt-0.5 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-emerald-400" /> Merkezi Yönetici Paneli
          </h1>
          <p className="text-xs text-[#dbeafe] mt-1">
            Esnaf onayları, stok hareketleri, reklam yerleşimleri ve kullanıcı duyurularını tek ekrandan yönetin.
          </p>
        </div>
        <button
          onClick={() => setIsAuthenticated(false)}
          className="px-4 py-2 bg-white/15 hover:bg-white/25 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-2 self-start md:self-auto cursor-pointer"
        >
          <LogOut className="w-4 h-4" /> Güvenli Çıkış
        </button>
      </div>

      {/* 1. İSTATİSTİK KARTLARI */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#dfe8f1] shadow-sm">
          <p className="text-xs font-bold text-[#5b6f82]">Toplam Esnaf Sayısı</p>
          <p className="text-2xl font-black text-[#12355b] mt-1">1.284</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-[#dfe8f1] shadow-sm">
          <p className="text-xs font-bold text-[#5b6f82]">Aktif Stok Kalemi</p>
          <p className="text-2xl font-black text-[#12355b] mt-1">36.942</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-[#dfe8f1] shadow-sm">
          <p className="text-xs font-bold text-[#5b6f82]">Günlük Canlı Stok Sorgusu</p>
          <p className="text-2xl font-black text-[#12355b] mt-1">8.407</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-[#dfe8f1] shadow-sm">
          <p className="text-xs font-bold text-[#5b6f82]">Anlık Canlı Ziyaretçi</p>
          <p className="text-2xl font-black text-[#12805c] mt-1">326</p>
        </div>
      </div>

      {/* 2. MODÜLLER (2 SÜTUNLU YAPI) */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* ESNAF ONAY & DOĞRULAMA */}
        <div className="bg-white p-5 rounded-2xl border border-[#dfe8f1] shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="font-extrabold text-base text-[#12355b] flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#12805c]" /> Esnaf Onay & Doğrulama
            </h2>
            <span className="text-xs bg-[#effaf5] text-[#12805c] font-bold px-2.5 py-1 rounded-full">
              2 Bekleyen Onay
            </span>
          </div>

          <div className="space-y-3">
            {verifications.map((v) => (
              <div key={v.id} className="p-3.5 bg-[#f4f7fb] rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <h3 className="font-bold text-[#18314c]">{v.name}</h3>
                  <p className="text-[#5b6f82] mt-0.5">{v.doc}</p>
                </div>
                {v.status === 'PENDING' ? (
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleVerifyAction(v.id, 'APPROVED')}
                      className="px-3 py-1.5 bg-[#12805c] hover:bg-[#0f6b4d] text-white font-bold rounded-lg transition-colors cursor-pointer"
                    >
                      Onayla
                    </button>
                    <button
                      onClick={() => handleVerifyAction(v.id, 'REJECTED')}
                      className="px-3 py-1.5 bg-rose-100 hover:bg-rose-200 text-rose-700 font-bold rounded-lg transition-colors cursor-pointer"
                    >
                      Reddet
                    </button>
                  </div>
                ) : (
                  <span className={`font-bold px-2.5 py-1 rounded-md text-[11px] ${v.status === 'APPROVED' ? 'bg-emerald-100 text-[#12805c]' : 'bg-rose-100 text-rose-700'}`}>
                    {v.status === 'APPROVED' ? 'Onaylandı' : 'Reddedildi'}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* DİLEK, ÖNERİ VE MÜŞTERİ YANITLARI */}
        <div className="bg-white p-5 rounded-2xl border border-[#dfe8f1] shadow-sm space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="font-extrabold text-base text-[#12355b] flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-600" /> Geri Bildirim Kutusu
            </h2>
          </div>

          <div className="p-3.5 bg-[#f4f7fb] rounded-xl border border-slate-200 text-xs space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-bold text-[#18314c]">Selin K. (Müşteri)</span>
              <span className="text-[10px] text-slate-400">Az önce</span>
            </div>
            <p className="text-[#5b6f82]">"Arama sonuçlarında ürünleri markaya göre filtreleme seçeneği eklenebilir mi?"</p>
            <div className="flex gap-2 pt-1">
              <input
                type="text"
                placeholder="Kullanıcıya yanıt yazın..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="flex-1 p-2 bg-white border border-slate-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-[#12355b]"
              />
              <button
                onClick={() => { if(replyText){ setReplyText(''); triggerToast('Yanıt gönderildi.'); } }}
                className="px-3 py-2 bg-[#12355b] hover:bg-[#0d2744] text-white font-bold rounded-lg transition-colors cursor-pointer"
              >
                Yanıtla
              </button>
            </div>
          </div>
        </div>

        {/* REKLAM VE SPONSORLU YERLEŞİM YÖNETİMİ */}
        <div className="bg-white p-5 rounded-2xl border border-[#dfe8f1] shadow-sm space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="font-extrabold text-base text-[#12355b] flex items-center gap-2">
              <LayoutGrid className="w-5 h-5 text-[#f58220]" /> Reklam & Sponsor Yerleşimleri
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-[#f4f7fb] rounded-xl border border-slate-200">
              <h3 className="font-bold text-[#18314c]">Ana Sayfa Banner Slider</h3>
              <p className="text-[#5b6f82] mt-1">2 aktif kampanya görseli yayında.</p>
              <button
                onClick={() => triggerToast('Banner yönetim modülü açıldı.')}
                className="mt-3 w-full py-1.5 bg-[#eaf1f7] hover:bg-[#d8e5f0] text-[#12355b] font-bold rounded-lg transition-colors cursor-pointer"
              >
                Slider'ı Yönet
              </button>
            </div>

            <div className="p-3 bg-[#f4f7fb] rounded-xl border border-slate-200">
              <h3 className="font-bold text-[#18314c]">Öne Çıkarılan Dükkanlar</h3>
              <p className="text-[#5b6f82] mt-1">5 esnaf sponsorlu sırada.</p>
              <button
                onClick={() => triggerToast('Sponsor yerleşimleri güncellendi.')}
                className="mt-3 w-full py-1.5 bg-[#eaf1f7] hover:bg-[#d8e5f0] text-[#12355b] font-bold rounded-lg transition-colors cursor-pointer"
              >
                Yerleşimleri Düzenle
              </button>
            </div>
          </div>
        </div>

        {/* TOPLU DUYURU VE ENGELLEME YÖNETİMİ */}
        <div className="bg-white p-5 rounded-2xl border border-[#dfe8f1] shadow-sm space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="font-extrabold text-base text-[#12355b] flex items-center gap-2">
              <Megaphone className="w-5 h-5 text-rose-600" /> Toplu Duyuru & Hesap İşlemleri
            </h2>
          </div>

          <form onSubmit={handleSendAnnouncement} className="space-y-3 text-xs">
            <div>
              <label className="block text-[#18314c] font-bold mb-1">Tüm Platforma Duyuru Yayınla</label>
              <textarea
                rows={3}
                value={announcement}
                onChange={(e) => setAnnouncement(e.target.value)}
                placeholder="Örn: Sistem güncellemesi nedeniyle yarın 03:00-04:00 arası bakım çalışması yapılacaktır."
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#12355b]"
              />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <button
                type="submit"
                className="px-4 py-2 bg-[#12355b] hover:bg-[#0d2744] text-white font-bold rounded-xl transition-colors cursor-pointer"
              >
                Duyuruyu Yayınla
              </button>
              <button
                type="button"
                onClick={() => triggerToast('Riskli hesap engelleme ekranı açıldı.')}
                className="px-3 py-2 bg-rose-50 text-rose-700 hover:bg-rose-100 font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Ban className="w-3.5 h-3.5" /> Hesap Engelle / Askıya Al
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* TOAST BİLDİRİMİ */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 bg-[#12355b] text-white text-xs font-bold px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-3 z-50">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" /> {toastMsg}
        </div>
      )}
    </div>
  );
}