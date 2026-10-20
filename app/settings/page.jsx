'use client';

import { useState } from 'react';
import { Settings, User, Mail, Phone, Bell, Save, CheckCircle2 } from 'lucide-react';

export default function SettingsPage() {
  const [formData, setFormData] = useState({
    fullName: 'Ahmet Yılmaz',
    email: 'ahmet@yilmazoto.com',
    phone: '0532 555 11 22',
    smsNotify: true,
    whatsappNotify: true,
  });

  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-[#dfe8f1] shadow-sm">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-2.5 bg-[#eaf1f7] text-[#12355b] rounded-xl">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-extrabold text-lg text-[#12355b]">Dükkan Ayarları</h1>
            <p className="text-xs text-[#5b6f82]">Profil ve bildirim tercihlerinizi güvenle güncelleyin.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4 text-xs">
          <div>
            <label className="block text-[#18314c] font-bold mb-1">Ad Soyad</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full pl-9 p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#12355b]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#18314c] font-bold mb-1">E-posta Adresi</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-9 p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#12355b]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#18314c] font-bold mb-1">Telefon Numarası</label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full pl-9 p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#12355b]"
              />
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4 space-y-3">
            <h3 className="font-bold text-[#12355b] flex items-center gap-1.5">
              <Bell className="w-4 h-4" /> Bildirim Tercihleri
            </h3>

            <div className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-200">
              <span className="font-semibold text-[#18314c]">SMS Bildirimleri</span>
              <input
                type="checkbox"
                checked={formData.smsNotify}
                onChange={(e) => setFormData({ ...formData, smsNotify: e.target.checked })}
                className="w-4 h-4 accent-[#12805c] cursor-pointer"
              />
            </div>

            <div className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-200">
              <span className="font-semibold text-[#18314c]">WhatsApp Bildirimleri</span>
              <input
                type="checkbox"
                checked={formData.whatsappNotify}
                onChange={(e) => setFormData({ ...formData, whatsappNotify: e.target.checked })}
                className="w-4 h-4 accent-[#12805c] cursor-pointer"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#12805c] hover:bg-[#0f6b4d] text-white font-bold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2 mt-2"
          >
            <Save className="w-4 h-4" /> Değişiklikleri Kaydet
          </button>
        </form>

        {saved && (
          <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 text-[#12805c] rounded-xl text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> Dükkan ayarları başarıyla kaydedildi.
          </div>
        )}
      </div>
    </div>
  );
}