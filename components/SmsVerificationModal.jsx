'use client';

import { useState } from 'react';
import { ShieldCheck, Phone, CheckCircle2, Lock } from 'lucide-react';

export default function SmsVerificationModal({ isOpen, onClose, onVerified, userType }) {
  const [phone, setPhone] = useState('');
  const [step, setStep] = useState('PHONE'); // 'PHONE' or 'OTP'
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSendCode = (e) => {
    e.preventDefault();
    if (phone.length < 10) {
      setError('Lütfen geçerli bir cep telefonu numarası girin.');
      return;
    }
    setError('');
    setStep('OTP');
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otp !== '1234') {
      setError('Hatalı kod! (Test için: 1234)');
      return;
    }
    onVerified();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-sm p-4 flex items-center justify-center">
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
          <div className="p-3 bg-[#12355b] text-white rounded-2xl">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm text-[#12355b]">{userType} SMS Doğrulaması</h3>
            <p className="text-[11px] text-[#5b6f82]">Güvenli işlem için telefon onayı gereklidir.</p>
          </div>
        </div>

        {step === 'PHONE' ? (
          <form onSubmit={handleSendCode} className="space-y-3 text-xs">
            <div>
              <label className="block font-bold text-[#18314c] mb-1">Cep Telefonu Numarası</label>
              <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5">
                <span className="text-slate-500 font-bold mr-2">+90</span>
                <input
                  type="tel"
                  placeholder="5XX XXX XX XX"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-transparent outline-none font-semibold text-[#18314c]"
                  required
                />
              </div>
            </div>

            {error && <p className="text-rose-600 font-bold text-[11px]">{error}</p>}

            <button
              type="submit"
              className="w-full py-2.5 bg-[#12355b] hover:bg-[#0d2744] text-white font-bold rounded-xl transition-colors cursor-pointer"
            >
              Doğrulama Kodu Gönder
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-3 text-xs">
            <div>
              <label className="block font-bold text-[#18314c] mb-1">SMS Onay Kodu (4 Hane)</label>
              <input
                type="text"
                placeholder="1234"
                maxLength={4}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-center font-black tracking-widest text-lg outline-none focus:ring-2 focus:ring-[#12355b]"
                required
              />
              <p className="text-[10px] text-slate-400 mt-1">Telefonunuza gönderilen kodu giriniz. (Test: 1234)</p>
            </div>

            {error && <p className="text-rose-600 font-bold text-[11px]">{error}</p>}

            <button
              type="submit"
              className="w-full py-2.5 bg-[#12805c] hover:bg-[#0f6b4d] text-white font-bold rounded-xl transition-colors cursor-pointer"
            >
              Onayla ve Giriş Yap
            </button>
          </form>
        )}
      </div>
    </div>
  );
}