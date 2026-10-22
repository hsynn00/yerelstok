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
  TrendingUp,
  Bot,
  Trash2,
  Eye,
  X,
  Users,
  Store,
  Share2
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  // Para Birimi Yönetimi
  const [currency, setCurrency] = useState('TL'); // 'TL' | 'USD' | 'EUR'
  const currencySymbol = currency === 'TL' ? '₺' : currency === 'USD' ? '$' : '€';
  const currencyRate = currency === 'TL' ? 1 : currency === 'USD' ? 0.029 : 0.027; // Örnek Kur Çevrimi

  const triggerToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  // BOT DÜKKANLAR
  const [botShops, setBotShops] = useState([
    { id: 'bot-1', name: 'Örnek Sanayi Cıvata (Demo)', address: 'İkitelli OSB No: 12', itemsCount: 15 },
    { id: 'bot-2', name: 'Güneş Oto Elektrik (Demo)', address: 'Maslak Sanayi C Blok No: 4', itemsCount: 8 }
  ]);
  const [newBot, setNewBot] = useState({ name: '', address: '', initialStock: '' });

  // DETAY İNCELEME MODALI STATE'İ
  const [selectedUserDetail, setSelectedUserDetail] = useState(null);

  // PRİM ÇEKİM TALEPLERİ (DETAYLI FİRMA VE REFERANS VERİLERİYLE)
  const [payoutRequests, setPayoutRequests] = useState([
    {
      id: 1,
      user: 'Ahmet Yılmaz',
      iban: 'TR32 0006 2000 0000 1234 5678 90',
      amountTL: 325,
      date: '20.10.2026',
      status: 'PENDING',
      refCode: 'AHMET2026',
      registeredShops: [
        { name: 'Yılmaz Oto Yedek Parça', rewardTL: 100, date: '15.10.2026' },
        { name: 'Kardeşler Hırdavat', rewardTL: 75, date: '18.10.2026' },
      ],
      referredUsers: [
        { name: 'Mehmet Demir (Esnaf Kaydı)', date: '12.10.2026', bonusTL: 50 },
        { name: 'Selin Kaya (Saha Saha Primcisi)', date: '14.10.2026', bonusTL: 100 },
      ]
    },
    {
      id: 2,
      user: 'Selin Kaya',
      iban: 'TR10 0001 5000 0000 9876 5432 10',
      amountTL: 500,
      date: '19.10.2026',
      status: 'PENDING',
      refCode: 'SELIN99',
      registeredShops: [
        { name: 'Bostancı Somun Deposu', rewardTL: 200, date: '11.10.2026' },
        { name: 'Usta Elektrik', rewardTL: 150, date: '16.10.2026' },
      ],
      referredUsers: [
        { name: 'Caner Tekin (Esnaf)', date: '10.10.2026', bonusTL: 150 },
      ]
    }
  ]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const handlePayoutStatus = (id, status) => {
    setPayoutRequests(payoutRequests.map(p => p.id === id ? { ...p, status } : p));
    triggerToast(status === 'APPROVED' ? 'Ödeme talebi onaylandı.' : 'Ödeme talebi reddedildi.');
  };

  const exportToCSV = () => {
    const headers = [`Kullanici,IBAN,Tutar(${currency}),Tarih,Durum\n`];
    const rows = payoutRequests.map(p => 
      `"${p.user}","${p.iban}",${(p.amountTL * currencyRate).toFixed(2)},"${p.date}","${p.status}"\n`
    );
    const blob = new Blob([headers.concat(rows).join('')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `VarMi_Prim_Talepleri_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast('Talepler indirildi.');
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
              <h1 className="font-extrabold text-base text-[#12355b]">Var Mı Admin</h1>
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
            {loginError && <p className="text-rose-600 font-bold text-[11px]">Hatalı şifre! (Varsayılan: admin123)</p>}
            <button type="submit" className="w-full py-2.5 bg-[#12355b] hover:bg-[#0d2744] text-white font-bold rounded-xl transition-colors cursor-pointer">
              Giriş Yap
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      {/* ÜST PANEL & PARA BİRİMİ SEÇİMİ */}
      <div className="bg-[#12355b] text-white p-6 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold text-[#dbeafe] uppercase tracking-wider">Var Mı Platform Yönetimi</span>
          <h1 className="text-2xl font-black text-white mt-0.5 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-emerald-400" /> Merkezi Yönetici Kontrol Paneli
          </h1>
        </div>

        {/* PARA BİRİMİ SEÇİM ALANI */}
        <div className="flex items-center gap-2 bg-white/10 p-1.5 rounded-xl border border-white/20 self-start md:self-auto">
          <span className="text-xs font-bold px-2 text-[#dbeafe]">Birim:</span>
          <button
            onClick={() => setCurrency('TL')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${currency === 'TL' ? 'bg-white text-[#12355b]' : 'text-white'}`}
          >
            ₺ TL
          </button>
          <button
            onClick={() => setCurrency('USD')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${currency === 'USD' ? 'bg-white text-[#12355b]' : 'text-white'}`}
          >
            $ USD
          </button>
          <button
            onClick={() => setCurrency('EUR')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${currency === 'EUR' ? 'bg-white text-[#12355b]' : 'text-white'}`}
          >
            € EUR
          </button>
        </div>
      </div>

      {/* PRİM ÇEKİM TALEPLERİ TABLE */}
      <div className="bg-white p-5 rounded-2xl border border-[#dfe8f1] shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <h2 className="font-extrabold text-base text-[#12355b] flex items-center gap-2">
              <Coins className="w-5 h-5 text-[#f58220]" /> Prim Çekim Talepleri & Kaynak İnceleme
            </h2>
            <p className="text-xs text-[#5b6f82]">Talepleri onaylamadan önce kullanıcının hangi firmalardan prim aldığını ve kimleri kaydettirdiğini inceleyin.</p>
          </div>

          <button
            onClick={exportToCSV}
            className="px-4 py-2 bg-[#12805c] hover:bg-[#0f6b4d] text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4" /> Excel / CSV Aktar ({currency})
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#f4f7fb] text-[#12355b] font-extrabold border-b border-slate-200">
                <th className="p-3 rounded-l-xl">Kullanıcı</th>
                <th className="p-3">IBAN Numarası</th>
                <th className="p-3">Talep Tutarı</th>
                <th className="p-3">Tarih</th>
                <th className="p-3">Durum</th>
                <th className="p-3 text-center">Kazanç Geçmişi</th>
                <th className="p-3 rounded-r-xl text-right">Aksiyon</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-semibold text-[#18314c]">
              {payoutRequests.map((req) => (
                <tr key={req.id} className="hover:bg-slate-50">
                  <td className="p-3 font-bold">{req.user}</td>
                  <td className="p-3 font-mono text-[11px] text-slate-600">{req.iban}</td>
                  <td className="p-3 font-black text-[#12805c]">
                    {(req.amountTL * currencyRate).toFixed(2)} {currencySymbol}
                  </td>
                  <td className="p-3 text-slate-500">{req.date}</td>
                  <td className="p-3">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold ${
                      req.status === 'APPROVED' ? 'bg-emerald-100 text-[#12805c]' :
                      req.status === 'REJECTED' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {req.status === 'APPROVED' ? 'Ödendi' : req.status === 'REJECTED' ? 'Reddedildi' : 'Bekliyor'}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => setSelectedUserDetail(req)}
                      className="px-3 py-1.5 bg-[#eaf1f7] hover:bg-[#d8e5f0] text-[#12355b] rounded-lg font-bold text-[11px] flex items-center gap-1 mx-auto cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" /> Detayları Gör
                    </button>
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

      {/* KULLANICI KAZANÇ & REFERANS DETAY MODALI */}
      {selectedUserDetail && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm p-4 flex items-center justify-center">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 space-y-5">
            <div className="flex justify-between items-start border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] bg-[#eaf1f7] text-[#12355b] font-extrabold px-2 py-0.5 rounded-md">Referans Kodu: {selectedUserDetail.refCode}</span>
                <h2 className="text-lg font-extrabold text-[#12355b] mt-1">{selectedUserDetail.user} · Prim Detay Analizi</h2>
              </div>
              <button
                onClick={() => setSelectedUserDetail(null)}
                className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* FİRMALAR HAKKINDA BİLGİ */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-[#12355b] flex items-center gap-1.5">
                <Store className="w-4 h-4 text-[#12805c]" /> Prim Kazanılan Dükkanlar / Saha Ziyaretleri
              </h3>
              <div className="space-y-1.5">
                {selectedUserDetail.registeredShops.map((s, idx) => (
                  <div key={idx} className="p-2.5 bg-[#f4f7fb] rounded-xl border border-slate-200 flex justify-between items-center text-xs font-semibold">
                    <div>
                      <p className="text-[#18314c] font-bold">{s.name}</p>
                      <p className="text-[10px] text-slate-400">Tarih: {s.date}</p>
                    </div>
                    <span className="text-[#12805c] font-extrabold">
                      +{(s.rewardTL * currencyRate).toFixed(2)} {currencySymbol}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* DAVET ETTİĞİ REFERANSLI KULLANICILAR */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <h3 className="text-xs font-bold text-[#12355b] flex items-center gap-1.5">
                <Users className="w-4 h-4 text-blue-600" /> Referans Koduyla Kaydolan Kullanıcılar & Esnaflar
              </h3>
              <div className="space-y-1.5">
                {selectedUserDetail.referredUsers.map((u, idx) => (
                  <div key={idx} className="p-2.5 bg-[#f4f7fb] rounded-xl border border-slate-200 flex justify-between items-center text-xs font-semibold">
                    <div>
                      <p className="text-[#18314c] font-bold">{u.name}</p>
                      <p className="text-[10px] text-slate-400">Kayıt Tarihi: {u.date}</p>
                    </div>
                    <span className="text-blue-600 font-extrabold">
                      +{(u.bonusTL * currencyRate).toFixed(2)} {currencySymbol} Bonus
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setSelectedUserDetail(null)}
              className="w-full py-2.5 bg-[#12355b] hover:bg-[#0d2744] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              Kapat
            </button>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 bg-[#12355b] text-white text-xs font-bold px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 z-50">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" /> {toastMsg}
        </div>
      )}
    </div>
  );
}