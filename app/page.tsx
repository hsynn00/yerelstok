'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  Store,
  Gift,
  MapPin,
  Navigation,
  Megaphone,
  ExternalLink,
  ShieldCheck,
  PackageCheck
} from 'lucide-react';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');

  // ÖRNEK CANLI STOK VERİLERİ (ANA SAYFA İÇİN)
  const [searchResults] = useState([
    { id: 1, name: 'Honda Civic Ön Fren Balatası', code: 'FB-2024-18', count: 24, shop: 'Yılmaz Oto Yedek Parça', dist: '1.2 km', address: 'Kadıköy Sanayi' },
    { id: 2, name: 'M8 Ters Diş Paslanmaz Somun', code: 'M8-TRS', count: 600, shop: 'Yılmaz Sanayi Cıvata', dist: '0.8 km', address: 'İkitelli OSB' },
    { id: 3, name: '10 mm Titanyum Matkap Ucu', code: 'MU-10MM', count: 8, shop: 'Öztürk Hırdavat', dist: '2.4 km', address: 'Bostancı Sanayi' },
  ]);

  const filteredResults = searchResults.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-12">
      {/* 1. HERO BÖLÜMÜ */}
      <section className="text-center space-y-3 pt-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#12355b] tracking-tight">
          Yakınınızdaki Esnafın Stoklarını Anında Bulun
        </h1>
        <p className="text-xs sm:text-sm text-[#5b6f82] max-w-2xl mx-auto">
          <strong>Var Mı</strong> ile sanayi ve hırdavat esnafının canlı stoklarına erişin, aradığınız ürünü dükkan dükkan gezmeden anında bulun.
        </p>

        {/* HIZLI YÖNLENDİRME KARTLARI */}
        <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto pt-4">
          <a href="#stok-ara" className="bg-white p-5 rounded-2xl border border-[#dfe8f1] shadow-sm hover:shadow-md transition-all text-left group">
            <div className="w-10 h-10 rounded-xl bg-[#effaf5] text-[#12805c] grid place-items-center mb-3 group-hover:scale-105 transition-transform">
              <Search className="w-5 h-5" />
            </div>
            <h2 className="font-bold text-sm text-[#12355b]">Stok & Dükkan Ara</h2>
            <p className="text-xs text-[#5b6f82] mt-1">Harita üzerinden yakındaki canlı stokları ve dükkanları inceleyin.</p>
          </a>

          <Link href="/esnaf" className="bg-white p-5 rounded-2xl border border-[#dfe8f1] shadow-sm hover:shadow-md transition-all text-left group">
            <div className="w-10 h-10 rounded-xl bg-[#eaf1f7] text-[#12355b] grid place-items-center mb-3 group-hover:scale-105 transition-transform">
              <Store className="w-5 h-5" />
            </div>
            <h2 className="font-bold text-sm text-[#12355b]">Esnaf Paneli</h2>
            <p className="text-xs text-[#5b6f82] mt-1">Dükkanınızı kaydedin, stoklarınızı tek tıkla canlıya alın.</p>
          </Link>

          <Link href="/prim" className="bg-white p-5 rounded-2xl border border-[#dfe8f1] shadow-sm hover:shadow-md transition-all text-left group">
            <div className="w-10 h-10 rounded-xl bg-[#fff1e4] text-[#f58220] grid place-items-center mb-3 group-hover:scale-105 transition-transform">
              <Gift className="w-5 h-5" />
            </div>
            <h2 className="font-bold text-sm text-[#12355b]">Saha Primi Kazan</h2>
            <p className="text-xs text-[#5b6f82] mt-1">Saha ziyaretlerini tamamlayın, para çekme talebinizi oluşturun.</p>
          </Link>
        </div>
      </section>

      {/* 2. REKLAM / SPONSOR BANNER PANO 1 */}
      <section className="bg-gradient-to-r from-[#12355b] to-[#1d4ed8] text-white p-4 sm:p-5 rounded-2xl shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-white/10 rounded-xl shrink-0">
            <Megaphone className="w-6 h-6 text-[#f58220]" />
          </div>
          <div>
            <span className="text-[10px] bg-amber-400 text-slate-900 font-extrabold px-2 py-0.5 rounded-md">SPONSORLU KAMPANYA</span>
            <h3 className="font-bold text-sm text-white mt-1">Arda Yapı Market · Tüm Cıvata Gruplarında %15 İskonto!</h3>
            <p className="text-xs text-[#dbeafe]">Kadıköy Sanayi Şubesi teslimatlarında geçerli stok indirimi.</p>
          </div>
        </div>
        <a
          href="https://wa.me/905325551122"
          target="_blank"
          rel="noreferrer"
          className="px-4 py-2 bg-[#12805c] hover:bg-[#0f6b4d] text-white rounded-xl text-xs font-bold transition-colors shrink-0 flex items-center gap-1.5"
        >
          Kampanyayı İncele <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </section>

      {/* 3. ANA SAYFA ALTINA TAŞINAN CANLI STOK VE HARİTA MODÜLÜ */}
      <section id="stok-ara" className="bg-white p-5 sm:p-6 rounded-2xl border border-[#dfe8f1] shadow-sm space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h2 className="font-extrabold text-lg text-[#12355b] flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#12805c]" /> Canlı Stok & Harita Arama
            </h2>
            <p className="text-xs text-[#5b6f82] mt-0.5">Veritabanındaki gerçek dükkan ürünlerini anlık sorgulayın.</p>
          </div>

          {/* ARAMA İNPUTU */}
          <div className="relative max-w-md w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Ürün adı veya kod yazın (Örn: Balata, M8 Somun)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#12355b] text-xs font-semibold text-[#18314c]"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* LİSTE ALANI */}
          <div className="lg:col-span-5 space-y-3">
            <p className="text-xs font-bold text-[#12355b]">Bulunan Ürünler ({filteredResults.length})</p>
            {filteredResults.map((item) => (
              <div key={item.id} className="p-3.5 bg-[#f4f7fb] rounded-xl border border-slate-200 hover:border-[#12805c] transition-colors space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-xs text-[#18314c]">{item.name}</h3>
                    <p className="text-[11px] text-[#5b6f82]">KOD: {item.code}</p>
                  </div>
                  <span className="text-xs font-black text-[#12805c] bg-[#effaf5] px-2.5 py-1 rounded-lg border border-[#b8e6d2]">
                    {item.count} Adet
                  </span>
                </div>
                <div className="flex justify-between items-center text-[11px] text-[#5b6f82] pt-1 border-t border-slate-200/60">
                  <span className="flex items-center gap-1 font-semibold text-[#12355b]">
                    <Store className="w-3.5 h-3.5 text-[#12805c]" /> {item.shop}
                  </span>
                  <span>{item.dist} uzaklıkta</span>
                </div>
              </div>
            ))}
          </div>

          {/* HARİTA ALANI */}
          <div className="lg:col-span-7 bg-[#e4edf5] rounded-2xl border border-slate-200 p-4 min-h-[320px] flex flex-col justify-between relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#12355b_1px,transparent_1px)] [background-size:16px_16px]"></div>

            <div className="relative z-10 flex justify-between items-center">
              <span className="text-xs font-bold text-[#12355b] bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-slate-200">
                Bulunan Stok Lokasyonları
              </span>
              <span className="text-[10px] bg-[#effaf5] text-[#12805c] font-bold px-2.5 py-1 rounded-full border border-[#b8e6d2]">
                Canlı Harita
              </span>
            </div>

            {/* HARİTA PINLERİ */}
            <div className="relative z-10 my-auto flex items-center justify-center">
              <div className="p-3 bg-white rounded-xl shadow-lg border border-slate-200 flex items-center gap-2 text-xs font-bold text-[#12355b] animate-bounce">
                <MapPin className="w-5 h-5 text-[#12805c]" />
                <span>İkitelli OSB - En Yakın Dükkan</span>
              </div>
            </div>

            <div className="relative z-10 flex justify-between items-center bg-white/90 backdrop-blur-sm p-3 rounded-xl border border-slate-200 text-xs">
              <span className="text-[#5b6f82]">En yakın eşleşen dükkanla iletişime geçin</span>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 bg-[#12805c] hover:bg-[#0f6b4d] text-white font-bold rounded-lg transition-colors flex items-center gap-1"
              >
                <Navigation className="w-3.5 h-3.5" /> Yol Tarifi
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. REKLAM PANO 2 (ALT SPONSOR BANNER) */}
      <section className="bg-white p-5 rounded-2xl border border-[#dfe8f1] shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#eaf1f7] text-[#12355b] rounded-2xl">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-[#12355b]">Saha Primcisi Olun, Dükkan Başına Gelir Elde Edin</h3>
            <p className="text-xs text-[#5b6f82]">Haritadan onaylı dükkanı ziyaret edin, canlı fotoğrafla priminizi anında kazanın.</p>
          </div>
        </div>
        <Link
          href="/prim"
          className="px-4 py-2.5 bg-[#12355b] hover:bg-[#0d2744] text-white text-xs font-bold rounded-xl transition-colors shrink-0"
        >
          Saha Görevlerini Gör
        </Link>
      </section>
    </div>
  );
}