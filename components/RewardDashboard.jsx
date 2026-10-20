'use client';

import { useState } from 'react';
import { MapPin, Navigation, Clock, Lock, CheckCircle2, User, AlertCircle, Camera } from 'lucide-react';

export default function RewardDashboard() {
  const [selectedShop, setSelectedShop] = useState(null);

  // Örnek Saha Dükkanları ve Canlı Durumları
  const [shops, setShops] = useState([
    {
      id: 1,
      name: 'Yılmaz Oto Yedek Parça',
      address: 'Kadıköy Sanayi Sit. No: 14',
      lat: 40.9901,
      lng: 29.0291,
      status: 'AVAILABLE', // Ziyarete açık
      reward: '50 ₺',
      activeVisitor: null,
    },
    {
      id: 2,
      name: 'Öztürk Hırdavat',
      address: 'Bostancı Sanayi C Blok No: 8',
      lat: 40.9650,
      lng: 29.1020,
      status: 'RESERVED', // Başkası yolda
      reward: '75 ₺',
      activeVisitor: 'Mehmet K. (Yolda - 15 dk kaldı)',
    },
    {
      id: 3,
      name: 'Çetin Elektrik',
      address: 'Ümraniye Sanayi No: 42',
      lat: 41.0220,
      lng: 29.1110,
      status: 'LOCKED', // Ziyaret edildi (24s kilitli)
      reward: '50 ₺',
      activeVisitor: 'Selin A. (Ziyaret Tamamlandı)',
    },
  ]);

  const handleReserve = (id) => {
    setShops(shops.map(s => s.id === id ? { ...s, status: 'MY_RESERVATION', activeVisitor: 'Siz (2 saat süreniz var)' } : s));
    alert('Dükkan 2 saatliğine size rezerve edildi! Diğer primciler bu dükkanı kilitli görecek.');
  };

  return (
    <div className="space-y-6">
      {/* BAŞLIK KARTI */}
      <div className="bg-white p-5 rounded-2xl border border-[#dfe8f1] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-[#12355b] flex items-center gap-2">
            <MapPin className="w-6 h-6 text-[#12805c]" /> Saha Ziyareti & Prim Görevleri
          </h1>
          <p className="text-xs text-[#5b6f82] mt-1">
            Haritadan açık dükkanı seçin, 2 saatliğine rezerve edin, 100m yakınına gidip canlı fotoğrafla priminizi kazanın.
          </p>
        </div>
        <div className="bg-[#effaf5] border border-[#b8e6d2] px-4 py-2.5 rounded-xl flex items-center gap-3">
          <span className="text-xs text-[#12805c] font-semibold">Aktif Bakiyeniz:</span>
          <span className="text-lg font-black text-[#12805c]">325 ₺</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        {/* HARİTA ALANI (Görsel İnteraktif Harita) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-[#dfe8f1] p-4 shadow-sm min-h-[350px] flex flex-col">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold text-[#12355b] flex items-center gap-1.5">
              <Navigation className="w-4 h-4 text-blue-600" /> Canlı Saha Haritası
            </span>
            <span className="text-[10px] bg-[#eaf1f7] text-[#12355b] font-bold px-2.5 py-1 rounded-full">
              GPS Aktif
            </span>
          </div>

          {/* Harita Temsili UI */}
          <div className="relative flex-1 bg-[#e4edf5] rounded-xl overflow-hidden border border-slate-200 flex items-center justify-center p-6 min-h-[280px]">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#12355b_1px,transparent_1px)] [background-size:16px_16px]"></div>
            
            {/* PINLER */}
            {shops.map((shop) => (
              <div
                key={shop.id}
                onClick={() => setSelectedShop(shop)}
                className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-110 p-2 rounded-2xl shadow-lg border flex items-center gap-1.5 text-xs font-bold ${
                  shop.status === 'AVAILABLE'
                    ? 'bg-[#12805c] text-white border-white'
                    : shop.status === 'RESERVED'
                    ? 'bg-[#f58220] text-white border-white'
                    : 'bg-slate-400 text-white border-slate-200'
                }`}
                style={{
                  top: shop.id === 1 ? '35%' : shop.id === 2 ? '65%' : '45%',
                  left: shop.id === 1 ? '40%' : shop.id === 2 ? '75%' : '20%',
                }}
              >
                <MapPin className="w-4 h-4" />
                <span>{shop.reward}</span>
              </div>
            ))}

            <p className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-[10px] font-semibold text-[#18314c] border border-slate-200 shadow-sm">
              🟢 Açık · 🟠 Rezerve/Yolda · ⚪ Kilitli Ziyaret Yapıldı
            </p>
          </div>
        </div>

        {/* SAHA DÜKKAN LİSTESİ */}
        <div className="lg:col-span-5 space-y-3">
          <h2 className="text-sm font-bold text-[#12355b]">Yakındaki Görevler ({shops.length})</h2>
          
          {shops.map((shop) => (
            <div
              key={shop.id}
              className={`p-4 rounded-2xl border transition-all ${
                shop.status === 'LOCKED'
                  ? 'bg-slate-50 border-slate-200 opacity-60'
                  : 'bg-white border-[#dfe8f1] hover:border-[#12805c] shadow-sm'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-sm text-[#18314c]">{shop.name}</h3>
                  <p className="text-xs text-[#5b6f82] flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5" /> {shop.address}
                  </p>
                </div>
                <span className="text-xs font-black text-[#12805c] bg-[#effaf5] px-2.5 py-1 rounded-lg">
                  +{shop.reward}
                </span>
              </div>

              {/* Aktif Ziyaretçi Bilgisi (Diğer kullanıcıların görmesi için) */}
              {shop.activeVisitor && (
                <div className="mt-2.5 p-2 rounded-lg bg-[#eaf1f7] text-[11px] font-semibold text-[#12355b] flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-blue-600" /> {shop.activeVisitor}
                </div>
              )}

              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                {shop.status === 'AVAILABLE' && (
                  <button
                    onClick={() => handleReserve(shop.id)}
                    className="w-full py-2 bg-[#12805c] hover:bg-[#0f6b4d] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                  >
                    Görevi Rezerve Et (2 Saat)
                  </button>
                )}

                {shop.status === 'MY_RESERVATION' && (
                  <button
                    onClick={() => alert('100m mesafedesiniz! Canlı kamera açılıyor...')}
                    className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Camera className="w-4 h-4" /> Foto Çek & Primi Al
                  </button>
                )}

                {shop.status === 'RESERVED' && (
                  <span className="w-full text-center py-2 bg-amber-50 text-amber-800 rounded-xl text-xs font-bold border border-amber-200 flex items-center justify-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> Başka Primci Yolda
                  </span>
                )}

                {shop.status === 'LOCKED' && (
                  <span className="w-full text-center py-2 bg-slate-100 text-slate-500 rounded-xl text-xs font-bold flex items-center justify-center gap-1">
                    <Lock className="w-3.5 h-3.5" /> 24 Saat Kilitli (Tamamlandı)
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}