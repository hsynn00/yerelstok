'use client';

import { useState } from 'react';
import { ShieldCheck, UserCheck, Building2, CheckCircle2, AlertCircle } from 'lucide-react';

export default function IdentityVerification({ onVerified }) {
  const [type, setType] = useState('primci'); // 'primci' veya 'esnaf'
  
  // Primci Formu
  const [tcNo, setTcNo] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [birthYear, setBirthYear] = useState('');

  // Esnaf Formu
  const [vkn, setVkn] = useState('');
  const [taxOffice, setTaxOffice] = useState('');

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleVerifyTC = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch('/api/validate-id', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tcNo, name, surname, birthYear }),
      });

      const data = await res.json();
      if (data.success) {
        setStatus({ success: true, message: data.message });
        if (onVerified) onVerified({ type: 'primci', tcNo });
      } else {
        setStatus({ success: false, message: data.message });
      }
    } catch (err) {
      setStatus({ success: false, message: 'Doğrulama işlemi başarısız oldu.' });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyVKN = (e) => {
    e.preventDefault();
    setLoading(true);

    // 10 Haneli VKN Kontrolü
    if (vkn.length === 10 && /^\d+$/.test(vkn)) {
      setStatus({ success: true, message: 'Vergi Kimlik Numarası (VKN) doğrulandı.' });
      if (onVerified) onVerified({ type: 'esnaf', vkn });
    } else {
      setStatus({ success: false, message: 'Geçersiz VKN! Vergi Numarası 10 haneli rakamlardan oluşmalıdır.' });
    }
    setLoading(false);
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm max-w-lg mx-auto space-y-5">
      <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
        <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-700">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div>
          <h2 className="font-bold text-slate-800 text-base">Hesap Doğrulama</h2>
          <p className="text-xs text-slate-400">Güvenlik için T.C. veya VKN doğrulaması gereklidir.</p>
        </div>
      </div>

      {/* SEKME SEÇİMİ */}
      <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-semibold">
        <button
          type="button"
          onClick={() => { setType('primci'); setStatus(null); }}
          className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            type === 'primci' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-500'
          }`}
        >
          <UserCheck className="w-4 h-4" /> Saha / Primci (T.C.)
        </button>
        <button
          type="button"
          onClick={() => { setType('esnaf'); setStatus(null); }}
          className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            type === 'esnaf' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-500'
          }`}
        >
          <Building2 className="w-4 h-4" /> Esnaf (VKN)
        </button>
      </div>

      {/* FORM: PRİMCİ (T.C.) */}
      {type === 'primci' ? (
        <form onSubmit={handleVerifyTC} className="space-y-3 text-xs">
          <div>
            <label className="block text-slate-600 font-semibold mb-1">T.C. Kimlik No</label>
            <input
              type="text"
              maxLength={11}
              required
              value={tcNo}
              onChange={(e) => setTcNo(e.target.value)}
              placeholder="11 haneli T.C. no"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-slate-600 font-semibold mb-1">Ad</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Adınız"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>
            <div>
              <label className="block text-slate-600 font-semibold mb-1">Soyad</label>
              <input
                type="text"
                required
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                placeholder="Soyadınız"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>
          </div>
          <div>
            <label className="block text-slate-600 font-semibold mb-1">Doğum Yılı</label>
            <input
              type="number"
              required
              value={birthYear}
              onChange={(e) => setBirthYear(e.target.value)}
              placeholder="Örn: 1995"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl transition-colors cursor-pointer disabled:opacity-50 mt-2"
          >
            {loading ? 'NVİ Servisinden Doğrulanıyor...' : 'T.C. Kimlik Doğrula'}
          </button>
        </form>
      ) : (
        /* FORM: ESNAF (VKN) */
        <form onSubmit={handleVerifyVKN} className="space-y-3 text-xs">
          <div>
            <label className="block text-slate-600 font-semibold mb-1">Vergi Kimlik No (VKN)</label>
            <input
              type="text"
              maxLength={10}
              required
              value={vkn}
              onChange={(e) => setVkn(e.target.value)}
              placeholder="10 haneli VKN"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </div>
          <div>
            <label className="block text-slate-600 font-semibold mb-1">Vergi Dairesi (Opsiyonel)</label>
            <input
              type="text"
              value={taxOffice}
              onChange={(e) => setTaxOffice(e.target.value)}
              placeholder="Örn: Kadıköy V.D."
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl transition-colors cursor-pointer disabled:opacity-50 mt-2"
          >
            Vergi Numarası Doğrula
          </button>
        </form>
      )}

      {/* MESAJ BİLDİRİMİ */}
      {status && (
        <div
          className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
            status.success ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'
          }`}
        >
          {status.success ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertCircle className="w-4 h-4 text-rose-600" />}
          <span>{status.message}</span>
        </div>
      )}
    </div>
  );
}