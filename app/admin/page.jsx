'use client';

import { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Coins,
  Store,
  FileSpreadsheet,
  Trash2,
  Plus,
  KeyRound,
  ExternalLink
} from 'lucide-react';

export default function AdminPage() {
  const [toastMsg, setToastMsg] = useState('');

  const triggerToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  // Bot Dükkanlar
  const [bots, setBots] = useState([
    { id: 1, name: 'Örnek Sanayi Civata (Demo)', address: 'İkitelli OSB No: 12', count: 15 },
  ]);
  const [botForm, setBotForm] = useState({ name: '', address: '', count: '' });

  // Esnaf Onay Kuyruğu (VKN ve GİB Doğrulama)
  const [pendingShops, setPendingShops] = useState([
    { id: 1, name: 'Anadolu Hırdavat', owner: 'Ahmet Y.', vkn: '1234567890', paymentStatus: 'Ödeme Yapıldı', status: 'BEKLIYOR' },
  ]);

  // Admin Özel VIP / İndirim Kodları
  const [promoCodes, setPromoCodes] = useState([
    { id: 1, code: 'VIPESNAF2026', discount: '%100 Ücretsiz Esnaf', usedCount: 3 },
  ]);
  const [newPromo, setNewPromo] = useState({ code: '', discount: '%100 Ücretsiz' });

  // Primci Ödeme Talepleri
  const [payoutRequests, setPayoutRequests] = useState([
    { id: 1, primerName: 'Ahmet Yılmaz (VARMI2026)', amount: 325, iban: 'TR32 0006 2000 ...', status: 'BEKLIYOR' },
  ]);

  const handleCreatePromo = (e) => {
    e.preventDefault();
    if (!newPromo.code) return;
    setPromoCodes([...promoCodes, { id: Date.now(), ...newPromo, usedCount: 0 }]);
    setNewPromo({ code: '', discount: '%100 Ücretsiz' });
    triggerToast('Özel VIP indirim kodu oluşturuldu.');
  };

  const handleApproveShop = (id) => {
    setPendingShops(pendingShops.map(s => s.id === id ? { ...s, status: 'ONAYLANDI' } : s));
    triggerToast('Esnaf vergi numarası ve aboneliği onaylandı.');
  };

  const handleSendPayout = (id) => {
    setPayoutRequests(payoutRequests.map(p => p.id === id ? { ...p, status: 'ODENDI' } : p));
    triggerToast('Ödeme tamamlandı olarak işaretlendi.');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      
      {/* ÜST BAŞLIK */}
      <div className="bg-[#12355b] p-6 rounded-3xl text-white shadow-lg flex justify-between items-center">
        <div>
          <p className="text-xs text-blue-200 font-bold uppercase">Var Mı Platform Yönetimi</p>
          <h1 className="text-2xl font-black flex items-center gap-2 mt-1">
            <ShieldCheck className="w-7 h-7 text-emerald-400" /> Tam Yetkili Yönetici Kontrol Paneli
          </h1>
        </div>
      </div>

      {/* 1. ADMİN ÖZEL VİP / İNDİRİM KODU OLUŞTURMA (YENİ) */}
      <div className="bg-white p-5 rounded-2xl border border-[#dfe8f1] shadow-sm space-y-4">
        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
          <h2 className="font-extrabold text-base text-[#12355b] flex items-center gap-2">
            <KeyRound className="w-5 h-5 text-[#f58220]" /> Admin Özel VIP / Ücretsiz Esnaf Kodu Oluşturma
          </h2>
          <span className="text-xs bg-orange-100 text-[#f58220] font-bold px-3 py-1 rounded-full">
            {promoCodes.length} Aktif Kod
          </span>
        </div>
        <p className="text-xs text-[#5b6f82]">Bu kodları verdiğiniz esnaflar abonelik ücreti ödemeden veya indirimli olarak sisteme doğrudan kayıt olabilir.</p>

        <form onSubmit={handleCreatePromo} className="grid sm:grid-cols-3 gap-2 text-xs">
          <input
            type="text"
            required
            placeholder="Kod (Örn: VIPESNAF100)"
            value={newPromo.code}
            onChange={(e) => setNewPromo({ ...newPromo, code: e.target.value.toUpperCase() })}
            className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none font-mono font-bold"
          />
          <select
            value={newPromo.discount}
            onChange={(e) => setNewPromo({ ...newPromo, discount: e.target.value })}
            className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold"
          >
            <option value="%100 Ücretsiz Esnaf">%100 Tamamen Ücretsiz Esnaf</option>
            <option value="%50 İndirimli Esnaf">%50 İndirimli Esnaf Aboneliği</option>
          </select>
          <button type="submit" className="py-2.5 bg-[#f58220] hover:bg-[#d96b14] text-white font-bold rounded-xl cursor-pointer">
            + VIP Kod Üret
          </button>
        </form>

        <div className="grid sm:grid-cols-3 gap-3 pt-2">
          {promoCodes.map((pc) => (
            <div key={pc.id} className="p-3 bg-[#f4f7fb] rounded-xl border border-slate-200 flex justify-between items-center text-xs">
              <div>
                <p className="font-black text-[#12355b] font-mono">{pc.code}</p>
                <p className="text-[11px] text-[#12805c] font-bold">{pc.discount}</p>
              </div>
              <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-1 rounded-lg font-bold">
                {pc.usedCount} Kullanım
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. ESNAF ONAY & GİB VKN KONTROLÜ */}
      <div className="bg-white p-5 rounded-2xl border border-[#dfe8f1] shadow-sm space-y-4">
        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
          <h2 className="font-extrabold text-base text-[#12355b] flex items-center gap-2">
            <Store className="w-5 h-5 text-[#12805c]" /> Esnaf Abonelik & GİB VKN Kontrol Kuyruğu
          </h2>
          <span className="text-xs bg-amber-100 text-amber-800 font-bold px-3 py-1 rounded-full">
            {pendingShops.filter(s => s.status === 'BEKLIYOR').length} Bekleyen
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {pendingShops.map((shop) => (
            <div key={shop.id} className="p-4 bg-[#f4f7fb] rounded-xl border border-slate-200 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-xs text-[#18314c]">{shop.name} ({shop.owner})</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-[11px] text-[#5b6f82]">VKN: <strong className="font-mono text-[#12355b]">{shop.vkn}</strong></p>
                    {/* GİB RESMİ SORGULAMA LİNKİ (Fotoğraf gereksinimini ortadan kaldırır) */}
                    <a
                      href={`https://ivd.gib.gov.tr`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] bg-blue-100 text-blue-700 hover:bg-blue-200 px-2 py-0.5 rounded font-bold flex items-center gap-1"
                    >
                      GİB'de Sorgula <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${shop.status === 'ONAYLANDI' ? 'bg-emerald-100 text-[#12805c]' : 'bg-amber-100 text-amber-800'}`}>
                  {shop.status === 'ONAYLANDI' ? 'Onaylandı' : 'İncelemede'}
                </span>
              </div>
              {shop.status === 'BEKLIYOR' && (
                <button
                  onClick={() => handleApproveShop(shop.id)}
                  className="w-full py-2 bg-[#12805c] hover:bg-[#0f6b4d] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  ✓ VKN Doğrulandı & Onayla
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 3. PRİMCİ ÖDEME TALEPLERİ (IBAN) */}
      <div className="bg-white p-5 rounded-2xl border border-[#dfe8f1] shadow-sm space-y-4">
        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
          <h2 className="font-extrabold text-base text-[#12355b] flex items-center gap-2">
            <Coins className="w-5 h-5 text-[#f58220]" /> Prim Çekim Talepleri (IBAN)
          </h2>
          <button
            onClick={() => triggerToast('Excel dosyası indirildi.')}
            className="px-3 py-1.5 bg-[#12805c] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer"
          >
            <FileSpreadsheet className="w-4 h-4" /> Excel Aktar (TL)
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#f4f7fb] text-[#12355b] font-extrabold border-b border-slate-200">
                <th className="p-3 rounded-l-xl">Kullanıcı</th>
                <th className="p-3">IBAN Numarası</th>
                <th className="p-3">Tutar</th>
                <th className="p-3">Durum</th>
                <th className="p-3 rounded-r-xl text-right">Aksiyon</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-semibold text-[#18314c]">
              {payoutRequests.map((req) => (
                <tr key={req.id} className="hover:bg-slate-50">
                  <td className="p-3 font-bold">{req.primerName}</td>
                  <td className="p-3 font-mono text-[11px] text-slate-600">{req.iban}</td>
                  <td className="p-3 font-black text-[#12805c]">{req.amount} ₺</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${req.status === 'ODENDI' ? 'bg-emerald-100 text-[#12805c]' : 'bg-amber-100 text-amber-800'}`}>
                      {req.status === 'ODENDI' ? 'Ödendi' : 'Bekliyor'}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    {req.status === 'BEKLIYOR' ? (
                      <button onClick={() => handleSendPayout(req.id)} className="px-3 py-1.5 bg-[#12355b] text-white font-bold rounded-lg cursor-pointer">
                        Ödemeyi Gönder
                      </button>
                    ) : (
                      <span className="text-emerald-600 font-bold">Tamamlandı</span>
                    )}
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