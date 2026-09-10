'use client';

import React, { useState, useEffect } from 'react';
import { PlayCircle, Award, KeyRound, Wallet, ArrowUpRight, CheckCircle, Clock } from 'lucide-react';

export default function RewardDashboard() {
  const [adCount, setAdCount] = useState(3); // Örnek olarak 3 izlenmiş başlasın
  const [isWatching, setIsWatching] = useState(false);
  const [promoCode, setPromoCode] = useState(null);
  const [timeLeft, setTimeLeft] = useState(86400); // 24 Saat (Saniye)
  const [iban, setIban] = useState('');
  const [balance] = useState(150); // Kullanıcının biriken prim bakiyesi (TL)
  const [withdrawStatus, setWithdrawStatus] = useState(null);

  // Reklam İzleme Simülasyonu (3 saniye bekletir)
  const handleWatchAd = () => {
    if (adCount >= 10) return;
    setIsWatching(true);
    setTimeout(() => {
      setAdCount((prev) => {
        const next = prev + 1;
        if (next === 10) {
          generatePromoCode();
        }
        return next;
      });
      setIsWatching(false);
    }, 2500);
  };

  // 24 Saatlik Geçici Kod Üretici
  const generatePromoCode = () => {
    const randomCode = 'YSTK-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    setPromoCode(randomCode);
  };

  // IBAN Çekim Talebi
  const handleWithdraw = (e) => {
    e.preventDefault();
    if (!iban || iban.length < 15) return;
    setWithdrawStatus('Talep Alındı! Prim bakiyeniz 24 saat içinde hesabınıza aktarılacaktır.');
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* KART 1: REKLAM İZLEME & KOD ÜRETİCİ */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-100 text-emerald-800 rounded-xl flex items-center justify-center font-bold">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-bold text-slate-800 text-base">Reklam İzle & İndirim Kodu Kazan</h2>
                <p className="text-xs text-slate-500">10 reklam izle, 24 saat geçerli dükkan indirim kodunu kap!</p>
              </div>
            </div>
            <span className="text-xs font-bold bg-slate-100 text-slate-700 px-3 py-1.5 rounded-full">
              {adCount} / 10 İzlendi
            </span>
          </div>

          {/* İLERLEME ÇUBUĞU */}
          <div className="space-y-2">
            <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
              <div
                className="bg-emerald-700 h-3 rounded-full transition-all duration-500"
                style={{ width: `${(adCount / 10) * 100}%` }}
              ></div>
            </div>
            <p className="text-[11px] text-slate-400 text-right">
              {adCount < 10 ? `${10 - adCount} reklam daha izlemeniz gerekiyor.` : 'Tebrikler! Kodunuz Hazır.'}
            </p>
          </div>

          {/* REKLAM İZLEME BUTONU VEYA ÜRETİLEN KOD */}
          {adCount < 10 ? (
            <button
              onClick={handleWatchAd}
              disabled={isWatching}
              className={`w-full py-4 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 ${
                isWatching
                  ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                  : 'bg-emerald-700 hover:bg-emerald-800 text-white'
              }`}
            >
              <PlayCircle className="w-5 h-5" />
              {isWatching ? 'Reklam Oynatılıyor...' : 'Reklam İzle (+1)'}
            </button>
          ) : (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-center space-y-2">
              <div className="flex items-center justify-center gap-2 text-emerald-800 font-bold text-sm">
                <KeyRound className="w-4 h-4" /> 24 Saatlik Geçici Prim Kodunuz:
              </div>
              <div className="text-2xl font-mono font-extrabold text-emerald-900 tracking-wider bg-white py-2 px-4 rounded-xl border border-emerald-200 inline-block shadow-sm">
                {promoCode || 'YSTK-98A2F1'}
              </div>
              <div className="flex items-center justify-center gap-1 text-[11px] text-emerald-700 font-medium pt-1">
                <Clock className="w-3.5 h-3.5" /> Süre: 23 saat 59 dakika kaldı
              </div>
            </div>
          )}
        </div>

        {/* KART 2: BAKİYE & IBAN PRİM ÇEKİM MODÜLÜ */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <div className="w-10 h-10 bg-amber-100 text-amber-800 rounded-xl flex items-center justify-center font-bold">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-slate-800 text-base">Prim Bakiyem</h2>
              <p className="text-xs text-slate-500">İzlemelerden biriken ödül</p>
            </div>
          </div>

          {/* BAKİYE GÖSTERGESİ */}
          <div className="bg-slate-900 text-white p-4 rounded-xl flex justify-between items-center shadow-inner">
            <div>
              <p className="text-xs text-slate-400 font-medium">Çekilebilir Tutar</p>
              <p className="text-2xl font-bold text-emerald-400">{balance} TL</p>
            </div>
            <span className="bg-emerald-900/60 text-emerald-300 text-[10px] px-2.5 py-1 rounded-full border border-emerald-700">
              Aktif Bakiye
            </span>
          </div>

          {/* IBAN FORMU */}
          <form onSubmit={handleWithdraw} className="space-y-3 pt-1">
            <div>
              <label className="text-xs font-semibold text-slate-600">IBAN Adresiniz</label>
              <input
                type="text"
                value={iban}
                onChange={(e) => setIban(e.target.value)}
                placeholder="TR00 0000 0000 0000 0000 0000 00"
                className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 font-mono"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-slate-800 hover:bg-slate-900 text-white font-medium py-2.5 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5"
            >
              <ArrowUpRight className="w-4 h-4" /> Bakiyeyi IBAN'a Aktar
            </button>
          </form>

          {/* BİLDİRİM / MESAJ */}
          {withdrawStatus && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-start gap-2">
              <CheckCircle className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
              <span>{withdrawStatus}</span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}