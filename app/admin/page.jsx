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
  ExternalLink,
  MessageSquare,
  Megaphone,
  X
} from 'lucide-react';

export default function AdminPage() {
  const [toastMsg, setToastMsg] = useState('');

  const triggerToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  // 1. Bot Dükkan Yönetimi
  const [bots, setBots] = useState([
    { id: 1, name: 'Örnek Sanayi Civata (Demo)', address: 'İkitelli OSB No: 12', count: 15 },
    { id: 2, name: 'Güneş Oto Elektrik (Demo)', address: 'Maslak Sanayi C Blok No: 4', count: 8 },
  ]);
  const [botForm, setBotForm] = useState({ name: '', address: '', count: '' });

  // 2. Esnaf Onay & GİB VKN Kuyruğu
  const [pendingShops, setPendingShops] = useState([
    { id: 1, name: 'Anadolu Hırdavat', owner: 'Ahmet Y.', vkn: '1234567890', paymentStatus: 'Ödeme Yapıldı', status: 'BEKLIYOR' },
    { id: 2, name: 'Mega Oto Yedek Parça', owner: 'Can K.', vkn: '9876543210', paymentStatus: 'Ödeme Bekliyor', status: 'BEKLIYOR' },
  ]);

  // 3. Admin Özel VIP / İndirim Kodları
  const [promoCodes, setPromoCodes] = useState([
    { id: 1, code: 'VIPESNAF2026', discount: '%100 Ücretsiz Esnaf', usedCount: 3 },
  ]);
  const [newPromo, setNewPromo] = useState({ code: '', discount: '%100 Ücretsiz Esnaf' });

  // 4. Primci Ödeme Talepleri (IBAN)
  const [payoutRequests, setPayoutRequests] = useState([
    { id: 1, primerName: 'Ahmet Yılmaz (VARMI2026)', amount: 325, iban: 'TR32 0006 2000 0000 1234 5678 90', status: 'BEKLIYOR' },
    { id: 2, primerName: 'Selin Kaya (VARMI2026SELIN)', amount: 500, iban: 'TR10 0001 5000 0000 9876 5432 10', status: 'BEKLIYOR' },
  ]);

  // 5. Geri Bildirim Kutusu
  const [feedbacks, setFeedbacks] = useState([
    { id: 1, user: 'Selin K. (Müşteri)', msg: 'Arama sonuçlarında ürünleri markaya göre filtreleme seçeneği eklenebilir mi?', time: 'Az önce' },
  ]);
  const [feedbackReply, setFeedbackReply] = useState('');

  const handleCreateBot = (e) => {
    e.preventDefault();
    if (!botForm.name) return;
    setBots([...bots, { id: Date.now(), ...botForm, count: Number(botForm.count) || 10 }]);
    setBotForm({ name: '', address: '', count: '' });
    triggerToast('Bot dükkan haritaya eklendi.');
  };

  const handleCreatePromo = (e) => {
    e.preventDefault();
    if (!newPromo.code) return;
    setPromoCodes([...promoCodes, { id: Date.now(), ...newPromo, usedCount: 0 }]);
    setNewPromo({ code: '', discount: '%100 Ücretsiz Esnaf' });
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
      <div className="bg-[#12355b] p-6 rounded-3xl text-white shadow-lg flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <p className="text-xs text-blue-200 font-bold uppercase tracking-wider">Var Mı Platform Yönetimi</p>
          <h1 className="text-2xl font-black flex items-center gap-2 mt-1">
            <ShieldCheck className="w-7 h-7 text-emerald-400" /> Tam Yetkili Yönetici Kontrol Paneli
          </h1>
        </div>
        <div className="bg-white/10 px-4 py-2 rounded-xl text-xs font-bold border border-white/10">
          Sistem Durumu: <span className="text-emerald-400">Aktif & Güvenli</span>
        </div>
      </div>

      {/* İSTATİSTİK KARTLARI */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#dfe8f1] shadow-sm">
          <p className="text-xs font-bold text-[#5b6f82]">Toplam Esnaf Sayısı</p>
          <p className="text-2xl font-black text-[#12355b] mt-1">1.286</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-[#dfe8f1] shadow-sm">
          <p className="text-xs font-bold text-[#5b6f82]">Aktif Stok Kalemi</p>
          <p className="text-2xl font-black text-[#12805c] mt-1">36.942</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-[#dfe8f1] shadow-sm">
          <p className="text-xs font-bold text-[#5b6f82]">Bot / Demo Dükkanlar</p>
          <p className="text-2xl font-black text-[#f58220] mt-1">{bots.length}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-[#dfe8f1] shadow-sm">
          <p className="text-xs font-bold text-[#5b6f82]">Anlık Canlı Ziyaretçi</p>
          <p className="text-2xl font-black text-blue-600 mt-1">326</p>
        </div>
      </div>

      {/* 1. ADMİN ÖZEL VİP / İNDİRİM KODU OLUŞTURMA */}
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
                    <p className="text-[11px] text-[#5b6f82]">VKN: <strong className="font-mono text-[#12355b]">{shop.vkn}</strong> — <span className="text-blue-600 font-bold">{shop.paymentStatus}</span></p>
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
            <Coins className="w-5 h-5 text-[#f58220]" /> Prim Çekim Talepleri & Kaynak İnceleme (TL)
          </h2>
          <button
            onClick={() => triggerToast('Ödeme listesi Excel olarak indirildi.')}
            className="px-3 py-1.5 bg-[#12805c] hover:bg-[#0f6b4d] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer"
          >
            <FileSpreadsheet className="w-4 h-4" /> Excel / CSV Aktar (TL)
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#f4f7fb] text-[#12355b] font-extrabold border-b border-slate-200">
                <th className="p-3 rounded-l-xl">Kullanıcı</th>
                <th className="p-3">IBAN Numarası</th>
                <th className="p-3">Talep Tutarı</th>
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

      {/* 4. BOT / DEMO DÜKKAN YÖNETİMİ */}
      <div className="bg-white p-5 rounded-2xl border border-[#dfe8f1] shadow-sm space-y-4">
        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
          <h2 className="font-extrabold text-base text-[#12355b] flex items-center gap-2">
            <Store className="w-5 h-5 text-blue-600" /> Bot / Demo Dükkan Yönetimi
          </h2>
          <button
            onClick={() => { setBots([]); triggerToast('Tüm botlar temizlendi.'); }}
            className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold rounded-xl flex items-center gap-1 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" /> Tüm Botları Temizle
          </button>
        </div>

        <form onSubmit={handleCreateBot} className="grid sm:grid-cols-3 gap-2 text-xs">
          <input
            type="text"
            required
            placeholder="Dükkan Adı (Örn: Lider Civata)"
            value={botForm.name}
            onChange={(e) => setBotForm({ ...botForm, name: e.target.value })}
            className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
          />
          <input
            type="text"
            required
            placeholder="Adres (Örn: Bostancı Sanayi)"
            value={botForm.address}
            onChange={(e) => setBotForm({ ...botForm, address: e.target.value })}
            className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
          />
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Stok Adedi"
              value={botForm.count}
              onChange={(e) => setBotForm({ ...botForm, count: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
            />
            <button type="submit" className="px-4 bg-[#12355b] text-white font-bold rounded-xl hover:bg-[#0d2744] cursor-pointer">
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </form>

        <div className="grid sm:grid-cols-2 gap-3 pt-2">
          {bots.map((b) => (
            <div key={b.id} className="p-3 bg-[#f4f7fb] rounded-xl border border-slate-200 flex justify-between items-center text-xs">
              <div>
                <p className="font-bold text-[#18314c]">{b.name}</p>
                <p className="text-[11px] text-[#5b6f82]">{b.address}</p>
              </div>
              <span className="px-2 py-1 bg-emerald-100 text-[#12805c] font-bold rounded-lg text-[10px]">
                {b.count} Stok
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 5. PRİM & FİYATLANDIRMA YÖNETİMİ */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-[#dfe8f1] shadow-sm space-y-4">
          <h2 className="font-extrabold text-base text-[#12355b] flex items-center gap-2">
            <Coins className="w-5 h-5 text-[#f58220]" /> Prim & Fiyatlandırma Yönetimi (TL)
          </h2>
          <div className="space-y-3 text-xs">
            <div className="p-3 bg-[#f4f7fb] rounded-xl border border-slate-200 space-y-1">
              <label className="font-bold text-[#18314c]">Standart Esnaf Başı Prim (TL)</label>
              <div className="flex gap-2">
                <input type="number" defaultValue={750} className="w-full p-2 bg-white border border-slate-200 rounded-lg font-bold" />
                <button onClick={() => triggerToast('Güncellendi.')} className="px-3 bg-[#12805c] text-white font-bold rounded-lg cursor-pointer">Kaydet</button>
              </div>
            </div>
            <div className="p-3 bg-[#f4f7fb] rounded-xl border border-slate-200 space-y-1">
              <label className="font-bold text-[#18314c]">Esnaf Aylık Abonelik Ücreti (TL)</label>
              <div className="flex gap-2">
                <input type="number" defaultValue={1500} className="w-full p-2 bg-white border border-slate-200 rounded-lg font-bold" />
                <button onClick={() => triggerToast('Güncellendi.')} className="px-3 bg-[#12805c] text-white font-bold rounded-lg cursor-pointer">Kaydet</button>
              </div>
            </div>
          </div>
        </div>

        {/* 6. GERİ BİLDİRİM & DUYURU */}
        <div className="bg-white p-5 rounded-2xl border border-[#dfe8f1] shadow-sm space-y-4">
          <h2 className="font-extrabold text-base text-[#12355b] flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-blue-600" /> Geri Bildirim & Duyuru Paneli
          </h2>
          <div className="space-y-3 text-xs">
            {feedbacks.map((f) => (
              <div key={f.id} className="p-3 bg-[#f4f7fb] rounded-xl border border-slate-200 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-[#18314c]">{f.user}</span>
                  <span className="text-[10px] text-slate-400">{f.time}</span>
                </div>
                <p className="text-[#12355b] italic">"{f.msg}"</p>
                <div className="flex gap-1.5">
                  <input
                    type="text"
                    placeholder="Kullanıcıya yanıt yaz..."
                    value={feedbackReply}
                    onChange={(e) => setFeedbackReply(e.target.value)}
                    className="flex-1 p-1.5 bg-white border border-slate-200 rounded-lg outline-none"
                  />
                  <button onClick={() => { triggerToast('Yanıt iletildi.'); setFeedbackReply(''); }} className="px-3 bg-[#12355b] text-white font-bold rounded-lg cursor-pointer">Yanıtla</button>
                </div>
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