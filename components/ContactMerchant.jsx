'use client';

import { Phone, MessageSquare, MapPin } from 'lucide-react';

export default function ContactMerchant({ phone = '05325551122', address = 'Kadıköy Sanayi Sit. No: 14' }) {
  const cleanPhone = phone.replace(/\s+/g, '');

  return (
    <div className="bg-[#f4f7fb] p-3 rounded-xl border border-slate-200 space-y-2 mt-3">
      <p className="text-[11px] font-semibold text-[#5b6f82] flex items-center gap-1">
        <MapPin className="w-3.5 h-3.5 text-[#12355b]" /> {address}
      </p>
      
      <div className="grid grid-cols-2 gap-2">
        <a
          href={`tel:${cleanPhone}`}
          className="py-2 bg-white hover:bg-slate-100 text-[#12355b] border border-slate-200 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
        >
          <Phone className="w-3.5 h-3.5 text-[#12805c]" /> Ara: {phone}
        </a>
        <a
          href={`https://wa.me/90${cleanPhone.replace(/^0/, '')}`}
          target="_blank"
          rel="noreferrer"
          className="py-2 bg-[#12805c] hover:bg-[#0f6b4d] text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
        >
          <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
        </a>
      </div>
    </div>
  );
}