'use client';

import { useState } from 'react';
import {
  Gift,
  MapPin,
  Navigation,
  ShieldCheck,
  Camera,
  Clock,
  CheckCircle2,
  AlertCircle,
  Lock,
  Coins,
  UserCheck
} from 'lucide-react';

export default function PrimPage() {
  const [toastMsg, setToastMsg] = useState('');
  const [activeReservation, setActiveReservation] = useState(null);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [verifyingShopId, setVerifyingShopId] = useState(null);

  const triggerToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  // Saha Noktaları (Net prim tutarları ve anonimleştirilmiş durumlar ile)
  const [shops, setShops] = useState([
    {
      id: 1,
      name: 'Yılmaz Oto Yedek Parça',
      address: 'Kadıköy Sanayi Sit. No: 14',
      reward: 75, // Net Kazanım Tutarı (₺)
      status: 'OPEN', // 'OPEN', 'RESERVED', 'COMPLETED'
      statusText: 'Açık Konumda',
      timer: null
    },
    {
      id: 2,
      name: 'Öztürk Hırdavat',
      address: 'Bostancı Sanayi C Blok No: 8',
      reward: 100,
      status: 'RESERVED_BY_OTHER', // Başka biri yolda (Anonimleştirilmiş gizlilik)
      statusText: 'Bir Saha Primcisi Yolda (Doğrulanıyor)'
    },
    {
      id: 3,
      name: 'Çetin Elektrik',
      address: 'Ümraniye Sanayi No: 42',
      reward: 50,
      status: 'COMPLETED',
      statusText: 'Ziyaret Edildi (24s Kilitli)'
    }
  ]);

  // Noktayı Rezerve Et (2 Saatlik Kilit)
  const handleReserve = (id) => {
    setShops(
      shops.map((s) => (s.id === id ? { ...s, status: 'RESERVED', statusText: 'Rezerv Edildi (2 Saat Süreniz Var)' } : s))
    );
    setActiveReservation(id);
    triggerToast('Nokta rezerve edildi. 2 saat içinde konuma gitmelisiniz.');
  };

  // GPS ve Zaman Damgası Kontrollü Fotoğraf Doğrulama
  const handleVerifyWithGPSAndPhoto = (id) => {
    setVerifyingShopId(id);
    // Simüle edilmiş GPS & Anti-Fraud kontrolü
    setTimeout(() => {
      setShops(
        shops.map((s) => (s.id === id ? { ...s, status: 'COMPLETED', statusText: 'Ziyaret Edildi & Onaylandı' } : s))
      );
      setVerifyingShopId(null);
      setIsPhotoModalOpen(false);
      setActiveReservation(null);
      triggerToast('GPS konumu doğrulandı ve zaman damgalı fotoğraf kabul edildi! Prim hesabınıza eklendi.');
    }, 2000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* ÜST BİLGİ KARTI */}
      <div className="bg-white p-6 rounded-2xl border border-[#dfe8f1] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#fff1e4] text-[#f58220] rounded-2xl">
            <Gift className="w-7 h-7" />
          </div>
          <div>
            <h1 className="font-extrabold text-xl text-[#12355b]">Saha Ziyareti & Güvenli Prim Merkezi</h1>
            <p className="text-xs text-[#5b6f82] mt-0.5">
              GPS doğrulaması ve zaman damgalı fotoğraflarla güvenli saha kontrolü sağlayın, prim kazanın.
            </p>
          </div>
        </div>

        <div className="bg-[#effaf5] border border-[#b8e6d2] px-4 py-2.5 rounded-xl flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#12805c]" />
          <div className="text-xs">
            <p className="font-bold text-[#12805c]">Anti-Fraud Koruması Aktif</p>
            <p className="text-[10px] text-slate-500">50m mesafe ve zaman damgası zorunlu</p>
          </div>
        </div>
      </div>

      {/* ANA İÇERİK: HARİTA VE LİSTE */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* HARİTA ALANI */}
        <div className="lg:col-span-7 bg-[#e4edf5] rounded-2xl border border-slate-200 p-4 min-h-[380px] flex flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#12355b_1px,transparent_1px)] [background-size:16px_16px]"></div>

          <div className="relative z-10 flex justify-between items-center">
            <span className="text-xs font-bold text-[#12355b] bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-slate-200">
              Canlı Saha Radar Haritası
            </span>
            <span className="text-[10px] bg-emerald-100 text-[#12805c] font-bold px-2.5 py-1 rounded-full">
              GPS Konum Doğrulandı
            </span>
          </div>

          <div className="relative z-10 my-auto space-y-3 flex flex-col items-center justify-center">
            {shops.map((s) => (
              <div
                key={s.id}
                className={`p-3 rounded-xl shadow-lg border text-xs font-bold flex items-center gap-2 ${
                  s.status === 'OPEN'
                    ? 'bg-white text-[#12355b] border-emerald-500 animate-pulse'
                    : s.status === 'RESERVED'
                    ? 'bg-amber-50 text-amber-900 border-amber-400'
                    : 'bg-slate-100 text-slate-500 border-slate-300'
                }`}
              >
                <MapPin className="w-4 h-4 text-[#12805c]" />
                <span>{s.name} ({s.reward} ₺ Prim)</span>
              </div>
            ))}
          </div>

          <div className="relative z-10 flex justify-between items-center bg-white/90 backdrop-blur-sm p-3 rounded-xl border border-slate-200 text-xs">
            <span className="text-[#5b6f82]">Bulunduğunuz konuma en yakın görevler listeleniyor</span>
            <span className="font-bold text-[#12355b]">3 Aktif Görev</span>
          </div>
        </div>

        {/* NOKTALAR VE NET PRİM TUTARLARI */}
        <div className="lg:col-span-5 space-y-3">
          <h2 className="font-extrabold text-sm text-[#12355b] flex items-center gap-2">
            <Coins className="w-4 h-4 text-[#f58220]" /> Yakındaki Saha Görevleri
          </h2>

          {shops.map((shop) => (
            <div key={shop.id} className="bg-white p-4 rounded-2xl border border-[#dfe8f1] shadow-sm space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-extrabold text-xs text-[#18314c]">{shop.name}</h3>
                  <p className="text-[11px] text-[#5b6f82] mt-0.5">{shop.address}</p>
                </div>
                {/* NET PRİM TUTARI KARTI */}
                <span className="text-xs font-black text-[#12805c] bg-[#effaf5] px-3 py-1.5 rounded-xl border border-[#b8e6d2] shadow-sm">
                  +{shop.reward} ₺ Kazan
                </span>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className={`font-bold text-[11px] ${shop.status === 'OPEN' ? 'text-[#12805c]' : 'text-slate-500'}`}>
                  ● {shop.statusText}
                </span>

                {shop.status === 'OPEN' && (
                  <button
                    onClick={() => handleReserve(shop.id)}
                    className="px-3.5 py-2 bg-[#12805c] hover:bg-[#0f6b4d] text-white font-bold rounded-xl transition-colors cursor-pointer text-xs"
                  >
                    Görevi Rezerve Et (2 Saat)
                  </button>
                )}

                {shop.status === 'RESERVED' && (
                  <button
                    onClick={() => setIsPhotoModalOpen(true)}
                    className="px-3.5 py-2 bg-[#f58220] hover:bg-[#d96b14] text-white font-bold rounded-xl transition-colors cursor-pointer text-xs flex items-center gap-1.5 animate-bounce"
                  >
                    <Camera className="w-3.5 h-3.5" /> Konuma Vardım, Fotoğrafla Doğrula
                  </button>
                )}

                {shop.status === 'RESERVED_BY_OTHER' && (
                  <span className="px-3 py-1.5 bg-amber-50 text-amber-800 rounded-xl font-bold text-[10px] border border-amber-200">
                    🔒 Başka Primci Yolda (Gizli)
                  </span>
                )}

                {shop.status === 'COMPLETED' && (
                  <span className="px-3 py-1.5 bg-slate-100 text-slate-500 rounded-xl font-bold text-[10px]">
                    ✓ Tamamlandı
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* GPS & ZAMAN DAMGALI FOTOĞRAF DOĞRULAMA MODALI (ANTİ-FRAUD) */}
      {isPhotoModalOpen && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm p-4 flex items-center justify-center">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <div className="p-3 bg-emerald-50 text-[#12805c] rounded-2xl">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-[#12355b]">GPS & Zaman Damgalı Doğrulama</h3>
                <p className="text-[11px] text-[#5b6f82]">Dükkan önünden canlı fotoğraf çekin.</p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border border-dashed border-slate-300 rounded-2xl text-center space-y-2">
              <Camera className="w-10 h-10 text-slate-400 mx-auto" />
              <p className="text-xs font-semibold text-slate-600">GPS Konumu ve Saat otomatik eklenecektir.</p>
              <button
                onClick={() => handleVerifyWithGPSAndPhoto(1)}
                className="px-4 py-2 bg-[#12355b] text-white text-xs font-bold rounded-xl hover:bg-[#0d2744] transition-colors cursor-pointer"
              >
                Kamerayı Aç ve Fotoğraf Çek
              </button>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setIsPhotoModalOpen(false)}
                className="px-4 py-2 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-200 cursor-pointer"
              >
                İptal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST BİLDİRİMİ */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 bg-[#12355b] text-white text-xs font-bold px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 z-50">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" /> {toastMsg}
        </div>
      )}
    </div>
  );
}