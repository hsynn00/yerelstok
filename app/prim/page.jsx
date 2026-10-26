'use client';

import { useState } from 'react';
import {
  Gift,
  Coins,
  CheckCircle2,
  Copy,
  Check,
  CreditCard,
  ShieldCheck
} from 'lucide-react';

export default function PrimPage() {
  const [toastMsg, setToastMsg] = useState('');
  const [copied, setCopied] = useState(false);

  // Kalıcı Referans Kodu (Reklam yok, doğrudan profil üzerinden aktif)
  const userRefCode = 'VARMI2026MERT';

  // Ödeme Talep Formu State'leri (Türk Lirası - ₺)
  const [ibanInput, setIbanInput] = useState('');
  const [payoutRequested, setPayoutRequested] = useState(false);

  const triggerToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const copyRefCode = () => {
    navigator.clipboard.writeText(userRefCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    triggerToast('Referans kodu kopyalandı!');
  };

  const handlePayoutRequest = (e) => {
    e.preventDefault();
    if (!ibanInput) return;
    setPayoutRequested(true);
    triggerToast('Ödeme talebi TL cinsinden başarıyla iletildi.');
  };

  // Referansla Kaydolan, Admin Onaylı ve Ücret Ödemiş Esnaflar (TL Bazlı)
  const [referredShops, setReferredShops] = useState([
    { id: 1, name: 'Yılmaz Oto Yedek Parça', date: '18.10.2026', rewardTl: 750, isPaid: true },
    { id: 2, name: 'Öztürk Hırdavat', date: '21.10.2026', rewardTl: 750, isPaid: true },
    { id: 3, name: 'Çetin Elektrik', date: '25.10.2026', rewardTl: 750, isPaid: false }, // Bekleyen
  ]);

  const totalTl = referredShops.reduce((acc, curr) => acc + curr.rewardTl, 0);
  const paidTl = referredShops.filter(s => s.isPaid).reduce((acc, curr) => acc + curr.rewardTl, 0);
  const unpaidTl = referredShops.filter(s => !s.isPaid).reduce((acc, curr) => acc + curr.rewardTl, 0);

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* ÜST BİLGİ & GİZLİ REFERANS KODU */}
      <div className="bg-white p-6 rounded-2xl border border-[#dfe8f1] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#fff1e4] text-[#f58220] rounded-2xl">
            <Gift className="w-7 h-7" />
          </div>
          <div>
            <h1 className="font-extrabold text-xl text-[#12355b]">Saha Ortaklığı & Referans Paneli</h1>
            <p className="text-xs text-[#5b6f82] mt-0.5">
              Referans kodunuzla platforma kaydolan ve abonelik/ödeme süreci admin onayından geçen esnaflardan TL bazlı prim kazanın.
            </p>
          </div>
        </div>

        {/* REFERANS KODU PAYLAŞIM ALANI */}
        <div className="bg-[#f4f7fb] p-4 rounded-2xl border border-slate-200 flex items-center gap-3">
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
          <p className="text-2xl font-black text-[#12355b] mt-1">{totalTl} ₺</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-[#dfe8f1] shadow-sm">
          <p className="text-xs font-bold text-[#5b6f82]">Ödenen Komisyonlar</p>
          <p className="text-2xl font-black text-[#12805c] mt-1">{paidTl} ₺</p>
        </div>

        {/* ÖDEME TALEP ETME BÖLÜMÜ (TL) */}
        <div className="bg-white p-5 rounded-2xl border border-[#dfe8f1] shadow-sm flex flex-col justify-between">
          <div>
            <p className="text-xs font-bold text-[#12355b] flex items-center gap-1">
              <CreditCard className="w-4 h-4 text-[#12805c]" /> Ödeme Talep Et (TL)
            </p>
          </div>
          {!payoutRequested ? (
            <form onSubmit={handlePayoutRequest} className="space-y-2 mt-2 text-xs">
              <input
                type="text"
                required
                placeholder="TR... IBAN Numarası giriniz"
                value={ibanInput}
                onChange={(e) => setIbanInput(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-[11px] outline-none focus:ring-2 focus:ring-[#12355b]"
              />
              <button
                type="submit"
                className="w-full py-2 bg-[#12805c] hover:bg-[#0f6b4d] text-white font-bold rounded-lg transition-colors cursor-pointer"
              >
                Talebi Gönder ({unpaidTl} ₺ Bekleyen)
              </button>
            </form>
          ) : (
            <p className="text-xs font-bold text-[#12805c] bg-emerald-50 p-2 rounded-xl border border-emerald-200 mt-2">
              ✓ Ödeme talebiniz iletildi.
            </p>
          )}
        </div>
      </div>

      {/* REFERANSLA KAYDOLA ESNAFLAR LİSTESİ (ÖDENEN / ÖDENMEYEN DETAYI) */}
      <div className="bg-white p-5 rounded-2xl border border-[#dfe8f1] shadow-sm space-y-4">
        <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
          <div>
            <h2 className="font-extrabold text-base text-[#12355b] flex items-center gap-2">
              <Coins className="w-5 h-5 text-[#f58220]" /> Referansınızla Kaydolan Onaylı Esnaflar
            </h2>
            <p className="text-xs text-[#5b6f82]">Esnaf abonelik ücretini ödeyip admin onayından geçtikten sonra prim hesabınıza yansır.</p>
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
                  <td className="p-3 font-bold flex items-center gap-1.5">
                    {shop.name} <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" title="Admin Onaylı & Ödemeli" />
                  </td>
                  <td className="p-3 text-slate-500">{shop.date}</td>
                  <td className="p-3 font-black text-[#12805c]">+{shop.rewardTl} ₺</td>
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

      {toastMsg && (
        <div className="fixed bottom-6 right-6 bg-[#12355b] text-white text-xs font-bold px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 z-50">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" /> {toastMsg}
        </div>
      )}
    </div>
  );
}