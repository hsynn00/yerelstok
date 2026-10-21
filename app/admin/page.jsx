'use client';

import { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  Building2,
  MessageSquare,
  LayoutGrid,
  Megaphone,
  Ban,
  LogOut,
  Coins,
  Download,
  CheckCircle2,
  XCircle,
  CreditCard,
  TrendingUp
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState(false);

  // YÖNETİCİ DİNAMİK FİYAT AYARLARI
  const [pricing, setPricing] = useState({
    baseReward: 50,      // Saha Görev Primi (TL)
    urgentReward: 75,    // Acil Saha Görev Primi (TL)
    merchantPackage: 250 // Esnaf Aylık Üyelik Fiyatı (TL)
  });

  // PRİM ÇEKİM TALEPLERİ
  const [payoutRequests, setPayoutRequests] = useState([
    { id: 1, user: 'Ahmet Yılmaz', iban: 'TR32 0006 2000 0000 1234 5678 90', amount: 325, date: '20.10.2026', status: 'PENDING' },
    { id: 2, user: 'Selin Kaya', iban: 'TR10 0001 5000 0000 9876 5432 10', amount: 500, date: '19.10.2026', status: 'PENDING' },
    { id: 3, user: 'Mehmet Demir', iban: 'TR88 0006 4000 0000 5555 4444 33', amount: 200, date: '18.10.2026', status: 'APPROVED' },
  ]);

  const [toastMsg, setToastMsg] = useState('');

  const triggerToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  // PRİM ÇEKİM ONAY/REDDİ
  const handlePayoutStatus = (id, status) => {
    setPayoutRequests(payoutRequests.map(p => p.id === id ? { ...p, status } : p));
    triggerToast(status === 'APPROVED' ? 'Ödeme talebi onaylandı.' : 'Ödeme talebi reddedildi.');
  };

  // EXCEL / CSV AKTARIMI
  const exportToCSV = () => {
    const headers = ['Kullanici,IBAN,Tutar(TL),Tarih,Durum\n'];
    const rows = payoutRequests.map(p => 
      `"${p.user}","${p.iban}",${p.amount},"${p.date}","${p.status}"\n`
    );

    const blob = new Blob([headers.concat(rows).join('')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Prim_Cekim_Talepleri_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast('Prim talepleri Excel/CSV olarak indirildi.');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center p-4">
        <div className="bg-white p-6 rounded-2xl border border-[#dfe8f1] shadow-md max-w-sm w-full space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="p-3 bg-[#12355b] text-white rounded-xl">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-extrabold text-base text-[#12355b]">YerelStok Admin</h1>
              <p className="text-xs text-[#5b6f82]">Yönetici Kontrol Merkezi</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-3 text-xs">
            <div>
              <label className="block text-[#18314c] font-bold mb-1">Yönetici Şifresi</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#12355b]"
              />
            </div>

            {loginError && (
              <p className="text-rose-600 font-bold text-[11px]">Hatalı şifre! (Varsayılan: admin123)</p>
            )}

            <button
              type="submit"
              className="w-full py-2.5 bg-[#12355b] hover:bg-[#0d2744] text-white font-bold rounded-xl transition-colors cursor-pointer"
            >
              Giriş Yap
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      {/* ÜST BAR */}
      <div className="bg-[#12355b] text-white p-6 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold text-[#dbeafe] uppercase tracking-wider">Sistem Yönetimi</span>
          <h1 className="text-2xl font-black text-white mt-0.5 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-emerald-400" /> Tam Yetkili Yönetici Paneli
          </h1>
          <p className="text-xs text-[#dbeafe] mt-1">
            Prim tutarlarını, esnaf fiyatlandırmalarını ve para çekme taleplerini yönetin.
          </p>
        </div>
        <button
          onClick={() => setIsAuthenticated(false)}
          className="px-4 py-2 bg-white/15 hover:bg-white/25 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-2 self-start md:self-auto cursor-pointer"
        >
          <LogOut className="w-4 h-4" /> Çıkış Yap
        </button>
      </div>

      {/* 1. PRİM FİYATLARI VE ESNAF TARİFE AYARLARI */}
      <div className="bg-white p-5 rounded-2xl border border-[#dfe8f1] shadow-sm">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-4">
          <TrendingUp className="w-5 h-5 text-[#12805c]" />
          <h2 className="font-extrabold text-base text-[#12355b]">Prim & Fiyatlandırma Yönetimi</h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 bg-[#f4f7fb] rounded-xl border border-slate-200 space-y-2">
            <label className="block font-bold text-[#18314c]">Standart Saha Görev Primi (₺)</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={pricing.baseReward}
                onChange={(e) => setPricing({ ...pricing, baseReward: Number(e.target.value) })}
                className="w-full p-2 bg-white border border-slate-200 rounded-lg font-bold text-[#12355b]"
              />
              <button
                onClick={() => triggerToast('Standart prim güncellendi.')}
                className="px-3 py-2 bg-[#12805c] text-white font-bold rounded-lg hover:bg-[#0f6b4d]"
              >
                Kaydet
              </button>
            </div>
          </div>

          <div className="p-3.5 bg-[#f4f7fb] rounded-xl border border-slate-200 space-y-2">
            <label className="block font-bold text-[#18314c]">Acil / Yüksek Görev Primi (₺)</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={pricing.urgentReward}
                onChange={(e) => setPricing({ ...pricing, urgentReward: Number(e.target.value) })}
                className="w-full p-2 bg-white border border-slate-200 rounded-lg font-bold text-[#12355b]"
              />
              <button
                onClick={() => triggerToast('Acil prim güncellendi.')}
                className="px-3 py-2 bg-[#12805c] text-white font-bold rounded-lg hover:bg-[#0f6b4d]"
              >
                Kaydet
              </button>
            </div>
          </div>

          <div className="p-3.5 bg-[#f4f7fb] rounded-xl border border-slate-200 space-y-2">
            <label className="block font-bold text-[#18314c]">Esnaf Aylık Üyelik Ücreti (₺)</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={pricing.merchantPackage}
                onChange={(e) => setPricing({ ...pricing, merchantPackage: Number(e.target.value) })}
                className="w-full p-2 bg-white border border-slate-200 rounded-lg font-bold text-[#12355b]"
              />
              <button
                onClick={() => triggerToast('Esnaf paket fiyatı güncellendi.')}
                className="px-3 py-2 bg-[#12355b] text-white font-bold rounded-lg hover:bg-[#0d2744]"
              >
                Kaydet
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. PRİM ÇEKİM TALEPLERİ VE EXCEL/CSV AKTARIMI */}
      <div className="bg-white p-5 rounded-2xl border border-[#dfe8f1] shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <h2 className="font-extrabold text-base text-[#12355b] flex items-center gap-2">
              <Coins className="w-5 h-5 text-[#f58220]" /> Prim Çekim Talepleri
            </h2>
            <p className="text-xs text-[#5b6f82]">Kullanıcıların biriken prim çekim isteklerini yönetin.</p>
          </div>

          <button
            onClick={exportToCSV}
            className="px-4 py-2 bg-[#12805c] hover:bg-[#0f6b4d] text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-2 cursor-pointer self-start sm:self-auto"
          >
            <Download className="w-4 h-4" /> Talepleri Excel / CSV'ye Aktar
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#f4f7fb] text-[#12355b] font-extrabold border-b border-slate-200">
                <th className="p-3 rounded-l-xl">Kullanıcı</th>
                <th className="p-3">IBAN Numarası</th>
                <th className="p-3">Tutar</th>
                <th className="p-3">Tarih</th>
                <th className="p-3">Durum</th>
                <th className="p-3 rounded-r-xl text-right">Aksiyon</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-semibold text-[#18314c]">
              {payoutRequests.map((req) => (
                <tr key={req.id} className="hover:bg-slate-50">
                  <td className="p-3">{req.user}</td>
                  <td className="p-3 font-mono text-[11px] text-slate-600">{req.iban}</td>
                  <td className="p-3 font-bold text-[#12805c]">{req.amount} ₺</td>
                  <td className="p-3 text-slate-500">{req.date}</td>
                  <td className="p-3">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold ${
                      req.status === 'APPROVED' ? 'bg-emerald-100 text-[#12805c]' :
                      req.status === 'REJECTED' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {req.status === 'APPROVED' ? 'Ödendi' : req.status === 'REJECTED' ? 'Reddedildi' : 'Bekliyor'}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    {req.status === 'PENDING' && (
                      <div className="flex justify-end gap-1.5">
                        <button
                          onClick={() => handlePayoutStatus(req.id, 'APPROVED')}
                          className="px-2.5 py-1 bg-[#12805c] hover:bg-[#0f6b4d] text-white rounded-md font-bold text-[11px]"
                        >
                          Onayla
                        </button>
                        <button
                          onClick={() => handlePayoutStatus(req.id, 'REJECTED')}
                          className="px-2.5 py-1 bg-rose-100 hover:bg-rose-200 text-rose-700 rounded-md font-bold text-[11px]"
                        >
                          Red
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* TOAST BİLDİRİMİ */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 bg-[#12355b] text-white text-xs font-bold px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 animate-in fade-in z-50">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" /> {toastMsg}
        </div>
      )}
    </div>
  );
}