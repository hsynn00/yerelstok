'use client';

import { useState } from 'react';
import { Store, MapPin, Phone, Edit3, Plus, Package, Clock } from 'lucide-react';
import MerchantEditModal from '@/components/MerchantEditModal';

export default function MerchantPage() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Esnaf ve Dükkan Bilgileri State'i
  const [shopData, setShopData] = useState({
    shopName: 'Yılmaz Oto Yedek Parça',
    phone: '0532 555 11 22',
    address: 'Kadıköy Sanayi Sitesi A Blok No: 14, Kadıköy / İstanbul',
    taxOffice: 'Kadıköy V.D.',
  });

  const handleSaveShopData = (newData) => {
    setShopData(newData);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* ESNAF ÜST KART VE DÜKKAN BİLGİLERİ */}
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

          {/* DÜKKAN BİLGİLERİNİ DÜZENLE BUTONU */}
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="px-4 py-2.5 bg-[#eaf1f7] hover:bg-[#d8e5f0] text-[#12355b] rounded-xl text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer self-start md:self-auto"
          >
            <Edit3 className="w-4 h-4" /> Adres & Numara Ekle/Düzenle
          </button>
        </div>

        {/* MÜŞTERİ İLETİŞİM ÖNİZLEMESİ */}
        <div className="mt-4 p-3 bg-[#f4f7fb] rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="font-semibold text-[#5b6f82]">
            Müşterilerinizin haritada göreceği iletişim numarası: <strong className="text-[#12355b]">{shopData.phone}</strong>
          </span>
          <span className="text-[11px] bg-emerald-100 text-[#12805c] px-2.5 py-1 rounded-md font-bold">
            Gelen Aramalar & WhatsApp Aktif
          </span>
        </div>
      </div>

      {/* DÜKKAN BİLGİLERİ DÜZENLEME MODALI */}
      <MerchantEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        shopData={shopData}
        onSave={handleSaveShopData}
      />
    </div>
  );
}