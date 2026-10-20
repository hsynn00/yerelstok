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
  Pencil,
  Clock,
  Send,
  Upload,
  CheckCircle2,
  Trash2,
  Package
} from 'lucide-react';
import MerchantEditModal from '@/components/MerchantEditModal';

export default function MerchantPage() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Dükkan İletişim & Adres Bilgileri
  const [shopData, setShopData] = useState({
    shopName: 'Yılmaz Oto Yedek Parça',
    phone: '0532 555 11 22',
    address: 'Kadıköy Sanayi Sitesi A Blok No: 14, Kadıköy / İstanbul',
    taxOffice: 'Kadıköy V.D.',
  });

  // Manuel Ürün Formu State
  const [manualForm, setManualForm] = useState({ name: '', code: '', count: '' });

  // Dinamik Stok Listesi
  const [products, setProducts] = useState([
    { id: 1, name: 'Fren Balatası', code: 'FB-2024-18', count: 24, unit: 'adet' },
    { id: 2, name: 'Matkap Ucu Seti', code: 'MU-8PCS', count: 8, unit: 'adet' },
    { id: 3, name: '2.5 mm Kablo', code: 'KBL-25-B', count: 120, unit: 'm' },
  ]);

  // Canlı Gelen Müşteri Talepleri
  const [requests, setRequests] = useState([
    { id: 1, name: 'Mert A.', query: 'Honda Civic 2012 için ön fren balatası var mı?', answered: false },
    { id: 2, name: 'Selin K.', query: '10 mm matkap ucu seti bugün teslim alınabilir mi?', answered: false },
  ]);

  // Manuel Stok Ekleme
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
      },
    ]);
    setManualForm({ name: '', code: '', count: '' });
  };

  // Stok Silme
  const handleDeleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  // Talep Yanıtlama
  const handleAnswerRequest = (id) => {
    setRequests(requests.map((r) => (r.id === id ? { ...r, answered: true } : r)));
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
            <Edit3 className="w-4 h-4" /> Adres & Numara Ekle/Düzenle
          </button>
        </div>

        <div className="mt-4 p-3 bg-[#f4f7fb] rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="font-semibold text-[#5b6f82]">
            Müşterilerinizin haritada göreceği iletişim numarası: <strong className="text-[#12355b]">{shopData.phone}</strong>
          </span>
          <span className="text-[11px] bg-emerald-100 text-[#12805c] px-2.5 py-1 rounded-md font-bold">
            Gelen Aramalar & WhatsApp Aktif
          </span>
        </div>
      </div>

      {/* 2. HIZLI STOK YÖNETİM ARAÇLARI (MANUEL, AI, CSV) */}
      <div className="grid md:grid-cols-2 gap-5">
        {/* MANUEL ÜRÜN EKLE */}
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

        {/* AI VE CSV TOPLU YÜKLEME */}
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
              <input type="file" accept=".csv,.xls,.xlsx" className="hidden" onChange={() => alert('Excel listesi okundu! Ürünler içe aktarılıyor.')} />
            </label>
          </div>
        </div>
      </div>

      {/* 3. ANA İÇERİK: STOK LİSTESİ VEYA CANLI TALEPLER */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* MEVCUT STOK LİSTESİ */}
        <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-[#dfe8f1] shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-extrabold text-base text-[#12355b] flex items-center gap-2">
              <Package className="w-5 h-5 text-[#12805c]" /> Aktif Stok Listesi
            </h2>
            <span className="text-xs bg-[#eaf1f7] text-[#12355b] font-bold px-3 py-1 rounded-full">
              {products.length} Ürün Kalemi
            </span>
          </div>

          <div className="space-y-2.5">
            {products.map((p) => (
              <div key={p.id} className="p-3 bg-[#f4f7fb] rounded-xl border border-slate-200 flex items-center justify-between gap-2">
                <div>
                  <h3 className="font-bold text-xs text-[#18314c]">{p.name}</h3>
                  <p className="text-[11px] text-[#5b6f82]">Kod: {p.code}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-black text-[#12805c] bg-[#effaf5] px-2.5 py-1 rounded-lg border border-[#b8e6d2]">
                    {p.count} {p.unit}
                  </span>
                  <button
                    onClick={()