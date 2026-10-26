'use client';

import { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Coins,
  Store,
  FileText,
  Send,
  Check
} from 'lucide-react';

export default function AdminPage() {
  const [toastMsg, setToastMsg] = useState('');

  const triggerToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  // 1. Esnaf Onay Kuyruğu (Abonelik ve Vergi Kontrolü)
  const [pendingShops, setPendingShops] = useState([
    { id: 1, name: 'Anadolu Hırdavat', owner: 'Ahmet Y.', vkn: '1234567890', paymentStatus: 'Ödeme Yapıldı', status: 'BEKLIYOR' },
    { id: 2, name: 'Mega Oto Yedek Parça', owner: 'Can K.', vkn: '9876543210', paymentStatus: 'Ödeme Bekliyor', status: 'BEKLIYOR' },
  ]);

  // 2. Primci Ödeme Talepleri Listesi
  const [payoutRequests, setPayoutRequests] = useState([
    { id: 1, primerName: 'Mert A. (VARMI2026MERT)', amount: 1500, iban: 'TR33 0001 0001 ...', status: 'BEKLIYOR' },
    { id: 2, primerName: 'Selin K. (VARMI2026SELIN)', amount: 750, iban: 'TR55 0002 0005 ...', status: 'BEKLIYOR' },
  ]);

  const handleApproveShop = (id) => {
    setPendingShops(pendingShops.map(s => s.id === id ? { ...s, status: 'ONAYLANDI' } : s));
    triggerToast('Esnaf aboneliği onaylandı. Primciye hak ediş tanımlandı.');
  };

  const handleSendPayout = (id) => {
    setPayoutRequests(payoutRequests.map(p => p.id === id ? { ...p, status: 'ODENDI' } : p));
    triggerToast('Ödeme tamamlandı olarak işaretlendi.');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* ÜST BİLGİ */}
      <div className="bg-white p-6 rounded-2xl border border-[#dfe8f1] shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-50 text-emerald-700 rounded-2xl">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <h1 className="font-extrabold text-xl text-[#12355b]">Yönetici Finans & Onay Merkezi</h1>
            <p className="text-xs text-[#5b6f82] mt-0.5">
              Esnaf abonelik onayları ve saha primcisi ödeme taleplerini buradan yönetin.
            </p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* 1. ESNAF ONAY VE ABONELİK KUYRUĞU */}
        <div className="bg-white p-5 rounded-2xl border border-[#dfe8f1] shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="font-extrabold text-base text-[#12355b] flex items-center gap-2">
              <Store className="w-5 h-5 text-[#12805c]" /> Esnaf Abonelik & VKN Onay Kuyruğu
            </h2>
            <span className="text-xs bg-amber-100 text-amber-800 font-bold px-2.5 py-1 rounded-full">
              {pendingShops.filter(s => s.status === 'BEKLIYOR').length} Bekleyen
            </span>
          </div>

          <div className="space-y-3">
            {pendingShops.map((shop) => (
              <div key={shop.id} className="p-4 bg-[#f4f7fb] rounded-xl border border-slate-200 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-xs text-[#18314c]">{shop.name} ({shop.owner})</h3>
                    <p className="text-[11px] text-[#5b6f82] mt-0.5">VKN: {shop.vkn}</p>
                    <p className="text-[10px] text-blue-600 font-semibold mt-1">Durum: {shop.paymentStatus}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md ${shop.status === 'ONAYLANDI' ? 'bg-emerald-100 text-[#12805c]' : 'bg-amber-100 text-amber-800'}`}>
                    {shop.status === 'ONAYLANDI' ? 'Onaylandı' : 'İncelemede'}
                  </span>
                </div>

                {shop.status === 'BEKLIYOR' && (
                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => handleApproveShop(shop.id)}
                      className="flex-1 py-2 bg-[#12805c] hover:bg-[#0f6b4d] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                    >
                      ✓ Vergi Levhası & Ödemeyi Onayla
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 2. PRİMCİ ÖDEME TALEPLERİ */}
        <div className="bg-white p-5 rounded-2xl border border-[#dfe8f1] shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="font-extrabold text-base text-[#12355b] flex items-center gap-2">
              <Coins className="w-5 h-5 text-[#f58220]" /> Primci Ödeme Talepleri (IBAN)
            </h2>
            <span className="text-xs bg-[#eaf1f7] text-[#12355b] font-bold px-2.5 py-1 rounded-full">
              {payoutRequests.filter(p => p.status === 'BEKLIYOR').length} Talep
            </span>
          </div>

          <div className="space-y-3">
            {payoutRequests.map((req) => (
              <div key={req.id} className="p-4 bg-[#f4f7fb] rounded-xl border border-slate-200 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-xs text-[#18314c]">{req.primerName}</h3>
                    <p className="text-[11px] text-[#5b6f82] font-mono mt-0.5">IBAN: {req.iban}</p>
                    <p className="text-xs font-black text-[#12805c] mt-1">Tutar: {req.amount} ₺</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md ${req.status === 'ODENDI' ? 'bg-emerald-100 text-[#12805c]' : 'bg-amber-100 text-amber-800'}`}>
                    {req.status === 'ODENDI' ? 'Ödendi' : 'Ödeme Bekliyor'}
                  </span>
                </div>

                {req.status === 'BEKLIYOR' && (
                  <button
                    onClick={() => handleSendPayout(req.id)}
                    className="w-full py-2 bg-[#12355b] hover:bg-[#0d2744] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" /> IBAN'a Gönderildi / Ödendi İşaretle
                  </button>
                )}
              </div>
            ))}
          </div>
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