"use client";

import React, { useState } from "react";
import { X, BadgeCheck } from "lucide-react";

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onToast: (msg: string) => void;
}

export default function AdminModal({ isOpen, onClose, onToast }: AdminModalProps) {
  const [announcement, setAnnouncement] = useState("");
  const [reply, setReply] = useState("");

  if (!isOpen) return null;

  const handleAction = () => {
    onToast("Yönetim işlemi kaydedildi.");
  };

  const handleAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (announcement.trim()) {
      setAnnouncement("");
      onToast("Toplu duyuru yayınlandı.");
    }
  };

  const handleReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (reply.trim()) {
      setReply("");
      onToast("Yanıt kullanıcıya gönderildi.");
    }
  };

  return (
    <div className="fixed inset-0 z-[75] bg-[#061a2ee6] overflow-y-auto sm:p-5 flex items-center justify-center">
      <section className="w-full max-w-[1280px] mx-auto bg-[#f4f7fb] sm:rounded-3xl overflow-hidden shadow-2xl my-auto">
        {/* Header */}
        <header className="bg-[#12355b] text-white p-5 sm:p-7 flex flex-wrap justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#dbeafe]">
              Yönetici Paneli
            </p>
            <h2 className="font-extrabold text-2xl mt-1 text-white">Kontrol Merkezi</h2>
            <p className="text-sm text-[#dbeafe] mt-1">
              Esnaf, stok, müşteri geri bildirimleri ve yayın akışını tek ekrandan yönetin.
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl bg-white/15 hover:bg-white/25 transition-colors grid place-items-center"
            aria-label="Kapat"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </header>

        {/* Content */}
        <main className="p-4 sm:p-7 max-h-[80vh] overflow-y-auto">
          {/* Stat Cards */}
          <section className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <article className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
              <p className="text-xs font-bold text-[#5b6f82]">Toplam Esnaf Sayısı</p>
              <p className="font-extrabold text-3xl mt-2 text-[#12355b]">1.284</p>
            </article>
            <article className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
              <p className="text-xs font-bold text-[#5b6f82]">Aktif Stok Sayısı</p>
              <p className="font-extrabold text-3xl mt-2 text-[#12355b]">36.942</p>
            </article>
            <article className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
              <p className="text-xs font-bold text-[#5b6f82]">Günlük Canlı Stok Sorgusu</p>
              <p className="font-extrabold text-3xl mt-2 text-[#12355b]">8.407</p>
            </article>
            <article className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
              <p className="text-xs font-bold text-[#5b6f82]">Anlık Site Ziyaretçisi</p>
              <p className="font-extrabold text-3xl mt-2 text-[#12805c]">326</p>
            </article>
          </section>

          {/* Grid Layout */}
          <div className="grid xl:grid-cols-2 gap-5 mt-5">
            {/* Esnaf Onay */}
            <section className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="font-extrabold text-xl text-[#12355b]">
                    Esnaf Onay &amp; Doğrulama Merkezi
                  </h2>
                  <p className="text-sm text-[#5b6f82] mt-1">
                    Bekleyen evrakları ve dükkan bilgilerini hızlıca inceleyin.
                  </p>
                </div>
                <BadgeCheck className="text-[#12805c] w-6 h-6" />
              </div>

              <div className="mt-5 space-y-3">
                <article className="rounded-xl border border-slate-200 bg-white p-4">
                  <div className="flex flex-wrap justify-between gap-3 items-center">
                    <div>
                      <h3 className="text-sm font-bold text-[#18314c]">Arda Yapı Market</h3>
                      <p className="text-xs text-[#5b6f82] mt-1">
                        Vergi levhası ve adres belgesi incelenmeyi bekliyor.
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={handleAction}
                        className="bg-[#12805c] hover:bg-[#0f6b4d] text-white rounded-lg px-3 py-2 text-xs font-bold"
                      >
                        Onayla
                      </button>
                      <button
                        onClick={handleAction}
                        className="bg-[#fdf0f0] text-[#b42318] hover:bg-[#f8d7d7] rounded-lg px-3 py-2 text-xs font-bold"
                      >
                        Reddet
                      </button>
                    </div>
                  </div>
                </article>

                <article className="rounded-xl border border-slate-200 bg-white p-4">
                  <div className="flex flex-wrap justify-between gap-3 items-center">
                    <div>
                      <h3 className="text-sm font-bold text-[#18314c]">Usta Elektrik</h3>
                      <p className="text-xs text-[#5b6f82] mt-1">
                        Kimlik ve mağaza dış cephe fotoğrafı yüklendi.
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={handleAction}
                        className="bg-[#12805c] hover:bg-[#0f6b4d] text-white rounded-lg px-3 py-2 text-xs font-bold"
                      >
                        Onayla
                      </button>
                      <button
                        onClick={handleAction}
                        className="bg-[#fdf0f0] text-[#b42318] hover:bg-[#f8d7d7] rounded-lg px-3 py-2 text-xs font-bold"
                      >
                        Reddet
                      </button>
                    </div>
                  </div>
                </article>
              </div>
            </section>

            {/* Dilek & Şikayet */}
            <section className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
              <h2 className="font-extrabold text-xl text-[#12355b]">
                Dilek, Öneri &amp; Şikayet Kutusu
              </h2>
              <p className="text-sm text-[#5b6f82] mt-1">
                Kullanıcı ve esnaftan gelen bildirimleri yanıtlayın.
              </p>

              <article className="mt-5 rounded-xl border border-slate-200 bg-white p-4">
                <h3 className="text-sm font-bold text-[#18314c]">Selin K. · Müşteri</h3>
                <p className="text-sm text-[#18314c] mt-2">
                  Arama sonucunda ürün filtreleri daha detaylı olabilir.
                </p>
                <form onSubmit={handleReply} className="mt-3 flex gap-2">
                  <input
                    type="text"
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    placeholder="Yanıtınızı yazın..."
                    className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-sm text-[#18314c] focus:outline-none focus:border-[#12355b]"
                  />
                  <button
                    type="submit"
                    className="bg-[#12355b] hover:bg-[#0d2744] text-white rounded-xl px-4 text-sm font-bold transition-colors"
                  >
                    Yanıtla
                  </button>
                </form>
              </article>
            </section>

            {/* Reklam Yönetimi */}
            <section className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
              <h2 className="font-extrabold text-xl text-[#12355b]">
                Reklam &amp; Öne Çıkarılanlar Yönetimi
              </h2>
              <p className="text-sm text-[#5b6f82] mt-1">
                Ana sayfa görünürlüğünü ve sponsorlu yerleşimleri kontrol edin.
              </p>

              <div className="grid sm:grid-cols-2 gap-3 mt-5">
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <h3 className="text-sm font-bold text-[#18314c]">Ana Sayfa Slider</h3>
                  <p className="text-xs text-[#5b6f82] mt-1">2 aktif kampanya yayında.</p>
                  <button
                    onClick={() => onToast("Slider yönetim paneline yönlendiriliyor...")}
                    className="mt-3 rounded-lg px-3 py-2 text-xs font-bold bg-[#eaf1f7] text-[#12355b] hover:bg-[#d8e5f0] transition-colors"
                  >
                    Slider'ı Yönet
                  </button>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <h3 className="text-sm font-bold text-[#18314c]">Sponsorlu Sonuçlar</h3>
                  <p className="text-xs text-[#5b6f82] mt-1">
                    5 dükkan ve 12 ürün öne çıkarılıyor.
                  </p>
                  <button
                    onClick={() => onToast("Yerleşim yönetim paneline yönlendiriliyor...")}
                    className="mt-3 rounded-lg px-3 py-2 text-xs font-bold bg-[#eaf1f7] text-[#12355b] hover:bg-[#d8e5f0] transition-colors"
                  >
                    Yerleşimleri Yönet
                  </button>
                </div>
              </div>
            </section>

            {/* Engelleme ve Duyuru */}
            <section className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
              <h2 className="font-extrabold text-xl text-[#12355b]">
                Kullanıcı &amp; Esnaf Engelleme
              </h2>
              <p className="text-sm text-[#5b6f82] mt-1">
                Riskli hesaplar için süreli veya kalıcı aksiyon alın; duyurular yayınlayın.
              </p>

              <div className="grid sm:grid-cols-2 gap-3 mt-5">
                <button
                  onClick={handleAction}
                  className="rounded-xl py-3 text-sm font-bold bg-[#fff8e7] text-[#8a5a00] hover:bg-[#fceec9] transition-colors"
                >
                  Geçici Engelleme
                </button>
                <button
                  onClick={handleAction}
                  className="rounded-xl py-3 text-sm font-bold bg-[#fdf0f0] text-[#b42318] hover:bg-[#f8d7d7] transition-colors"
                >
                  Kalıcı Engelleme
                </button>
              </div>

              <form onSubmit={handleAnnouncement} className="mt-5 border-t border-slate-100 pt-5">
                <label className="block text-xs font-bold text-[#18314c]">
                  Toplu duyuru / yayın mesajı
                </label>
                <textarea
                  rows={3}
                  value={announcement}
                  onChange={(e) => setAnnouncement(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:border-[#12355b]"
                  placeholder="Duyuru metnini buraya yazın..."
                />
                <button
                  type="submit"
                  className="mt-3 rounded-xl px-4 py-3 text-sm font-bold bg-[#12355b] text-white hover:bg-[#0d2744] transition-colors w-full sm:w-auto"
                >
                  Duyuruyu Yayınla
                </button>
              </form>
            </section>
          </div>
        </main>
      </section>
    </div>
  );
}