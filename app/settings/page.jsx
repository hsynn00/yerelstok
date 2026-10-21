'use client';

import { useState } from 'react';
import { Settings, User, Mail, Lock, Save, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function SettingsPage() {
  const [profileData, setProfileData] = useState({
    fullName: 'Ahmet Yılmaz',
    email: 'ahmet@yilmazoto.com',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [toastMsg, setToastMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    setToastMsg('Profil ve e-posta bilgileri başarıyla güncellendi.');
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!profileData.currentPassword) {
      setErrorMsg('Lütfen mevcut şifrenizi girin.');
      return;
    }
    if (profileData.newPassword.length < 6) {
      setErrorMsg('Yeni şifre en az 6 karakter olmalıdır.');
      return;
    }
    if (profileData.newPassword !== profileData.confirmPassword) {
      setErrorMsg('Yeni şifreler birbiriyle eşleşmiyor!');
      return;
    }

    setToastMsg('Şifreniz başarıyla değiştirildi.');
    setProfileData({ ...profileData, currentPassword: '', newPassword: '', confirmPassword: '' });
    setTimeout(() => setToastMsg(''), 3000);
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 pb-12">
      {/* PROFİL & E-POSTA BİLGİLERİ */}
      <div className="bg-white p-6 rounded-2xl border border-[#dfe8f1] shadow-sm">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-2.5 bg-[#eaf1f7] text-[#12355b] rounded-xl">
            <User className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-extrabold text-lg text-[#12355b]">Hesap & Profil Ayarları</h1>
            <p className="text-xs text-[#5b6f82]">Ad, soyad ve e-posta adresinizi güncelleyin.</p>
          </div>
        </div>

        <form onSubmit={handleProfileUpdate} className="mt-5 space-y-4 text-xs">
          <div>
            <label className="block text-[#18314c] font-bold mb-1">Ad Soyad</label>
            <input
              type="text"
              required
              value={profileData.fullName}
              onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#12355b]"
            />
          </div>

          <div>
            <label className="block text-[#18314c] font-bold mb-1">E-posta Adresi</label>
            <input
              type="email"
              required
              value={profileData.email}
              onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#12355b]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-[#12805c] hover:bg-[#0f6b4d] text-white font-bold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" /> Bilgileri Güncelle
          </button>
        </form>
      </div>

      {/* ŞİFRE DEĞİŞTİRME KISMI */}
      <div className="bg-white p-6 rounded-2xl border border-[#dfe8f1] shadow-sm">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-2.5 bg-[#fff1e4] text-[#f58220] rounded-xl">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-extrabold text-lg text-[#12355b]">Şifre Değiştir</h2>
            <p className="text-xs text-[#5b6f82]">Güvenliğiniz için şifrenizi düzenli olarak yenileyin.</p>
          </div>
        </div>

        <form onSubmit={handlePasswordChange} className="mt-5 space-y-3 text-xs">
          <div>
            <label className="block text-[#18314c] font-bold mb-1">Mevcut Şifre</label>
            <input
              type="password"
              value={profileData.currentPassword}
              onChange={(e) => setProfileData({ ...profileData, currentPassword: e.target.value })}
              placeholder="••••••••"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#12355b]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[#18314c] font-bold mb-1">Yeni Şifre</label>
              <input
                type="password"
                value={profileData.newPassword}
                onChange={(e) => setProfileData({ ...profileData, newPassword: e.target.value })}
                placeholder="••••••••"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#12355b]"
              />
            </div>
            <div>
              <label className="block text-[#18314c] font-bold mb-1">Yeni Şifre (Tekrar)</label>
              <input
                type="password"
                value={profileData.confirmPassword}
                onChange={(e) => setProfileData({ ...profileData, confirmPassword: e.target.value })}
                placeholder="••••••••"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#12355b]"
              />
            </div>
          </div>

          {errorMsg && (
            <p className="text-rose-600 font-bold text-[11px]">{errorMsg}</p>
          )}

          <button
            type="submit"
            className="w-full py-2.5 bg-[#12355b] hover:bg-[#0d2744] text-white font-bold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" /> Şifreyi Güncelle
          </button>
        </form>
      </div>

      {/* TOAST BİLDİRİMİ */}
      {toastMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-[#12805c] rounded-xl text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> {toastMsg}
        </div>
      )}
    </div>
  );
}