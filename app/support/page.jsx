'use client';

import { useState } from 'react';
import { HelpCircle, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

export default function SupportPage() {
  const [subject, setSubject] = useState('Öneri');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    setSubmitted(true);
    setMessage('');
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-[#dfe8f1] shadow-sm">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-2.5 bg-[#eaf1f7] text-[#12355b] rounded-xl">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-extrabold text-lg text-[#12355b]">İletişim & Destek</h1>
            <p className="text-xs text-[#5b6f82]">Ekibimiz iş akışınızı aksatmadan yardımcı olur.</p>
          </div>
        </div>

        {/* HIZLI DESTEK BUTONLARI */}
        <div className="grid grid-cols-2 gap-3 mt-5">
          <a
            href="https://wa.me/905555555555"
            target="_blank"
            rel="noreferrer"
            className="p-3 bg-[#12805c] hover:bg-[#0f6b4d] text-white rounded-xl text-xs font-bold transition-colors text-center flex items-center justify-center gap-1.5"
          >
            <MessageSquare className="w-4 h-4" /> WhatsApp Destek
          </a>
          <a
            href="mailto:destek@yerelstok.com"
            className="p-3 bg-[#eaf1f7] hover:bg-[#d8e5f0] text-[#12355b] rounded-xl text-xs font-bold transition-colors text-center flex items-center justify-center gap-1.5"
          >
            E-posta Desteği
          </a>
        </div>

        {/* DESTEK FORMU */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-3 text-xs border-t border-slate-100 pt-5">
          <div>
            <label className="block text-[#18314c] font-bold mb-1">Konu Seçin</label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#12355b] font-semibold text-[#18314c]"
            >
              <option value="Öneri">Öneri</option>
              <option value="Şikayet">Şikayet</option>
              <option value="Teknik">Teknik Sorun / Hata Bildirimi</option>
            </select>
          </div>

          <div>
            <label className="block text-[#18314c] font-bold mb-1">Mesajınız</label>
            <textarea
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Detayları buraya yazabilirsiniz..."
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#12355b] text-[#18314c]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#12355b] hover:bg-[#0d2744] text-white font-bold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" /> Talebi Gönder
          </button>
        </form>

        {submitted && (
          <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 text-[#12805c] rounded-xl text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> Destek talebiniz başarıyla gönderildi.
          </div>
        )}
      </div>
    </div>
  );
}