'use client';

import { useState } from 'react';
import {
  Gift,
  MapPin,
  ShieldCheck,
  Camera,
  Coins,
  CheckCircle2,
  Copy,
  Check
} from 'lucide-react';

export default function PrimPage() {
  const [toastMsg, setToastMsg] = useState('');
  const [copied, setCopied] = useState(false);
  const [activeReservation, setActiveReservation] = useState(null);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);

  const triggerToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  // Kullanıcının Referans Kodu
  const userRefCode = 'VARMI2026MERT';

  const copyRefCode = () => {
    navigator.clipboard.writeText(userRefCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    triggerToast('Referans kodu kopyalandı!');
  };

  // Sabit Standart Prim ve Esnaf Başına Takip + Ödenen / Ödenmeyen Ayrımı
  const [referredShops, setReferredShops] = useState([
    { id: 1, name: 'Yılmaz Oto Yedek Parça', date: '18.10.2026', reward: 100, isPaid: true },
    { id: 2, name: 'Öztürk Hırdavat', date: '21.10.2026', reward: 100, isPaid: true },
    { id: 3, name: 'Çetin Elektrik', date: '25.10.2026', reward: 100, isPaid: false }, // Bekleyen / Ödenmeyen
    { id: 4, name: 'Bostancı Somun Deposu', date: '26.10.2026', reward: 100, isPaid: false }, // Bekleyen / Ödenmeyen
  ]);

  const totalEarned = referredShops.reduce((acc, curr) => acc + curr.reward, 0);
  const paidAmount = referredShops.filter(s => s.isPaid).reduce((acc, curr) => acc + curr.reward, 0);
  const unpaidAmount = referredShops.filter(s => !s.isPaid).reduce((acc, curr) => acc + curr.reward, 0);

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* ÜST BİLGİ VE REFERANS KODU */}
      <div className="bg-white p-6 rounded-2xl border border-[#dfe8f1] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#fff1e4] text-[#f58220] rounded-2xl">
            <Gift className="w-7 h-7" />
          </div>
          <div>
            <h1 className="font-extrabold text-xl text-[#12355b]">Kullanıcı & Saha Referans Prim Merkezi</h1>
            <p className="text-xs text-[#5b6f82] mt-0.5">
              Referans kodunuzla kayıt olan esnaflar üzerinden sabit standart prim kazanın, ödemelerinizi takip edin.
            </p>
          </div>
        </div>

        {/* REFERANS KODU PAYLAŞIM ALANI */}
        <div className="bg-[#f4f7fb] p-3 rounded-2xl border border-slate-200 flex items-center gap-3">
          <div>
            <p className="text-[10px] font-bold text-[#556f82]">Sizin Referans Kodunuz</p>
            <p className="text-xs font-black text-[#12355b] font-mono">{userRefCode}</p>
          </div>
          <button
            onClick={copyRefCode}
            className="p-2 bg-[#12355b] hover:bg-[#0d2744] text-white rounded-xl transition-colors cursor-pointer"
            title="Kodu Kopyala"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* FİNANSAL ÖZET KARTLARI (ÖDENEN / ÖDENMEYEN AYRIMI) */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#dfe8f1] shadow-sm">
          <p className="text-xs font-bold text-[#5b6f82]">Toplam Kazanılan Prim</p>
          <p className="text-2xl font-black text-[#12355b] mt-1">{totalEarned} ₺</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-[#dfe8f1] shadow-sm">
          <p className="text-xs font-bold text-[#5b6f82]">Ödenen Komisyonlar</p>
          <p className="text-2xl font-black text-[#12805c] mt-1">{paidAmount} ₺</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-[#dfe8f1] shadow-sm">
          <p className="text-xs font-bold text-[#5b6f82]">Ödenecek (Bekleyen) Prim</p>
          <p className="text-2xl font-black text-amber-600 mt-1">{unpaidAmount} ₺</p>
        </div>
      </div>

      {/* REFERANS İLE KAYDOLA ESNAFLAR LİSTESİ (ÖDENEN / ÖDENMEYEN DETAYI) */}
      <div className="bg-white p-5 rounded-2xl border border-[#dfe8f1] shadow-sm space-y-4">
        <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
          <div>
            <h2 className="font-extrabold text-base text-[#12355b] flex items-center gap-2">
              <Coins className="w-5 h-5 text-[#f58220]" /> Referansınızla Kaydolan Esnaflar & Ödeme Durumları
            </h2>
            <p className="text-xs text-[#5b6f82]">Sabit standart esnaf başı prim takibi ve geçmiş komisyon ödemeleri.</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#f4f7fb] text-[#12355b] font-extrabold border-b border-slate-200">
                <th className="p-3 rounded-l-xl">Esnaf / Dükkan Adı</th>
                <th className="p-3">Kayıt Tarihi</th>
                <th className="p-3">Prim Tutarı</th>
                <th className="p-3 rounded-r-xl">Ödeme Durumu</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-semibold text-[#18314c]">
              {referredShops.map((shop) => (
                <tr key={shop.id} className="hover:bg-slate-50">
                  <td className="p-3 font-bold">{shop.name}</td>
                  <td className="p-3 text-slate-500">{shop.date}</td>
                  <td className="p-3 font-black text-[#12805c]">+{shop.reward} ₺</td>
                  <td className="p-3">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold ${
                      shop.isPaid ? 'bg-emerald-100 text-[#12805c]' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {shop.isPaid ? 'Ödendi (Tamamlandı)' : 'Ödenmedi (Bekliyor)'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* TOAST BİLDİRİMİ */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 bg-[#12355b] text-white text-xs font-bold px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 z-50">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" /> {toastMsg}
        </div>
      )}
    </div>
  );
}