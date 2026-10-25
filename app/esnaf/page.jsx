'use client';

import { useState } from 'react';
import {
  Store,
  MapPin,
  Phone,
  Edit3,
  PackagePlus,
  ScanLine,
  FileSpreadsheet,
  Trash2,
  Package,
  Plus,
  Minus,
  AlertTriangle,
  Bell,
  CheckCircle2,
  Clock
} from 'lucide-react';
import MerchantEditModal from '@/components/MerchantEditModal';

export default function MerchantPage() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const triggerToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  // Dükkan İletişim Bilgileri
  const [shopData, setShopData] = useState({
    shopName: 'Yılmaz Oto Yedek Parça',
    phone: '0532 555 11 22',
    address: 'Kadıköy Sanayi Sitesi A Blok No: 14, Kadıköy / İstanbul',
    taxOffice: 'Kadıköy V.D.',
  });

  // Manuel Ürün Formu
  const [manualForm, setManualForm] = useState({ name: '', code: '', count: '' });

  // Dinamik Stok Listesi (Son güncelleme zamanı ile)
  const [products, setProducts] = useState([
    { id: 1, name: 'Fren Balatası', code: 'FB-2024-18', count: 24, unit: 'adet', lastUpdated: '10 dk önce' },
    { id: 2, name: 'Matkap Ucu Seti', code: 'MU-8PCS', count: 8, unit: 'adet', lastUpdated: '1 saat önce' },
    { id: 3, name: '2.5 mm Kablo', code: 'KBL-25-B', count: 120, unit: 'm', lastUpdated: '3 gün önce (Doğrulanmadı)' },
  ]);

  // Silme Onay Modal State'i
  const [deleteModalId, setDeleteModalId] = useState(null);

  // Canlı Müşteri Talepleri ve Gelişmiş Yanıtlar
  const [requests, setRequests] = useState([
    { id: 1, name: 'Mert A.', query: 'Honda Civic 2012 ön fren balatası var mı?', status: 'BEKLIYOR', responseText: '' },
    { id: 2, name: 'Selin K.', query: '10 mm matkap ucu seti bugün teslim alınabilir mi?', status: 'BEKLIYOR', responseText: '' },
  ]);

  // Stok Ekleme
  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!manualForm.name || !manualForm.count) return;
    setProducts([
      ...products,
      {
        id: Date.now(),
        name: manualForm.name,
        code: manualForm.code || '—',
        count: Number(manualForm.count),
        unit: 'adet',
        lastUpdated: 'Az önce',
      },
    ]);
    setManualForm({ name: '', code: '', count: '' });
    triggerToast('Ürün başarıyla stoğa eklendi.');
  };

  // Stok Miktarı Artır / Azalt (+ / -)
  const handleUpdateCount = (id, delta) => {
    setProducts(
      products.map((p) => {
        if (p.id === id) {
          const newCount = Math.max(0, p.count + delta);
          return { ...p, count: newCount, lastUpdated: 'Az önce' };
        }
        return p;
      })
    );
  };

  // Gerçek Silme Onayı
  const confirmDeleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
    setDeleteModalId(null);
    triggerToast('Ürün listeden silindi.');
  };

  // Gelişmiş Talep Yanıtlama
  const handleAnswerRequest = (id, answerType) => {
    setRequests(
      requests.map((r) => {
        if (r.id === id) {
          return { ...r, status: answerType };
        }
        return r;
      })
    );
    triggerToast('Müşteriye yanıt iletildi.');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* 1. ÜST DÜKKAN BİLGİ KARTI */}
      <div className="bg-white p-6 rounded-2xl border border-[#dfe8f1] shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="flex items-start gap-3">
            <div className="p-3 bg-[#12355b] text-white rounded-2xl">
              <Store className="w-7 h-7" />
            </div>
            <div>
              <h1 className="font-extrabold text-xl text-[#12355b]">{shopData.shopName}</h1>
              <p className="text-xs text-[#5b6f82] flex items-center gap-1 mt-1">
                <MapPin className="w-3.5 h-3.5 text-[#12805c]" /> {shopData.address}
              </p>
              <p className="text-xs text-[#5b6f82] flex items-center gap-1 mt-0.5">
                <Phone className="w-3.5 h-3.5 text-[#12805c]" /> İletişim: {shopData.phone}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsEditModalOpen(true)}
            className="px-4 py-2.5 bg-[#eaf1f7] hover:bg-[#d8e5f0] text-[#12355b] rounded-xl text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer self-start md:self-auto"
          >
            <Edit3 className="w-4 h-4" /> Adres & Numara Düzenle
          </button>
        </div>

        <div className="mt-4 p-3 bg-[#f4f7fb] rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="font-semibold text-[#5b6f82]">
            Müşterilerin haritada göreceği iletişim numarası: <strong className="text-[#12355b]">{shopData.phone}</strong>
          </span>
          <span className="text-[11px] bg-emerald-100 text-[#12805c] px-2.5 py-1 rounded-md font-bold flex items-center gap-1">
            <Bell className="w-3 h-3 animate-pulse" /> Sesli & WhatsApp Bildirimler Aktif
          </span>
        </div>
      </div>

      {/* 2. HIZLI STOK YÖNETİM ARAÇLARI */}
      <div className="grid md:grid-cols-2 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-[#dfe8f1] shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-10 h-10 bg-[#effaf5] text-[#12805c] rounded-xl grid place-items-center">
              <PackagePlus className="w-5 h-5" />
            </span>
            <div>
              <h2 className="font-bold text-base text-[#12355b]">Tekli Manuel Ürün Ekle</h2>
              <p className="text-xs text-[#5b6f82]">İsim, stok kodu ve adet bilgisiyle hızlıca ekleyin.</p>
            </div>
          </div>

          <form onSubmit={handleAddProduct} className="space-y-3 text-xs">
            <input
              type="text"
              required
              placeholder="Ürün adı (Örn: Fren Balatası)"
              value={manualForm.name}
              onChange={(e) => setManualForm({ ...manualForm, name: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#12355b]"
            />
            <input
              type="text"
              placeholder="Stok / parça kodu (Opsiyonel)"
              value={manualForm.code}
              onChange={(e) => setManualForm({ ...manualForm, code: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#12355b]"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                min="1"
                required
                placeholder="Stok adedi"
                value={manualForm.count}
                onChange={(e) => setManualForm({ ...manualForm, count: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#12355b]"
              />
              <button
                type="submit"
                className="w-full py-2.5 bg-[#12805c] hover:bg-[#0f6b4d] text-white font-bold rounded-xl transition-colors cursor-pointer"
              >
                Stoğa Ekle
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#dfe8f1] shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-10 h-10 bg-[#eaf1f7] text-[#12355b] rounded-xl grid place-items-center">
                <ScanLine className="w-5 h-5" />
              </span>
              <div>
                <h2 className="font-bold text-base text-[#12355b]">AI Kamera İle Ekle</h2>
                <p className="text-xs text-[#5b6f82]">Fotoğraftan ürün adı ve kodunu otomatik tanıyın.</p>
              </div>
            </div>
            <button
              onClick={() => alert('Kamera açılıyor... Görsel taranıyor.')}
              className="w-full mt-2 py-2.5 bg-[#12355b] hover:bg-[#0d2744] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <ScanLine className="w-4 h-4" /> AI Kamera Aç
            </button>
          </div>

          <div className="border-t border-slate-100 pt-4 mt-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-10 h-10 bg-[#fff1e4] text-[#f58220] rounded-xl grid place-items-center">
                <FileSpreadsheet className="w-5 h-5" />
              </span>
              <div>
                <h2 className="font-bold text-sm text-[#12355b]">Excel / CSV Toplu Aktarım</h2>
                <p className="text-xs text-[#5b6f82]">Toplu listenizi tek tıkla yükleyin.</p>
              </div>
            </div>
            <label className="block w-full text-center py-2 bg-slate-50 hover:bg-slate-100 border border-dashed border-slate-300 rounded-xl text-xs font-semibold text-[#5b6f82] cursor-pointer transition-colors">
              CSV veya Excel Dosyası Seçin
              <input type="file" accept=".csv,.xls,.xlsx" className="hidden" onChange={() => alert('Excel listesi okundu!')} />
            </label>
          </div>
        </div>
      </div>

      {/* 3. AKTİF STOK LİSTESİ (+ / - BUTONLARI VE SON GÜNCELLEME İLE) */}
      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-[#dfe8f1] shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-extrabold text-base text-[#12355b] flex items-center gap-2">
              <Package className="w-5 h-5 text-[#12805c]" /> Aktif Stok Listesi & Hızlı Düzenleme
            </h2>
            <span className="text-xs bg-[#eaf1f7] text-[#12355b] font-bold px-3 py-1 rounded-full">
              {products.length} Ürün Kalemi
            </span>
          </div>

          <div className="space-y-3">
            {products.map((p) => (
              <div key={p.id} className="p-3.5 bg-[#f4f7fb] rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="font-bold text-xs text-[#18314c]">{p.name}</h3>
                  <p className="text-[11px] text-[#5b6f82]">Kod: {p.code}</p>
                  <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                    <Clock className="w-3 h-3" /> Güncelleme: {p.lastUpdated}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {/* + / - ADET DÜZENLEME BUTONLARI */}
                  <div className="flex items-center bg-white border border-slate-200 rounded-xl p-1 shadow-sm">
                    <button
                      onClick={() => handleUpdateCount(p.id, -1)}
                      className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 grid place-items-center transition-colors cursor-pointer"
                      title="1 Azalt"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-black text-[#12805c]">
                      {p.count} {p.unit}
                    </span>
                    <button
                      onClick={() => handleUpdateCount(p.id, 1)}
                      className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 grid place-items-center transition-colors cursor-pointer"
                      title="1 Arttır"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => setDeleteModalId(p.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                    title="Ürünü Sil"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-[#dfe8f1] shadow-sm">
    <div className="flex items-center justify-between mb-1">
      <h2 className="font-extrabold text-base text-[#12355b] flex items-center gap-2">
        <Bell className="w-4 h-4 text-[#f58220] animate-bounce" /> Gelen Canlı Stok Soruları & Sohbet
      </h2>
    </div>
    <p className="text-xs text-[#5b6f82] mb-4">Müşterinin sorusuna hızlı butonlarla yanıt verin veya altındaki sohbet alanından özel mesaj yazın.</p>

    <div className="space-y-4">
      {requests.map((r) => (
        <div key={r.id} className="p-4 bg-[#f4f7fb] rounded-2xl border border-slate-200 space-y-3">
          <div>
            <div className="flex justify-between items-center">
              <span className="font-extrabold text-xs text-[#18314c]">{r.name} (Müşteri)</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${r.status !== 'BEKLIYOR' ? 'bg-emerald-100 text-[#12805c]' : 'bg-amber-100 text-amber-800'}`}>
                {r.status === 'BEKLIYOR' ? 'Yeni Soru' : 'Yanıtlandı'}
              </span>
            </div>
            <p className="text-xs text-[#12355b] font-semibold mt-1">"{r.query}"</p>
          </div>

          {/* HIZLI YANIT BUTONLARI */}
          <div className="grid grid-cols-2 gap-1.5">
            <button
              onClick={() => handleAnswerRequest(r.id, 'Stokta Var')}
              className="py-1.5 bg-[#12805c] hover:bg-[#0f6b4d] text-white text-[11px] font-bold rounded-lg transition-colors cursor-pointer"
            >
              ✓ Var (Stokta)
            </button>
            <button
              onClick={() => handleAnswerRequest(r.id, 'Son 2 Adet Kaldı')}
              className="py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold rounded-lg transition-colors cursor-pointer"
            >
              ⚡ Son 2 Adet Kaldı
            </button>
            <button
              onClick={() => handleAnswerRequest(r.id, '2 Saat İçinde Gelir')}
              className="py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-[11px] font-bold rounded-lg transition-colors cursor-pointer"
            >
              ⏱ 2 Saat İçinde Gelir
            </button>
            <button
              onClick={() => handleAnswerRequest(r.id, 'Stok Tükendi')}
              className="py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-[11px] font-bold rounded-lg transition-colors cursor-pointer"
            >
              ✕ Yok / Tükendi
            </button>
          </div>

          {/* ESNAFIN ÖZEL MESAJ YAZACAĞI SOHBET KISMI */}
          <div className="pt-2 border-t border-slate-200/60 space-y-2">
            {r.customReply ? (
              <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-[#12805c] font-semibold">
                <strong>Gönderilen Mesajınız:</strong> "{r.customReply}"
              </div>
            ) : (
              <div className="flex gap-1.5">
                <input
                  type="text"
                  placeholder="Müşteriye özel mesaj/fiyat yazın..."
                  value={r.tempReply || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    setRequests(requests.map(item => item.id === r.id ? { ...item, tempReply: val } : item));
                  }}
                  className="flex-1 p-2 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#12355b] font-medium"
                />
                <button
                  onClick={() => {
                    if (!r.tempReply) return;
                    setRequests(requests.map(item => item.id === r.id ? { ...item, customReply: r.tempReply, status: 'Özel Mesaj Gönderildi' } : item));
                    triggerToast('Özel mesaj müşteriye iletildi.');
                  }}
                  className="px-3 py-2 bg-[#12355b] hover:bg-[#0d2744] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Gönder
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>

      {/* SİLME ONAY MODALI */}
      {deleteModalId && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm p-4 flex items-center justify-center">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 text-center space-y-4 animate-in fade-in zoom-in-95">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 grid place-items-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-[#12355b]">Ürünü Silmek İstediğinize Emin Misiniz?</h3>
              <p className="text-xs text-[#5b6f82] mt-1">Bu işlem geri alınamaz ve canlı stok listesinden kaldırılır.</p>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => setDeleteModalId(null)}
                className="py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                Vazgeç
              </button>
              <button
                onClick={() => confirmDeleteProduct(deleteModalId)}
                className="py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                Evet, Sil
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DÜKKAN DÜZENLEME MODALI */}
      <MerchantEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        shopData={shopData}
        onSave={(newData) => setShopData(newData)}
      />

      {/* TOAST BİLDİRİMİ */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 bg-[#12355b] text-white text-xs font-bold px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 z-50">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" /> {toastMsg}
        </div>
      )}
    </div>
  );
}