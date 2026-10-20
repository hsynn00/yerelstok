'use client';

import { useState } from 'react';
import { Store, MapPin, Phone, Building2, Save, X, CheckCircle2 } from 'lucide-react';

export default function MerchantEditModal({ isOpen, onClose, shopData, onSave }) {
  const [formData, setFormData] = useState(shopData || {
    shopName: 'Yılmaz Oto Yedek Parça',
    phone: '0532 555 11 22',
    address: 'Kadıköy Sanayi Sitesi A Blok No: 14, Kadıköy / İstanbul',
    taxOffice: 'Kadıköy V.D.',
  });

  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaved(true);
    if (onSave) onSave(formData);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[80] bg-[#061a2ee6] p-4 flex items-center justify-center">
      <div className="bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95">
        <header className="bg-[#12355b] text-white p-5 flex justify-between items-center">
          <div>
            <h2 className="font-bold text-lg text-white">Dükkan & İletişim Bilgilerini Düzenle</h2>
            <p className="text-xs text-[#dbeafe] mt-0.5">Müşterilerin size ulaşacağı adres ve telefon bilgilerini güncelleyin.</p>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-xl bg-white/15 grid place-items-center hover:bg-white/25 transition-colors">
            <X className="w-5 h-5 text-white" />
          </button>
        </header>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div>
            <label className="block text-[#18314c] font-bold mb-1">Dükkan Ünvanı / Adı</label>
            <div className="relative">
              <Store className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                required
                value={formData.shopName}
                onChange={(e) => setFormData({ ...formData, shopName: e.target.value })}
                className="w-full pl-9 p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#12355b] text-[#18314c]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#18314c] font-bold mb-1">İletişim Telefon Numarası</label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="05XX XXX XX XX"
                className="w-full pl-9 p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#12355b] text-[#18314c]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#18314c] font-bold mb-1">Açık Adres</label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <textarea
                required
                rows={3}
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Müşterilerin dükkanınızı bulacağı açık adres"
                className="w-full pl-9 p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#12355b] text-[#18314c]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#18314c] font-bold mb-1">Vergi Dairesi (Opsiyonel)</label>
            <div className="relative">
              <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={formData.taxOffice}
                onChange={(e) => setFormData({ ...formData, taxOffice: e.target.value })}
                className="w-full pl-9 p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#12355b] text-[#18314c]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#12805c] hover:bg-[#0f6b4d] text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            <Save className="w-4 h-4" /> Bilgileri Güncelle
          </button>

          {saved && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-[#12805c] rounded-xl text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Dükkan adres ve iletişim bilgileri güncellendi.
            </div>
          )}
        </form>
      </div>
    </div>
  );
}